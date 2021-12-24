import {cloneDeep} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Communications from 'react-native-communications';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps'; // import {createOpenLink} from '../../utils/CreateMapLinks';
import {createMapLink, createOpenLink} from 'react-native-open-maps';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../navigation/navigationStrings';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
navigator.geolocation = require('react-native-geolocation-service');

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import moment from 'moment';

import {
  getColorCodeWithOpactiyNumber,
  getCurrentLocation,
  showError,
} from '../../utils/helperFunctions';
import stylesFunc from './styles';
import ButtonComponent from '../../Components/ButtonComponent';
import {mapStyle} from '../../utils/constants/MapStyle';

var ACTION_TIMER = 1500;
var COLORS = ['#8FEE90', '#27A468'];
var _value = 0;
export default function TaskDetail({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  let taskDetail = route?.params?.data?.item;
  console.log(taskDetail, 'taskDetail>>>>>>>>>>>>');
  let fromHistory = route?.params?.data?.fromHistory;

  const [state, setState] = useState({
    vendors: {},
    isLoading: false,
    region: {
      latitude: Number(taskDetail?.location?.latitude),
      longitude: Number(taskDetail?.location?.longitude),
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    coordinate: {
      latitude: Number(taskDetail?.location?.latitude),
      longitude: Number(taskDetail?.location?.longitude),
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    textComplete: '',
    pressAction: new Animated.Value(0),
    buttonWidth: 0,
    buttonHeight: 0,
    taskStatus: taskDetail?.task_status ? Number(taskDetail?.task_status) : '',
    buttonPressComplete: 0,
    buttonText: '',
    taskProofArray: [
      {
        id: 1,
        title: strings.SIGNATURE,
        imagePath: imagePath.signature,
        imagePathActive: imagePath.signatureBlue,
        type: 'signature',
      },
      {
        id: 2,
        title: strings.PHOTO,
        imagePath: imagePath.photoInactive,
        imagePathActive: imagePath.photoBlue,
        type: 'photo',
      },
      {
        id: 3,
        title: strings.NOTES,
        imagePath: imagePath.notes,
        imagePathActive: imagePath.notesBlue,
        type: 'notes',
      },
      {
        id: 4,
        title: strings.QRCODE,
        imagePath: imagePath.codeInactive,
        imagePathActive: imagePath.codeActive,
        type: 'QR',
      },
      {
        id: 5,
        title: strings.FACEDETECTION,
        imagePath: imagePath.faceInactive,
        imagePathActive: imagePath.faceActive,
        type: 'face',
      },
    ],
    updatedProofArray: [],
    findDataToCheck: null,
    productAllInsrucations: [],
  });

  const {
    vendors,
    findDataToCheck,
    updatedProofArray,
    taskProofArray,
    taskStatus,
    isLoading,
    region,
    coordinate,
    textComplete,
    pressAction,
    buttonWidth,
    buttonHeight,
    buttonPressComplete,
    buttonText,
    productAllInsrucations,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});
  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  const styles = stylesFunc({defaultLanguagae});
  // const userData = useSelector(state => state?.auth?.userData);

  useEffect(() => {
    if (userData?.task_proof) {
      console.log(userData?.task_proof, ' userData?.task_proof');
      const findDataToCheck = userData?.task_proof.find(
        x => x.id == taskDetail?.task_type_id,
      );
      updateState({
        findDataToCheck: findDataToCheck,
      });
      console.log(findDataToCheck, 'findDataToCheck');
      let newArray = cloneDeep(taskProofArray);
      console.log(newArray, 'newArray>newArray');
      if (findDataToCheck) {
        updateState({
          updatedProofArray: newArray
            .map(i => {
              if (
                (i?.type == 'signature' && findDataToCheck?.signature) ||
                (i?.type == 'photo' && findDataToCheck?.image) ||
                (i?.type == 'notes' && findDataToCheck?.note) ||
                (i?.type == 'QR' && findDataToCheck?.barcode) ||
                (i?.type == 'face' && findDataToCheck?.face)
              ) {
                return i;
              }
            })
            .filter(x => x != null || x != undefined),
        });
      }
    }
  }, [taskDetail, userData]);

  useEffect(() => {
    getStatusName(taskStatus);
  }, [taskStatus]);
  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  //Error handling in api
  const errorMethod = error => {
    console.log(error, 'error');
    updateState({isLoading: false, isRefreshing: false, isLoading: false});
    showError(error?.message || error?.error);
  };

  const _onRegionChange = region => {
    updateState({region: region});
  };

  useEffect(() => {
    pressAction.addListener(v => (_value = v.value));
  });

  const handlePressIn = () => {
    ACTION_TIMER = 1500;
    Animated.timing(pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
      useNativeDriver: false,
    }).start(animationActionComplete);
  };
  const handlePressOut = () => {
    if (buttonPressComplete == 1) {
      Animated.timing(pressAction, {
        duration: _value * ACTION_TIMER,
        toValue: 0,
        useNativeDriver: false,
      }).stop();
    } else {
      Animated.timing(pressAction, {
        duration: _value * ACTION_TIMER,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };
  const animationActionComplete = () => {
    // alert('1234');
    var message = '';
    if (_value === 1) {
      updateState({buttonPressComplete: 1});
      message = 'You held it long enough to fire the action!';
    } else {
      updateState({buttonPressComplete: 0});
    }
  };

  const getButtonWidthLayout = e => {
    updateState({
      buttonWidth: e.nativeEvent.layout.width,
      buttonHeight: e.nativeEvent.layout.height,
    });
  };

  useEffect(() => {
    if (buttonPressComplete) {
      updateTaskStatus();
    }
  }, [buttonPressComplete]);

  const new_dispatch_traking_url = () => {
    if (
      taskDetail?.order?.call_back_url?.includes(
        '/dispatch-order-status-update/',
      )
    ) {
      return (taskDetail?.order?.call_back_url).replace(
        '/dispatch-order-status-update/',
        '/dispatch-order-status-update-details/',
      );
    } else if (
      taskDetail?.order?.call_back_url?.includes('/dispatch-pickup-delivery/')
    ) {
      return (taskDetail?.order?.call_back_url).replace(
        '/dispatch-pickup-delivery/',
        '/dispatch-order-status-update-details/',
      );
    }
  };

  const checkCallBackUrlForShowOrderDeatils = () => {
    return taskDetail?.order?.call_back_url?.includes(
      '/dispatch-order-status-update/',
    );
  };

  useEffect(() => {
    if (new_dispatch_traking_url()) {
      updateState({
        isLoading: true,
      });
      _getproductUpdateDetails();
    }
  }, []);

  const _getproductUpdateDetails = () => {
    actions
      .getProductUpdateDetails(new_dispatch_traking_url(), {})
      .then(res => {
        console.log(
          res?.data?.vendors[0]?.vendor,
          'all response after hit order api',
        );
        updateState({vendors: res?.data?.vendors[0]?.vendor});
        const productAllInsrucations = res?.data?.vendors.map((item, index) => {
          return item?.products?.map((item, index) => {
            return item?.user_product_order_form;
          });
        });

        updateState({
          isLoading: false,
          productAllInsrucations: JSON.parse(productAllInsrucations),
        });
      })
      .catch(error =>
        updateState({
          isLoading: false,
        }),
      );
  };

  const _onPressTaskDetails = item => {
    moveToNewScreen(navigationStrings.ORDERDETAIL, {
      item: taskDetail?.order?.call_back_url,
    })();
  };

  const mapView = () => {
    return (
      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        initialRegion={region}
        customMapStyle={mapStyle}
        onRegionChangeComplete={_onRegionChange}>
        <MapView.Marker
          tracksViewChanges={false}
          key={`coordinate_${taskDetail?.id}`}
          image={imagePath.pinRed}
          coordinate={{
            latitude: Number(taskDetail?.location?.latitude),
            longitude: Number(taskDetail?.location?.longitude),
          }}></MapView.Marker>
      </MapView>
    );
  };

  //get BackGroundColor
  const getBackGroudColor = name => {
    switch (name) {
      case 'Pickup':
        return getColorCodeWithOpactiyNumber(colors.circularBlue.substr(1), 50);
        break;
      case 'Drop':
        return getColorCodeWithOpactiyNumber(
          colors.circularOrnage.substr(1),
          50,
        );
        break;
      default:
        return getColorCodeWithOpactiyNumber(colors.circularRed.substr(1), 50);
        break;
    }
  };

  //get Text color
  const getTextColor = name => {
    switch (name) {
      case 'Pickup':
        return colors.circularBlue;
        break;
      case 'Drop':
        return colors.circularOrnage;
        break;
      default:
        return colors.circularRed;
        break;
    }
  };

  const getProgressStyles = () => {
    var width = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, buttonWidth],
    });
    var bgColor = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS,
    });

    return {
      width: width,
      height: buttonHeight,
      backgroundColor: bgColor,
    };
  };

  const getUpdatedStatus = () => {
    switch (taskStatus) {
      case 1:
        return 2;
        break;
      case 2:
        return 3;
        break;
      case 3:
        return 4;
        break;
      default:
        break;
    }
  };

  const updateTaskStatus = () => {
    let data = {};
    data['task_status'] = getUpdatedStatus();
    data['task_id'] = taskDetail?.id;
    console.log(data, 'updateTaskStatus>>>DATA');

    updateState({isLoading: true});
    actions
      .updateTask(data, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'updateTaskStatus>res>res');
        updateState({isLoading: false});
        if (res?.data) {
          ACTION_TIMER = 100;
          updateState({
            buttonPressComplete: 0,
            taskStatus: Number(res?.data?.task_status),
          });
          // getStatusName(taskStatus)
          setTimeout(async () => {
            updateState({
              isLoading: false,
            });
          }, 2000);
        }
      })
      .catch(errorMethod);
  };

  useEffect(() => {
    handlePressOut();
  }, [buttonPressComplete]);

  const openMaps = () => {
    showActionSheet();
  };

  const getStatusName = taskStatus => {
    console.log(taskStatus, 'getStatusName');
    switch (taskStatus) {
      case 1:
        updateState({buttonText: strings.HOLDTOSTART});
        break;
      case 2:
        updateState({buttonText: strings.HOLDTOARRIVE});
        break;
      case 3:
        updateState({
          buttonText:
            taskDetail?.tasktype?.name == 'Drop'
              ? strings.HOLDTOCOMPLETE
              : strings.HOLDTOPICK,
        });
        break;
      case 4:
        updateState({
          buttonText:
            taskDetail?.tasktype?.name == 'Drop'
              ? strings.HOLDTOCOMPLETE
              : strings.HOLDTOPICK,
        });
        break;
      default:
        break;
    }
  };

  const redirectNextScreen = res => {
    updateState({isLoading: false});
    moveToNewScreen(navigationStrings.TASKCOMPLETEDOCUMENT, {
      taskDetail: taskDetail,
      updatedProofArray: updatedProofArray,
      findDataToCheck: findDataToCheck,
      otpEnabled: res?.data?.otpEnabled,
      otpRequired: res?.data?.otpRequired,
      otp: res?.data?.otp,
    })();
  };

  const redirectToDoneScreen = () => {
    console.log(taskDetail?.id, 'TaskDetail');
    updateState({isLoading: true});
    let data = {};
    data['task_id'] = taskDetail?.id;
    console.log(data, 'data');
    actions
      .sendOtpToDriver(data, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'sendOtpToDriver>res>res');
        if (res?.status == 200) {
          console.log(updatedProofArray, 'updatedProofArray');
          if (updatedProofArray.length) {
            redirectNextScreen(res);
          } else {
            if (res?.data?.otpEnabled) {
              redirectNextScreen(res);
            } else {
              let formdata = new FormData();
              formdata.append('task_status', 4);
              formdata.append('task_id', taskDetail?.id);
              completeTask(formdata);
            }
          }
        }
      })
      .catch(errorMethod);
  };

  const completeTask = formdata => {
    updateState({isLoading: true});
    actions
      .updateTask(formdata, {
        client: clientInfo?.database_name,
        ContentType: 'multipart/form-data',
      })
      .then(res => {
        console.log(res, 'updateTaskStatus>res>res');
        updateState({isLoading: false});
        if (res?.data) {
          updateState({
            isLoading: false,
          });
          navigation.navigate(navigationStrings.DASHBOARD);
        }
      })
      .catch(errorMethod);
  };

  const buttonView = () => {
    if (fromHistory) {
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.button,
                {
                  backgroundColor:
                    taskDetail?.task_status == '4' ? '#27A468' : colors.redB,
                },
              ]}>
              <Text style={styles.text}>
                {taskDetail?.task_status == '4'
                  ? strings.TASKCOMPLTED
                  : strings.TASKCANCEL}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={taskStatus == 3 ? redirectToDoneScreen : handlePressIn}
          onPressOut={handlePressOut}>
          <View style={styles.button} onLayout={getButtonWidthLayout}>
            <Animated.View style={[styles.bgFill, getProgressStyles()]} />
            <Text style={styles.text}>{buttonText}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const getDate = date => {
    const local = moment.utc(date).local().format('DD MMM YYYY hh:mm:a');
    return local;
  };

  const taskDetailView = () => {
    return (
      <ScrollView
        style={{marginTop: moderateScale(10)}}
        showsVerticalScrollIndicator={false}>
        {/* User Detail  */}
        <View
          style={{
            padding: moderateScale(10),
            backgroundColor: colors.transactionHistoryBg,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={[
                styles.statusView,
                {
                  backgroundColor: colors.greyLight3,
                  // backgroundColor: getBackGroudColor(taskDetail?.tasktype?.name),
                  marginVertical: moderateScaleVertical(5),
                },
              ]}>
              <Text
                style={[
                  styles.taskNameTextstyle,
                  // {color: getTextColor(taskDetail?.tasktype?.name)},
                  {color: colors.black},
                ]}>
                {`${
                  (taskDetail?.tasktype?.name).toLowerCase() == 'drop'
                    ? strings.DROP
                    : strings.PICKUP
                }`}
              </Text>
            </View>
            {taskDetail?.barcode && (
              <View style={{justifyContent: 'center'}}>
                <Image source={imagePath?.barcode2} />
              </View>
            )}
          </View>

          {/* Phone and email view */}
          {(taskDetail?.tasktype?.name).toLowerCase() == 'drop' ? (
            <View>
              {!!(
                taskDetail?.order?.Recipient_email ||
                taskDetail?.order?.recipient_phone
              ) && (
                <View
                  style={{
                    opacity: 0.5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!!taskDetail?.order?.Recipient_email && (
                    <TouchableOpacity
                      onPress={() =>
                        // Communications.email(
                        //   [taskDetail?.order?.Recipient_email, ''],
                        //   null,
                        //   null,
                        //   '',
                        //   '',
                        // )
                        Linking.openURL(
                          `mailto:${taskDetail?.order?.Recipient_email}`,
                        )
                      }
                      style={{
                        flexDirection: 'row',
                        marginTop: moderateScale(10),
                        alignItems: 'center',
                      }}>
                      <Image
                        source={imagePath.mail2}
                        style={{marginRight: moderateScale(5)}}
                      />
                      <Text style={styles.emailAndPhone}>
                        {taskDetail?.order?.Recipient_email}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!!taskDetail?.order?.recipient_phone && (
                    <TouchableOpacity
                      onPress={
                        () =>
                          Linking.openURL(
                            `tel:${taskDetail?.order?.recipient_phone}`,
                          )
                        // Communications.phonecall(
                        //   taskDetail?.order?.recipient_phone,
                        //   true,
                        // )
                      }
                      style={{
                        flexDirection: 'row',
                        marginTop: moderateScale(10),
                        alignItems: 'center',
                      }}>
                      <Image
                        source={imagePath.phone2}
                        style={{marginRight: moderateScale(5)}}
                      />
                      <Text style={styles.emailAndPhone}>
                        {taskDetail?.order?.recipient_phone}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* location and address */}
              {!!taskDetail?.location?.address && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={imagePath?.location2}
                    style={{marginRight: moderateScale(5)}}
                  />
                  <Text numberOfLines={2} style={styles.emailAndPhone}>
                    {taskDetail?.location?.address}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              {!!(vendors?.email || vendors?.phone_no) && (
                <View
                  style={{
                    opacity: 0.5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!!vendors?.email && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`mailto:${vendors?.email}`)
                      }
                      style={{
                        flexDirection: 'row',
                        marginTop: moderateScale(10),
                        alignItems: 'center',
                      }}>
                      <Image
                        source={imagePath.mail2}
                        style={{marginRight: moderateScale(5)}}
                      />
                      <Text style={styles.emailAndPhone}>{vendors?.email}</Text>
                    </TouchableOpacity>
                  )}
                  {!!vendors?.phone_no && (
                    <TouchableOpacity
                      onPress={
                        () => Linking.openURL(`tel:${vendors?.phone_no}`)
                        // Communications.phonecall(
                        //   vendors?.recipient_phone,
                        //   true,
                        // )
                      }
                      style={{
                        flexDirection: 'row',
                        marginTop: moderateScale(10),
                        alignItems: 'center',
                      }}>
                      <Image
                        source={imagePath.phone2}
                        style={{marginRight: moderateScale(5)}}
                      />
                      <Text style={styles.emailAndPhone}>
                        {vendors?.phone_no}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* location and address */}
              {!!vendors?.address && (
                <View
                  style={{
                    opacity: 0.5,
                    flexDirection: 'row',
                    marginTop: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={imagePath?.location2}
                    style={{marginRight: moderateScale(5)}}
                  />
                  <Text numberOfLines={2} style={styles.emailAndPhone}>
                    {vendors?.address}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Quantity and post code */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(10),
              justifyContent: 'space-between',
            }}>
            {!!taskDetail?.quantity && (
              <View
                style={{
                  opacity: 0.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={imagePath?.quantity}
                  style={{marginRight: moderateScale(5)}}
                />
                <Text style={styles.emailAndPhone} numberOfLines={1}>
                  {taskDetail?.quantity}
                </Text>
              </View>
            )}

            {!!taskDetail?.location?.post_code && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: 0.5,
                }}>
                <Image
                  source={imagePath?.postal}
                  style={{marginRight: moderateScale(5)}}
                />
                <Text style={styles.emailAndPhone} numberOfLines={1}>
                  {taskDetail?.location?.post_code}
                </Text>
              </View>
            )}
          </View>

          {/* Button  component */}
          <View style={{marginVertical: moderateScale(10)}}>
            <ButtonComponent
              buttonStyle={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: moderateScale(10),
                borderRadius: moderateScale(5),
                marginTop: moderateScale(10),
              }}
              onPress={Platform?.OS == 'android' ? openGoogleMap : openMaps}
              buttonTitle={strings.NAVIGATE}
              imagevalue={imagePath?.navigate}
              imageStyle={{marginHorizontal: moderateScale(2)}}
            />
          </View>
          {checkCallBackUrlForShowOrderDeatils() && (
            <View style={{marginVertical: moderateScale(10)}}>
              <ButtonComponent
                buttonStyle={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: moderateScale(10),
                  borderRadius: moderateScale(5),
                  marginTop: moderateScale(10),
                  backgroundColor: colors.green,
                }}
                onPress={_onPressTaskDetails}
                buttonTitle={strings.ORDERDETAILS}
                // imagevalue={imagePath?.navigate}
                imageStyle={{marginHorizontal: moderateScale(2)}}
              />
            </View>
          )}
        </View>

        {/* Task Detail Text */}
        <View style={styles.taskDetailView}>
          <Text style={styles.taskText}>
            {strings.TASKDETAIL.toUpperCase()}
          </Text>
        </View>

        {/* Task Detail View */}

        <View
          style={{
            padding: moderateScale(10),
            backgroundColor: colors.lightSkyE,
          }}>
          {taskDetail?.order?.customer?.name && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.customerName}>
                {taskDetail?.order?.customer?.name}
              </Text>
              <Text style={{fontFamily: fontFamily.bold}}>
                {strings.TRACKINGID}:-{taskDetail?.order?.unique_id}
              </Text>
            </View>
          )}

          {/* Phone and email view customer*/}
          {!!(
            taskDetail?.order?.customer?.email ||
            taskDetail?.order?.customer?.phone_number
          ) && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {!!taskDetail?.order?.customer?.email && (
                <TouchableOpacity
                  onPress={() =>
                    // Communications.email(
                    //   [
                    //     taskDetail?.order?.customer?.email,
                    //     taskDetail?.order?.customer?.email,
                    //   ],
                    //   null,
                    //   null,
                    //   '',
                    //   '',
                    // )

                    Linking.openURL(
                      `mailto:${
                        taskDetail?.order?.customer?.email
                      }?subject=${''}&body=${''}`,
                    )
                  }
                  style={{
                    flex: 0.6,
                    flexDirection: 'row',
                    marginTop: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={imagePath.mail2}
                    style={{marginRight: moderateScale(5)}}
                  />
                  <Text numberOfLines={1} style={styles.emailAndPhone}>
                    {taskDetail?.order?.customer?.email}
                  </Text>
                </TouchableOpacity>
              )}
              {!!taskDetail?.order?.customer?.phone_number && (
                <TouchableOpacity
                  onPress={() =>
                    Communications.phonecall(
                      taskDetail?.order?.customer?.phone_number,
                      true,
                    )
                  }
                  style={{
                    flex: 0.4,
                    flexDirection: 'row',
                    marginTop: moderateScale(10),
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Image
                    source={imagePath.phone2}
                    style={{marginRight: moderateScale(5)}}
                  />
                  <Text style={styles.emailAndPhone}>
                    {taskDetail?.order?.customer?.phone_number}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* seperator */}
          <View
            style={{
              ...commonStyles.headerTopLine,
              marginVertical: moderateScale(10),
            }}
          />

          {/* Time and cash to be collected */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.5}}>
              <Text style={styles.taskLable}>
                {strings.TIMINGS.toUpperCase()}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.emailAndPhone, {marginTop: moderateScale(5)}]}>
                {getDate(taskDetail?.order?.order_time)}
              </Text>
            </View>

            {!!taskDetail?.order?.cash_to_be_collected && (
              <View style={{flex: 0.5}}>
                <Text style={styles.taskLable}>
                  {strings.CASHTOBECOLLECTED.toUpperCase()}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.emailAndPhone, {marginTop: moderateScale(5)}]}>
                  {Number(taskDetail?.order?.cash_to_be_collected).toFixed(2)}
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          {!!taskDetail?.order?.task_description && (
            <View style={{flexDirection: 'row', marginTop: moderateScale(15)}}>
              <View>
                <Text style={styles.taskLable}>
                  {strings.TASKDESCRIPTION.toUpperCase()}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.emailAndPhone, {marginTop: moderateScale(5)}]}>
                  {taskDetail?.order?.task_description}
                </Text>
              </View>
            </View>
          )}

          {/* Images */}
          {!!taskDetail?.order?.task_images &&
            taskDetail?.order?.task_images.length >= 1 && (
              <View
                style={{flexDirection: 'row', marginTop: moderateScale(15)}}>
                <View>
                  {taskDetail?.order?.task_images.length >= 1 && (
                    <Text style={styles.taskLable}>
                      {strings.IMAGES.toUpperCase()}
                    </Text>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: moderateScale(5),
                    }}>
                    {taskDetail?.order?.task_images.map((i, inx) => {
                      return (
                        <>
                          <Image
                            source={{
                              uri: i,
                            }}
                            style={{
                              marginRight: moderateScale(15),
                              zIndex: 100,
                              width: width / 5,
                              height: width / 5, //362 is actual height of image
                            }}
                          />
                        </>
                      );
                    })}
                  </View>
                </View>
              </View>
            )}
          {productAllInsrucations?.length > 0 &&
            productAllInsrucations?.map((item, index) => {
              return (
                <View style={{marginTop: moderateScaleVertical(10)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.emailAndPhone,
                        {
                          marginTop: moderateScale(5),
                          fontFamily: fontFamily.bold,
                        },
                      ]}>
                      {`${strings.QUESTION} :`}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.emailAndPhone,
                        {marginTop: moderateScale(5)},
                      ]}>
                      {item?.question}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.emailAndPhone,
                        {
                          marginTop: moderateScale(5),
                          fontFamily: fontFamily.bold,
                        },
                      ]}>
                      {`${strings.ANSWER} :`}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.emailAndPhone,
                        {marginTop: moderateScale(5)},
                      ]}>
                      {item?.answer}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  };
  console.log(vendors, 'this is vendor');
  const cancelTask = () => {
    Alert.alert('', strings.CANCELMESSAGE, [
      {
        text: strings.CANCEL,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: strings.OK,
        onPress: () =>
          moveToNewScreen(navigationStrings.TASKCANCEL, taskDetail)(),
      },
    ]);
  };

  //this function use for open actionsheet
  let actionSheet = useRef();
  const showActionSheet = () => {
    actionSheet.current.show();
  };

  /*****Apple cordinate and call apple map */
  const appleCoordinate = {
    latitude: Number(taskDetail?.location?.latitude),
    longitude: Number(taskDetail?.location?.longitude),
    end: `${taskDetail?.location?.address}`,
    start: 'My Location',
    provider: 'apple',
    //travelType: 'drive',
  };
  // const openAppleMap = createOpenLink(appleCoordinate);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.default.getCurrentPosition(
        position => {
          console.log(position, 'position');
          resolve(position);
        },
        error => reject(error.message),
        {enableHighAccuracy: true, timeout: 20000},
      );
    });
  };

  // const openAppleMap = async () => {
  //   console.log('checking location my location saddi location >>>');
  //   getCurrentPosition()
  //     .then(res => {
  //       console.log(
  //         'checking location my location saddi location >>>',
  //         res.coords,
  //       );

  //       const link = createMapLink({
  //         provider: 'apple',
  //         start: 'My Location',
  //         end: `${taskDetail?.location?.address}`,
  //       });
  //       createOpenLink({query: link});
  //     })
  //     .catch(err => {
  //       console.log('checking location my location saddi location >>>', err);
  //     });
  // };

  /**** */

  /*****Google cordinate and call apple map */
  const googleCoordinate = {
    latitude: Number(taskDetail?.location?.latitude),
    longitude: Number(taskDetail?.location?.longitude),
    provider: 'google',
    zoom: 10,
    end: `${taskDetail?.location?.address}`,
    start: 'My Location',
    travelType: 'drive',
  };

  const openGoogleMap = createOpenLink(googleCoordinate);

  /**** */

  // this funtion use for camera handle
  const onPressMapChoice = index => {
    if (index == 0) {
      const url = 'maps:' + '?q=' + taskDetail?.location?.address;
      Linking.openURL(url);
    }
    if (index == 1) {
      openGoogleMap();
    }
  };

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.white}
      isLoading={isLoading}
      source={loaderOne}>
      <Header
        headerStyle={{backgroundColor: colors.white}}
        leftIconStyle={{tintColor: colors.themeColor}}
        // hideRight={true}
        // onPressLeft={()=>navigation.goBack()}
        centerTitle={`${strings.TASK} #${taskDetail?.id}`}
        customRight={() =>
          !!(
            taskStatus == 1 &&
            !fromHistory &&
            taskDetail?.tasktype?.id != 2
          ) && (
            <TouchableOpacity onPress={cancelTask}>
              <Text
                style={{
                  color: colors.textGrey,
                  fontFamily: fontFamily.regular,
                  fontSize: textScale(10),
                }}>
                {strings.CANCEL}
              </Text>
            </TouchableOpacity>
          )
        }
      />
      {/* <View style={{...commonStyles.headerTopLine}} /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {mapView()}
        <View style={styles.mainContainer}>{taskDetailView()}</View>
        <View style={{height: moderateScale(45)}} />
      </ScrollView>
      {buttonView()}
      <ActionSheet
        ref={actionSheet}
        // title={'Choose one option'}
        options={[
          strings.OPENINAPPLEMAPS,
          strings.OPENINGOOGLEMAPS,
          strings.CANCEL,
        ]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={index => onPressMapChoice(index)}
      />
    </WrapperContainer>
  );
}
