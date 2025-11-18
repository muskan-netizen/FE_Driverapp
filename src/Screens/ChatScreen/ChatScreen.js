import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ImageBackground,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Modal,
  Keyboard,
} from "react-native";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import socketServices from "../../utils/scoketService";
import { useSelector } from "react-redux";
import imagePath from "../../constants/imagePath";
import Header from "../../Components/Header";
import colors from "../../styles/colors";
import WrapperContainer from "../../Components/WrapperContainer";
import actions from "../../redux/actions";
import { getImageUrl, showError } from "../../utils/helperFunctions";
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "../../styles/responsiveSize";
import FastImage from "react-native-fast-image";
import moment from "moment";
import _, { cloneDeep, isEmpty } from "lodash";
import CircularImages from "../../Components/CircularImages";
// import Modal from "react-native-modal";
import { ScrollView } from "react-native-gesture-handler";
import fontFamily from "../../styles/fontFamily";
import { useFocusEffect } from "@react-navigation/native";
import ChatMedia from "../../Components/ChatMedia";
import navigationStrings from "../../navigation/navigationStrings";
import ButtonImage from "../../Components/ImageComp";
import { androidCameraPermission } from "../../utils/permissions";
import { v4 as uuidv4 } from "uuid";
import ActionSheet from "react-native-actionsheet";
import strings from "../../constants/lang";
import { cameraImgVideoHandler } from "../../utils/commonFunction";
import DocumentPicker from "@react-native-documents/picker";
import { createThumbnail } from "react-native-create-thumbnail";

export default function ChatScreen({ route, navigation }) {
  const paramData = route.params.data;
  const clientInfo = useSelector((state) => state?.initBoot?.clientInfo);
  const defaultLanguagae = useSelector(
    (state) => state?.initBoot?.defaultLanguage
  );
  let actionSheet = useRef();
  const userData = useSelector((state) => state?.auth?.userData);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  console.log("paramDataparamData", paramData);
  const [value, setValue] = useState(paramData);
  const styles = stylesFun({});
  const textInputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [state, setState] = useState({
    showParticipant: false,
    isLoading: false,
    roomUsers: [],
    allRoomUsersAppartFromAgent: [],
    allAgentIds: [],
    allAgentIds: [],
  });
  const {
    isLoading,
    roomUsers,
    showParticipant,
    allRoomUsersAppartFromAgent,
    allAgentIds,
  } = state;

  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const [currentMsg, setCurrentMsg] = useState({});
  const [layoutReady, setLayoutReady] = useState(false);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e?.endCoordinates?.height || 0);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  useEffect(() => {
    socketServices.on("new-message", (data) => {
      console.log(
        data,
        "data to be emitted in chat screen",
        route.params.data,
        route.params
      );
      if (
        route.params?.fromNotification &&
        route.params.data?.room_id == data?.message?.roomData?.room_id
      ) {
        setMessages((previousMessages) => {
          // Check if this is a message from current user (to prevent duplicates)
          const isCurrentUserMessage =
            data.message.chatData?.auth_user_id === userData?.id;

          if (isCurrentUserMessage) {
            // Don't add duplicate for messages sent by current user
            // as they are already handled in onSend or sendMediaMessage functions
            return previousMessages;
          }

          // Check if message already exists by _id (prevent duplicates)
          const messageExists = previousMessages.some(
            (msg) => msg._id === data.message.chatData?._id
          );

          if (messageExists) {
            return previousMessages;
          }

          return GiftedChat.append(previousMessages, {
            ...data.message.chatData,
            user: { _id: 0 },
          });
        });
      }
      if (
        route.params.data?.room_id == data?.message?.roomData?.room_id &&
        route.params.data?.room_name == data?.message?.roomData?.room_name
      ) {
        setMessages((previousMessages) => {
          // Check if this is a message from current user (to prevent duplicates)
          const isCurrentUserMessage =
            data.message.chatData?.auth_user_id === userData?.id;

          if (isCurrentUserMessage) {
            // Don't add duplicate for messages sent by current user
            // as they are already handled in onSend or sendMediaMessage functions
            return previousMessages;
          }

          // Check if message already exists by _id (prevent duplicates)
          const messageExists = previousMessages.some(
            (msg) => msg._id === data.message.chatData?._id
          );

          if (messageExists) {
            return previousMessages;
          }

          return GiftedChat.append(previousMessages, {
            ...data.message.chatData,
            user: { _id: 0 },
          });
        });
      }
      // fetchAllMessages()
      fetchAllRoomUser(route?.params?.data);
    });
    return () => {
      socketServices.removeListener("new-message");
      socketServices.removeListener("save-message");
    };
  }, [route.params.data, userData?.id]);

  console.log("all messages", messages);

  useFocusEffect(
    useCallback(() => {
      // alert('hello');
      updateState({ isLoading: true });
      fetchAllRoomUser(paramData);
      fetchAllMessages(paramData);

      // optional cleanup (if needed)
      return () => {
        setMessages([]);
        // cleanup logic here
      };
    }, [paramData])
  );

  const uploadMedia = (fileRes = [], fileName = "", paramData, tempId) => {
    // To upload media filed to S3 server
    console.log(fileRes, "<====fileRes", paramData);
    if (!isEmpty(fileRes)) {
      let encodedData = encodeURIComponent(
        `uploads/${userData?.id}/${paramData?._id}/${fileName}`
      ); //encoded media data for AWS-S3
      console.log(encodedData, "<====encodedData");

      actions
        .uploadMediaS3(
          encodedData,
          {},
          {
            // API to get presigned URL from S3
            client: clientInfo?.database_name,
            ContentType: "multipart/form-data",
          }
        )
        .then(async (res) => {
          console.log(res, "<===uploadMediaS3");
          const response = await fetch(fileRes.path);
          const blob = await response.blob(); // converts media to blob
          console.log(blob, "<===blob");
          fetch(res?.url, {
            // API to upload presigned URL to AWS directly
            method: "PUT",
            body: blob,
          })
            .then(async (data) => {
              console.log(data, "<===afterputS3");
              const hostname = data?.url.match(/^(https?:\/\/)([^:/\n]+)/)[0];
              let mediaUrl = hostname + `/${encodedData}`;
              console.log(mediaUrl, "mediaUrlmediaUrl");

              // Send media message directly without using onSend to avoid duplicates
              try {
                await sendMediaMessage(
                  mediaUrl,
                  fileRes?.mime || fileRes?.type,
                  paramData,
                  tempId
                );
              } catch (e) {
                // handled inside sendMediaMessage
              }
            })
            .catch((err) => {
              showError("Something went wrong");
              // Remove the loading preview corresponding to this tempId
              if (tempId) {
                setMessages((previousMessages) =>
                  previousMessages.filter((msg) => msg.tempId !== tempId)
                );
              }
            });
        })
        .catch((err) => {
          showError("Something went wrong");
          if (tempId) {
            setMessages((previousMessages) =>
              previousMessages.filter((msg) => msg.tempId !== tempId)
            );
          }
        });
    }
  };
  const appendMediaPreview = (media, thumbnail = "") => {
    // to set preview/thumbnail of image/video/document while uploading
    const tempId = uuidv4();
    const freshMsg = {
      _id: `${Date.now()}-${tempId}`,
      tempId: tempId,
      isLoading: true,
      is_media: true,
      mediaUrl: media?.path,
      mediaType: media?.mime,
      name: media?.name,
      auth_user_id: userData?.id,
      username: userData?.name,
      display_image: userData?.image_url,
      message: "",
      created_date: new Date().toISOString(),
    };

    if (media?.mime === "video/mp4") {
      // support both object and string thumbnail inputs
      freshMsg.thumbnailUrl =
        typeof thumbnail === "string" ? thumbnail : thumbnail?.path || "";
    }

    setMessages((prev) => [freshMsg, ...prev]);
    return tempId;
  };

  const sendMediaMessage = async (mediaUrl, mediaType, paramData, tempId) => {
    try {
      let apiData = {
        room_id: paramData?._id,
        message: "", // Empty message for media
        user_type: "agent",
        to_message: "to_user",
        from_message: "from_agent",
        user_id: userData?.id || "",
        email: userData?.email || "",
        username: userData?.name || "",
        phone_num: `${userData.phone_number}`,
        display_image: userData?.image_url,
        chat_type: "agent_to_user",
        is_media: true,
        mediaUrl: mediaUrl,
        thumbnailUrl: mediaUrl,
        mediaType: mediaType,
      };

      console.log("sending media api data", apiData);
      const res = await actions.sendMessage(apiData, {
        client: clientInfo?.database_name,
        language: defaultLanguagae?.value ? defaultLanguagae?.value : "en",
      });
      console.log("send media message res", res);

      // Update the existing preview message with the actual sent message data
      setMessages((previousMessages) => {
        const updatedMessages = previousMessages.map((msg) => {
          if (tempId && msg.tempId === tempId && msg.isLoading) {
            return {
              ...msg,
              ...res.chatData,
              isLoading: false,
              tempId: undefined, // Remove temp ID
            };
          }
          return msg;
        });

        // If no preview message was found, add the new message
        const hasMatchedPreview = tempId
          ? previousMessages.some((msg) => msg.tempId === tempId)
          : false;
        if (!hasMatchedPreview) {
          updatedMessages.unshift({
            ...res.chatData,
            user: { _id: userData?.id },
          });
        }

        return updatedMessages;
      });

      socketServices.emit("save-message", res);

      await sendToUserNotification(paramData?._id, "Media message", paramData);
    } catch (error) {
      console.log("error raised in sendMediaMessage api", error);
      // Remove the loading message on error
      setMessages((previousMessages) => {
        if (tempId) {
          return previousMessages.filter((msg) => msg.tempId !== tempId);
        }
        return previousMessages;
      });
    }
  };
  // this funtion use for camera handle
  const cameraHandle = async (index = 0) => {
    try {
      textInputRef.current &&
        textInputRef.current.blur &&
        textInputRef.current.blur();
    } catch (e) { }
    Keyboard.dismiss();
    if (index === 2) {
      // to open device's document gallary
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
          granted["android.permission.READ_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.WRITE_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          try {
            const res = await DocumentPicker.pick({
              type: [
                DocumentPicker.types.pdf,
                DocumentPicker.types.zip,
                DocumentPicker.types.doc,
                DocumentPicker.types.docx,
                DocumentPicker.types.ppt,
                DocumentPicker.types.pptx,
                DocumentPicker.types.xls,
                DocumentPicker.types.xlsx,
              ],
            });

            if (!!res) {
              let fileObj = {
                path: res[0]?.uri,
                mime: "docs",
                name: res[0]?.name,
              };
              const tempId = appendMediaPreview(fileObj);
              uploadMedia(
                fileObj,
                (name = res[0]?.name),
                route?.params?.data,
                tempId
              );
            }
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
        } else {
          // Permission denied, handle accordingly
        }
      } catch (err) {
        console.warn(err);
      }
    }

    const permissionStatus = await androidCameraPermission();

    if (permissionStatus) {
      // to open device's image / video gallary
      cameraImgVideoHandler(index, {
        mediaType: "any",
      })
        .then(async (res) => {
          if (!!res?.path) {
            console.log(res, "<====cameraImgVideoHandler");
            var thumbnailPath = {};
            if (res?.mime == "video/mp4") {
              thumbnailPath = await createThumbnail({
                url: res?.path,
                timeStamp: 10000, // Specify the timestamp for the desired thumbnail (in milliseconds)
              });
              // setThumbnail(thumbnailPath);
            }

            // return;
            const tempId = appendMediaPreview(res, thumbnailPath);
            uploadMedia(
              res,
              res.path.split("/").pop(),
              route?.params?.data,
              tempId
            ); // upload media directly from gallary
          }
        })
        .catch((err) => { });
    }
  };
  const fetchAllMessages = useCallback(async (val) => {
    try {
      const apiData = `/${val?._id}`;
      const res = await actions.getAllMessages(apiData, {});
      console.log("fetchAllMessages res", res);
      updateState({ isLoading: false });
      if (!!res) {
        setMessages(res.reverse());
      }
    } catch (error) {
      console.log("error raised in fetchAllMessages api", error);
      updateState({ isLoading: false });
    }
  }, []);

  const fetchAllRoomUser = async (val) => {
    try {
      console.log(paramData, "paramDataparamData", value, route.params.data);
      const apiData = `/${val?._id}`;
      const res = await actions.getAllRoomUser(
        apiData,
        {},
        {
          client: clientInfo?.database_name,
          language: defaultLanguagae?.value ? defaultLanguagae?.value : "en",
        }
      );
      console.log(res, "resresresres");
      if (!!res?.userData) {
        const allRoomUsersAppartFromAgent = res?.userData.filter(function (el) {
          return el.user_type != "agent";
        });
        const allAgentIds = res?.userData.filter(function (el) {
          return el.user_type == "agent";
        });

        updateState({
          allRoomUsersAppartFromAgent: allRoomUsersAppartFromAgent,
          allAgentIds: allAgentIds,
          roomUsers: res?.userData,
        });
      }
    } catch (error) {
      console.log("error raised in fetchAllRoomUser api", error);
    }
  };

  const onSend = useCallback(
    async (messages = [], paramData) => {
      if (String(messages[0].text).trim().length < 1) {
        return;
      }
      console.log(messages, "messagesmessages", paramData, route?.params?.data);
      try {
        let apiData = {
          room_id: paramData?._id,
          message: messages[0].text,
          user_type: "agent",
          to_message: "to_user",
          from_message: "from_agent",
          user_id: userData?.id || "",
          email: userData?.email || "",
          username: userData?.name || "",
          phone_num: `${userData.phone_number}`,
          display_image: userData?.image_url,
          // sub_domain: clientInfo?.custom_domain,
          //'room_name' =>$data->name,
          chat_type: "agent_to_user",
        };
        if (Platform.OS === "android") {
          setTimeout(() => {
            try {
              textInputRef.current &&
                textInputRef.current.focus &&
                textInputRef.current.focus();
            } catch (e) { }
          }, 350);
        }

        console.log("sending api data", apiData);
        const res = await actions.sendMessage(apiData, {
          client: clientInfo?.database_name,
          language: defaultLanguagae?.value ? defaultLanguagae?.value : "en",
        });
        console.log("on send message res", res);

        socketServices.emit("save-message", res);

        await sendToUserNotification(
          paramData?._id,
          messages[0].text,
          paramData
        );
      } catch (error) {
        console.log("error raised in sendMessage api12", error);
      }
    },
    [allRoomUsersAppartFromAgent, allAgentIds]
  );

  const sendToUserNotification = async (id, text, paramData) => {
    let apiData = {
      user_ids:
        allRoomUsersAppartFromAgent.length == 0
          ? [{ auth_user_id: paramData?.order_user_id }]
          : allRoomUsersAppartFromAgent,
      roomId: id,
      roomIdText: paramData?.room_id,
      text_message: text,
      chat_type: paramData?.type,
      order_number: paramData?.room_id,
      all_agentids: allAgentIds,
      order_vendor_id: paramData?.order_vendor_id,
      username: userData?.name,
      vendor_id: paramData?.vendor_id,
      auth_id: userData?.id,
      web: false,
      from: "from_dispatcher",
      order_id: paramData?.order_id,
    };
    console.log(
      allRoomUsersAppartFromAgent,
      "sending api data>>>>> notification",
      apiData
    );

    try {
      const res = await actions.sendNotification(apiData, {
        client: clientInfo?.database_name,
        language: defaultLanguagae?.value ? defaultLanguagae?.value : "en",
      });
      console.log("res sendNotification", res);
    } catch (error) {
      console.log("error raised in sendToUserNotification api", error);
    }
  };

  const showRoomUser = useCallback(
    (props) => {
      if (_.isEmpty(roomUsers)) {
        return null;
      }
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => updateState({ showParticipant: true })}
        >
          <CircularImages size={moderateScale(35)} data={roomUsers} />
        </TouchableOpacity>
      );
    },
    [roomUsers]
  );

  const renderMessage = useCallback((props) => {
    const { currentMessage } = props;
    let isRight = currentMessage?.auth_user_id == userData?.id;
    if (isRight) {
      return !!currentMessage?.is_media ? (
        <ChatMedia
          currentMessage={currentMessage}
          isRight
          onPressMedia={() => setCurrentMsg(currentMessage)}
          containerStyle={{
            borderTopLeftRadius: moderateScale(12),
          }}
        />
      ) : (
        <View
          key={String(currentMessage._id)}
          style={{
            ...styles.chatStyle,
            alignSelf: "flex-end",
            backgroundColor: "#0084ff",
            borderBottomRightRadius: 0,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginHorizontal: 8, flexShrink: 1 }}>
              <Text
                style={{
                  fontSize: textScale(14),
                  fontFamily: fontFamily.regular,
                  textTransform: "capitalize",
                  color: colors.white,
                }}
              >
                {currentMessage?.username}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    ...styles.descText,
                    color: colors.white,
                  }}
                >
                  {currentMessage?.message}
                </Text>
                <Text
                  style={{ ...styles.timeText, color: colors.whiteOpacity77 }}
                >
                  {moment(currentMessage?.created_date).format("LT")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View>
        {!!currentMessage?.is_media ? (
          <ChatMedia
            currentMessage={currentMessage}
            onPressMedia={() => {
              setCurrentMsg(currentMessage);
              // setCurrentMsg(currentMessage);
              // setisVisible(true);
            }}
            containerStyle={{
              borderTopRightRadius: moderateScale(12),
            }}
          />
        ) : (
          <View style={{ flexDirection: "row" }}>
            {!currentMessage?.display_image.includes("default_image") ? (
              <FastImage
                source={{
                  uri: currentMessage?.display_image,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={styles.cahtUserImage}
              />
            ) : (
              <View
                style={{
                  backgroundColor: " rgba(0,0,0,0.70)",

                  width: moderateScale(30),
                  height: moderateScale(30),
                  borderRadius: moderateScale(30 / 2),
                  // marginH: moderateScale(15),
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: moderateScale(10),
                }}
              >
                <Text
                  style={{
                    fontSize: textScale(20),
                    textTransform: "uppercase",
                    color: colors.white,
                  }}
                >
                  {!!currentMessage?.username &&
                    currentMessage?.username?.charAt(0)}
                </Text>
              </View>
            )}
            <View
              key={String(currentMessage._id)}
              style={{
                ...styles.chatStyle,
                alignSelf: "flex-start",
                backgroundColor: colors.white,
                borderBottomLeftRadius: moderateScale(0),
                maxWidth: width / 1.2,
              }}
            >
              <View style={{ marginHorizontal: 8, flexShrink: 1 }}>
                <Text
                  style={{
                    fontSize: textScale(14),
                    fontFamily: fontFamily.regular,
                    textTransform: "capitalize",
                    color: colors.black,
                  }}
                >
                  {currentMessage?.username}
                </Text>

                <Text
                  style={{
                    ...styles.descText,
                    color: colors.black,
                  }}
                >
                  {currentMessage?.message}
                </Text>
                <Text style={styles.timeText}>
                  {moment(currentMessage?.created_date).format("LT")}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }, []);

  const SendButton = useCallback(() => {
    return (
      <View
        style={{
          marginHorizontal: 10,
          alignSelf: "center",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={imagePath.send} />
      </View>
    );
  }, []);

  return (
    <WrapperContainer
      bgColor={colors.white}
      statusBarColor={colors.white}
      isLoading={false}
    >
      <Header
        leftIcon={imagePath.backArrow}
        centerTitle={`# ${paramData?.room_id || ""}`}
        customRight={showRoomUser}
        onPressLeft={() => navigation.navigate(navigationStrings.CHAT_ROOM)}
      // onPressLeft={onBack}
      />

      <ImageBackground source={imagePath.icBgLight} style={{ flex: 1 }}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? undefined : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 80}
          onLayout={() => setLayoutReady(true)}
        > */}
        {/* <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        > */}
        <GiftedChat
          style={{ flex: 1 }}
          messages={messages}
          onSend={(messages) => onSend(messages, route?.params?.data)}
          user={{ _id: userData?.id }}
          renderMessage={renderMessage}
          isKeyboardInternallyHandled={true}
          messagesContainerStyle={{ flexGrow: 1 }}
          // listViewProps={{
          //   keyboardDismissMode: "on-drag",
          //   keyboardShouldPersistTaps: "never",
          //   contentContainerStyle: { paddingBottom: moderateScaleVertical(8) },
          // }}
          // scrollToBottom
          textInputProps={{
            ref: textInputRef,
            autoFocus: true,
          }}
          listViewProps={{
            keyboardDismissMode: "none",
            keyboardShouldPersistTaps: "handled",
            contentContainerStyle: {
              paddingBottom:
                Platform.OS === "android"
                  ? keyboardHeight + moderateScaleVertical(8)
                  : keyboardHeight + moderateScaleVertical(8),
              flexGrow: 1,
            },

          }}
          minInputToolbarHeight={60}
          scrollToBottomComponent={() => null}
          infiniteScroll
          renderInputToolbar={(props) => {
            return (
              <InputToolbar
                containerStyle={{
                  backgroundColor: "#f6f6f6",
                  paddingTop: 0,
                }}
                {...props}
              />
            );
          }}
          textInputStyle={{
            backgroundColor: "#ffffff",
            paddingTop: Platform.OS == "ios" ? 10 : undefined,
            borderRadius: 20,
            paddingHorizontal: 20,
            // marginVertical: 30,
            textAlignVertical: "center",
            fontFamily: fontFamily.regular,
            alignSelf: "center",
            color: colors.black,
          }}
          renderSend={(props) => {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <ButtonImage //Send attachements button
                  // onPress={() => {
                  //   // setTimeout(() => {
                  //   //     Keyboard.dismiss();
                  //   // }, 200);
                  //   actionSheet.current.show();
                  // }}
                  onPress={() => {
                    try {
                      textInputRef.current &&
                        textInputRef.current.blur &&
                        textInputRef.current.blur();
                    } catch (e) { }
                    Keyboard.dismiss();
                    // Give Android a moment to fully close keyboard before opening sheet
                    if (Platform.OS === "android") {
                      setTimeout(() => actionSheet.current.show(), 80);
                    } else {
                      actionSheet.current.show();
                    }
                  }}
                  image={imagePath.icAttachments}
                  btnStyle={{
                    marginLeft: 10,
                  }}
                  // isDarkMode={isDarkMode}
                  imgStyle={{
                    height: moderateScale(25),
                    width: moderateScale(25),
                    tintColor: colors.black,
                  }}
                /> */}
                <Send
                  alwaysShowSend
                  containerStyle={{ backgroundColor: "red" }}
                  children={<SendButton />}
                  {...props}
                />
              </View>
            );
          }}
        />
        {/* </KeyboardAvoidingView> */}
      </ImageBackground>

      <Modal
        visible={showParticipant}
        style={{
          margin: 0,
          justifyContent: "flex-end",
          height: height / 2,
        }}
        transparent={true}
        onBackdropPress={() => updateState({ showParticipant: false })}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
          activeOpacity={1}
          onPress={() => updateState({ showParticipant: false })}
        />
        <View
          style={{
            ...styles.modalStyle,
            backgroundColor: colors.white,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily?.bold,
              fontSize: textScale(16),
              color: colors.black,
            }}
          >
            {roomUsers.length} Participants
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => updateState({ showParticipant: false })}
          >
            <Image source={imagePath.closeButton} />
          </TouchableOpacity>

          <ScrollView>
            {roomUsers.map((val, i) => {
              return (
                <View
                  style={{
                    marginVertical: moderateScaleVertical(8),
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {!val?.display_image.includes("default_image") ? (
                    <FastImage
                      source={{
                        uri: val?.display_image,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      style={{
                        ...styles.imgStyle,
                        backgroundColor: colors.blackOpacity43,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        backgroundColor: " rgba(0,0,0,0.70)",

                        width: moderateScale(35),
                        height: moderateScale(35),
                        borderRadius: moderateScale(35 / 2),
                        // marginH: moderateScale(15),
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: i == 0 ? 0 : -16,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: textScale(20),
                          textTransform: "uppercase",
                          color: colors.black,
                        }}
                      >
                        {!!val?.username && val?.username?.charAt(0)}
                      </Text>
                    </View>
                  )}
                  <View style={{ marginLeft: moderateScale(8) }}>
                    <Text>
                      {val?.auth_user_id == userData?.id
                        ? "You"
                        : val?.username}
                    </Text>
                    {!!val?.phone_num ? <Text>{val?.phone_num}</Text> : null}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <ActionSheet
        ref={actionSheet}
        // title={'Choose one option'}
        options={[
          strings.CAMERA,
          strings.GALLERY,
          // strings.DOCUMENTS,
          strings.CANCEL,
        ]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) => cameraHandle(index)}
      />
    </WrapperContainer>
  );
}

const stylesFun = ({ }) => {
  const styles = StyleSheet.create({
    imgStyle: {
      width: moderateScale(35),
      height: moderateScale(35),
      borderRadius: moderateScale(35 / 2),
    },
    modalStyle: {
      padding: moderateScale(10),
      borderTopLeftRadius: moderateScale(8),
      borderTopRightRadius: moderateScale(8),
      maxHeight: height / 2,
    },
    userNameStyle: {
      fontSize: textScale(12),
      fontFamily: fontFamily.medium,
      textTransform: "capitalize",
    },
    cahtUserImage: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(10),
      backgroundColor: colors.blackOpacity43,
      marginLeft: 8,
    },
    descText: {
      fontSize: textScale(12),
      fontFamily: fontFamily.regular,
      textTransform: "capitalize",
      lineHeight: moderateScale(18),
      marginTop: moderateScaleVertical(4),
    },
    timeText: {
      fontSize: textScale(10),
      fontFamily: fontFamily.regular,
      textTransform: "uppercase",
      color: colors.blackOpacity43,
      marginLeft: moderateScale(12),
      marginTop: moderateScaleVertical(6),
      alignSelf: "flex-end",
    },
    flexView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    chatStyle: {
      paddingVertical: moderateScaleVertical(6),
      borderRadius: moderateScale(8),
      marginBottom: moderateScale(10),
      paddingHorizontal: moderateScale(2),
      maxWidth: width - 16,
      marginHorizontal: moderateScale(8),
    },
  });
  return styles;
};
