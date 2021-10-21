import React, {useState} from 'react';
import {Platform} from 'react-native';
import {Keyboard} from 'react-native';
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {useSelector} from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
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
import {moderateScale, width} from '../../styles/responsiveSize';
import {cameraHandler} from '../../utils/commonFunction';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {checkCameraPermission} from '../../utils/permissions';
import stylesFunc from './styles';

const window = Dimensions.get('window');

export default function TaskCompleteDocument({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  const taskDetail = route?.params?.data?.taskDetail;
  console.log(taskDetail, 'taskDetail');
  const updatedProofArray = route?.params?.data?.updatedProofArray;
  const findDataToCheck = route?.params?.data?.findDataToCheck;
  const params = route?.params;
  console.log(params, 'params>params');
  const [state, setState] = useState({
    isLoading: false,
    taskProofArray: updatedProofArray,
    updatedProofArray: [],
    showInputBox: false,
    note: '',
    signatureImage: null,
    signatureImageName: null,
    image: null,
    imageName: null,
    qrcode: null,
    otpField: '',
  });

  const {
    signatureImageName,
    imageName,
    isLoading,
    image,
    taskProofArray,
    showInputBox,
    note,
    qrcode,
    signatureImage,
    otpField,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});
  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  const styles = stylesFunc({defaultLanguagae});

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };
  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false, isRefreshing: false, isLoading: false});
    showError(error?.message || error?.error);
  };

  const onImageLayout = e => {
    console.log(e.event, 'e.event');
  };

  /*****Update Signatur****** */
  const updateSignature = data => {
    console.log(data, 'saved signature result');
    if (data && data?.encoded) {
      const imageData = data?.encoded;

      const imagePath = `${RNFS.DocumentDirectoryPath}${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5)}.jpg`;
      console.log(imagePath, 'imagePath');

      RNFS.writeFile(imagePath, imageData, 'base64')
        .then(res => {
          console.log(res, 'res>>>>res');
          console.log('Image converted to jpg and saved at ' + data?.pathName),
            updateState({
              signatureImage:
                Platform.OS == 'ios'
                  ? data?.pathName
                  : `file://${data?.pathName}`,
            });
          // setTimeout(() => {
          //   unlinkDirectory(imagePath);
          // }, 3000);
        })
        .catch(err => {
          console.log(err, 'error>>>>');
        });
    }
  };
  /***** */

  /****Unlink Directory*** */
  const unlinkDirectory = imagePath => {
    RNFS.unlink(imagePath)
      .then(() => {
        console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch(err => {
        console.log(err.message);
      });
  };
  /***** */

  const updateBarcodeScan = data => {
    console.log(data, 'saved barcode result');
    if (data?.data == taskDetail?.barcode) {
      updateState({
        qrcode: taskDetail?.barcode,
      });
    } else {
      updateState({qrcode: null});
      showError(strings.QRCODENOTMATCHED);
    }
  };

  /******On Press doc options**** */
  const onPressCategory = i => {
    console.log(i, 'documnet type');

    //Signature upload
    if (i?.id == 1) {
      updateState({showInputBox: false});
      moveToNewScreen(navigationStrings.ADDSIGNATURE, {
        updateSignature: data => {
          updateSignature(data);
        },
      })();
    }

    //Photo upload
    if (i?.id == 2) {
      updateState({showInputBox: false});
      cameraHandler(1, {
        cropping: false,
        compressImageQuality: 0.8,
        cropperCircleOverlay: false,
        mediaType: 'photo',
      })
        .then(res => {
          if (res?.data) {
            console.log(res, 'Photo repsonse');
            updateState({isLoading: false, image: res?.path || res?.path});
          } else {
            updateState({isLoading: false});
          }
        })
        .catch(err => {
          updateState({isLoading: false});
        });
    }

    //Add note
    if (i?.id == 3) {
      updateState({showInputBox: true});
    }

    if (i?.id == 4) {
      updateState({showInputBox: false});
      checkCameraPermission()
        .then(result => {
          console.log(result, 'result');
          if (result == 'granted') {
            moveToNewScreen(navigationStrings.SCANNER, {
              updateBarcodeScan: data => {
                updateBarcodeScan(data);
              },
            })();
          }
        })
        .catch(error => console.log('error while accessing location ', error));
    }
  };
  /****** */

  const getImage = i => {
    switch (i?.id) {
      case 1:
        return signatureImage ? imagePath?.signatureBlue : imagePath?.signature;
        break;
      case 2:
        return image ? imagePath?.photoBlue : imagePath?.photoInactive;
        break;
      case 3:
        return note != '' ? imagePath?.notesBlue : imagePath?.notes;
        break;
      case 4:
        return qrcode ? imagePath?.codeActive : imagePath?.codeInactive;
        break;
      default:
        break;
    }
  };

  const _onPressDone = () => {
    console.log(findDataToCheck, 'findDataToCheck');
    if (
      findDataToCheck?.signature &&
      findDataToCheck?.signature_requried &&
      !signatureImage
    ) {
      showError(strings.SIGNATUREIMAGE);
    } else if (
      findDataToCheck?.image &&
      findDataToCheck?.image_requried &&
      !image
    ) {
      showError(strings.PHOTOIMAGE);
    } else if (
      findDataToCheck?.note &&
      findDataToCheck?.note_requried &&
      note == ''
    ) {
      showError(strings.NOTEREQUIRED);
    } else if (
      findDataToCheck?.barcode &&
      findDataToCheck?.barcode_requried &&
      !qrcode
    ) {
      showError(strings.QRSCAN);
    } else if (
      params?.data?.otpEnabled &&
      params?.data?.otpRequired &&
      otpField.trim() == ''
    ) {
      updateState({otpField: ''});
      showError(strings.OTPREQUIRED);
    } else if (
      params?.data?.otpEnabled &&
      params?.data?.otpRequired &&
      otpField != '' &&
      JSON.parse(otpField) != params?.data?.otp
    ) {
      showError(strings.OTPNOTVALID);
    } else {
      updateState({isLoading: true});
      updateTaskStatus();
    }
  };

  const updateTaskStatus = () => {
    let data = {};
    let formdata = new FormData();
    formdata.append('task_status', 4);
    formdata.append('task_id', taskDetail?.id);
    if (note != '') {
      formdata.append('note', note);
    }
    if (signatureImage) {
      formdata.append('signature', {
        type: 'image/jpeg',
        uri: signatureImage,
      });
    }
    if (image) {
      formdata.append('image', {
        type: 'image/jpeg',
        uri: image,
      });
    }
    if (params?.data?.otpEnabled) {
      formdata.append('otp', otpField);
    }
    console.log(formdata, 'updateTaskStatus>>>DATA');

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
          if (signatureImage) {
            unlinkDirectory(signatureImage);
          }

          navigation.navigate(navigationStrings.DASHBOARD);
        }
      })
      .catch(errorMethod);
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
        customLeft={() => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerCustomleftView}>
            <Image style={styles.arrowstyle} source={imagePath.backArrow} />
            <Text style={styles.textStyle}>{strings.TASK}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{...commonStyles.headerTopLine}} />
      <View style={{flex: 0.8}}>
        {!!params?.data?.otpEnabled && (
          <View style={styles.otpContainer}>
            <Text style={styles.attachment}>{strings.OTP}</Text>
            <TextInput
              multiline={true}
              value={otpField}
              textAlignVertical={'top'}
              returnKeyType={'done'}
              maxLength={6}
              keyboardType={'numeric'}
              style={[
                styles.textInputStyle,
                {
                  width: width / 3.5,
                  marginHorizontal: moderateScale(10),
                  alignItems: 'center',
                  paddingVertical: moderateScale(10),
                },
              ]}
              onChangeText={text => updateState({otpField: text})}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
        )}

        {!!(
          params?.data?.updatedProofArray &&
          params?.data?.updatedProofArray.length
        ) && (
          <View>
            <View style={styles.documentContainer}>
              <Text style={styles.attachment}>{strings.ATTACHMENTS}</Text>
              <View style={styles.documentListContainer}>
                {taskProofArray.map((i, inx) => {
                  const {width, height} = Image.resolveAssetSource(
                    i?.imagePath,
                  );
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => onPressCategory(i)}
                      style={styles.documentContainerView}>
                      <Image
                        source={getImage(i)}
                        onLayout={onImageLayout}
                        style={{
                          width: width - 40,
                          height: height - 40, //362 is actual height of image
                          alignSelf: 'center',
                        }}
                        resizeMode={'contain'}
                      />
                      <Text style={styles.titleStyle}>{i?.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {showInputBox && (
              <View>
                <Text style={styles.reason}>{strings.NOTE}</Text>
                <TextInput
                  multiline={true}
                  value={note}
                  textAlignVertical={'top'}
                  returnKeyType={'done'}
                  style={styles.textInputStyle}
                  onChangeText={text => updateState({note: text})}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </View>
            )}

            <View
              style={{
                marginHorizontal: moderateScale(10),
                marginTop: moderateScale(10),
              }}>
              <Text style={styles.attachment}>{strings.REQUIREDDATA}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {/* signature image */}
                {!!signatureImage && (
                  <Image
                    source={{
                      uri: signatureImage,
                    }}
                    style={{
                      width: width / 3.5,
                      height: width / 3.5, //362 is actual height of image
                    }}
                  />
                )}

                {/* signature image */}
                {!!image && (
                  <Image
                    source={{
                      uri: image,
                    }}
                    style={{
                      width: width / 3.5,
                      height: width / 3.5, //362 is actual height of image
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={{flex: 0.2, paddingVertical: moderateScale(20)}}>
        <ButtonComponent buttonTitle={strings.DONE} onPress={_onPressDone} />
      </View>
    </WrapperContainer>
  );
}
