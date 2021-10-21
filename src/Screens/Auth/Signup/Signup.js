import React, {useRef, useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import GradientButton from '../../../Components/GradientButton';
import Header from '../../../Components/Header';
import {loaderOne} from '../../../Components/Loaders/AnimatedLoaderFiles';
import TextInputWithlabel from '../../../Components/TextInputWithlabel';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
// import store from '../../../redux/store';
import colors from '../../../styles/colors';
import commonStylesFunc from '../../../styles/commonStyles';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import {
  transportationArray,
  employeetypeArray,
} from '../../../utils/constants/ConstantValues';
import stylesFunction from './styles';
import ActionSheet from 'react-native-actionsheet';
import {cameraHandler} from '../../../utils/commonFunction';
import {androidCameraPermission} from '../../../utils/permissions';
import validator from '../../../utils/validations';
import {
  getColorCodeWithOpactiyNumber,
  showError,
  showSuccess,
} from '../../../utils/helperFunctions';
import PhoneNumberInput from '../../../Components/PhoneNumberInput';
import validations from '../../../utils/validations';
import actions from '../../../redux/actions';
import {personaltoken} from '../../../config/urls';
import {getItem} from '../../../utils/utils';
import {cloneDeep} from 'lodash';
import DocumentPicker from 'react-native-document-picker';

export default function Signup({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  const [state, setState] = useState({
    isLoading: false,
    fullName: '',
    phoneNumber: '',
    callingCode: clientInfo?.get_country_set?.phonecode
      ? clientInfo?.get_country_set?.phonecode
      : '91',
    cca2: clientInfo?.get_country_set?.code
      ? clientInfo?.get_country_set?.code
      : 'IN',
    allTransportation: transportationArray,
    allEmployeeTypes: employeetypeArray,
    selectedVehicleType: null,
    modelMake: '',
    vehicleColor: '',
    vehiclePlateNumber: '',
    userImage: null,
    selectedEpmloyeetype: null,
    documentData: [],
    addtionalTextInputs: [],
    addtionalImages: [],
    addtionalPdfs: [],
    dataToSet: [],
    profilePic: true,
    addtionSelectedImage: null,
    addtionSelectedImageIndex: null,
  });

  const {
    userImage,
    vehiclePlateNumber,
    isLoading,
    fullName,
    phoneNumber,
    callingCode,
    cca2,
    allTransportation,
    selectedVehicleType,
    modelMake,
    vehicleColor,
    allEmployeeTypes,
    selectedEpmloyeetype,
    documentData,
    addtionalTextInputs,
    addtionalImages,
    addtionalPdfs,
    dataToSet,
    profilePic,
    addtionSelectedImage,
    addtionSelectedImageIndex,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});

  const updateState = data => setState(state => ({...state, ...data}));

  console.log(clientInfo, 'clientInfo');
  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  const styles = stylesFunction({defaultLanguagae});

  //On country change
  const _onCountryChange = data => {
    updateState({cca2: data.cca2, callingCode: data.callingCode[0]});
    return;
  };

  let actionSheet = useRef();
  const showActionSheet = value => {
    console.log(value, 'value>value');
    updateState({profilePic: value});
    setTimeout(() => {
      actionSheet.current.show();
    }, 500);
  };

  useEffect(() => {
    getRequiredDatas();
  }, []);

  const getRequiredDatas = () => {
    (async () => {
      const saveShortCode = await getItem('saveShortCode');
      console.log(saveShortCode, 'saveShortCode');
      actions
        .signupDoc({}, {client: clientInfo?.database_name})
        .then(res => {
          console.log(res, 'getRequiredDatas data');
          if (res?.data && res?.data.length) {
            updateState({
              addtionalTextInputs: res?.data.filter(
                x => x?.file_type == 'Text',
              ),
              addtionalImages: res?.data.filter(x => x?.file_type == 'Image'),
              addtionalPdfs: res?.data.filter(x => x?.file_type == 'Pdf'),
              dataToSet: res?.data?.map((i, inx) => {
                return {
                  type: i?.file_type,
                  value: '',
                };
              }),
            });
          }
          updateState({isLoading: false, documentData: res?.data});
        })
        .catch(errorMethod);
    })();
  };

  // this funtion use for camera handle
  const cameraHandle = async index => {
    // alert(addtionSelectedImageIndex);
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus) {
      if (index == 0 || index == 1) {
        cameraHandler(index, {
          width: 300,
          height: 400,
          cropping: true,
          cropperCircleOverlay: true,
          mediaType: 'photo',
        })
          .then(res => {
            console.log(res, 'res');
            if (profilePic) {
              updateState({userImage: res?.sourceURL || res?.path});
            } else {
              let data = cloneDeep(addtionalImages);
              data[addtionSelectedImageIndex].value =
                res?.sourceURL || res?.path;
              data[addtionSelectedImageIndex].filename1 =
                addtionSelectedImage?.name;
              data[addtionSelectedImageIndex].file_type =
                addtionSelectedImage?.file_type;
              data[addtionSelectedImageIndex].id = addtionSelectedImage?.id;
              data[addtionSelectedImageIndex].mime = res?.mime;
              console.log(data, 'data>>>>');

              updateState({addtionalImages: data});
            }
          })
          .catch(err => {});
      }
    }
  };

  const isValidData = () => {
    const error = validator({phoneNumber});
    if (error) {
      showError(error);
      return;
    }
    return true;
  };

  const _onSignup = () => {
    if (!userImage) {
      return showError(strings.SETIMAGE);
    }
    const nameError = validations({
      name: fullName,
    });
    if (nameError) {
      return showError(nameError);
    }
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }

    if (!selectedVehicleType) {
      return showError(strings.SELECTTRANSPORTATION);
    }
    if (!selectedEpmloyeetype) {
      return showError(strings.SELECTEMPLOYEETYPE);
    }

    const otherErrors = validations({
      modelMake: modelMake,
      vehicleColor: vehicleColor,
      vehiclePlateNumber: vehiclePlateNumber,
    });
    if (otherErrors) {
      return showError(otherErrors);
    }

    let formdata = new FormData();
    formdata.append('name', fullName);
    formdata.append('phone_number', `+${callingCode}${phoneNumber}`);
    formdata.append('type', selectedEpmloyeetype?.typeName);
    formdata.append('make_model', modelMake);
    formdata.append('plate_number', vehiclePlateNumber);
    formdata.append('color', vehicleColor);
    formdata.append('vehicle_type_id', selectedVehicleType?.id);
    formdata.append('profile_picture', {
      type: 'image/jpeg',
      name: `${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5)}.jpg`,
      uri: userImage,
    });

    if (addtionalTextInputs.length) {
      addtionalTextInputs.map((i, inx) => {
        if (i?.contents != '') {
          formdata.append(`files_text[${inx}][file_type]`, i?.file_type);
          formdata.append(`files_text[${inx}][id]`, i?.id);
          formdata.append(`files_text[${inx}][contents]`, i?.contents);
          formdata.append(`files_text[${inx}][label_name]`, i?.label_name);
        }
      });
    }

    let concatinatedArray = addtionalImages.concat(addtionalPdfs);

    if (concatinatedArray.length) {
      concatinatedArray.map((i, inx) => {
        if (i?.value) {
          formdata.append(`other[${inx}][file_type]`, i?.file_type);
          formdata.append(`other[${inx}][id]`, i?.id);
          formdata.append(`other[${inx}][filename1]`, i?.filename1);
        }
      });
    }

    if (concatinatedArray.length) {
      concatinatedArray.map((i, inx) => {
        if (i?.value) {
          formdata.append(`uploaded_file[${inx}]`, {
            name: i?.filename1,
            type: i?.mime,
            uri: i?.value,
          });
        }
      });
    }
    console.log(JSON.stringify(formdata), 'formdata>formdata');

    updateState({isLoading: true});
    actions
      .signUp(formdata, {client: clientInfo?.database_name})
      .then(res => {
        updateState({isLoading: false});
        showSuccess('SignUp successfuly.');
        navigation.goBack();
      })
      .catch(errorMethod);
  };
  const errorMethod = error => {
    updateState({isLoading: false});
    showError(error?.message || error?.error);
  };

  const _selectedTransportation = i => {
    updateState({
      selectedVehicleType: i,
    });
  };
  const _selectedEpmloyeetype = i => {
    updateState({
      selectedEpmloyeetype: i,
    });
  };

  //Get TextInput
  const getTextInputField = (type, index) => {
    return (
      <TextInputWithlabel
        labelStyle={styles.textInputlabel}
        editable={true}
        label={type?.name}
        value={addtionalTextInputs[index]?.contents}
        onChangeText={text => updateArray(text, index, type)}
      />
    );
  };

  //Update Images
  const updateImages = (type, index) => {
    updateState({addtionSelectedImage: type, addtionSelectedImageIndex: index});
    showActionSheet(false);
  };

  //Get Upload image view

  const getImageFieldView = (type, index) => {
    console.log(' addtionalImages[index]', addtionalImages[index]);
    return (
      <View
        style={{
          marginRight: moderateScale(20),
          marginTop: moderateScale(10),
          width: moderateScale(100),
        }}>
        <Text numberOfLines={2} style={[styles.label3]}>
          {type?.name}
        </Text>
        <TouchableOpacity
          onPress={() => updateImages(type, index)}
          style={styles.imageUpload}>
          {addtionalImages[index].value != undefined &&
          addtionalImages[index].value != null &&
          addtionalImages[index].value != '' ? (
            <Image
              source={{uri: addtionalImages[index].value}}
              style={styles.imageStyle2}
            />
          ) : (
            <Image source={imagePath?.photoInactive} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const getDoc = async (value, index) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(res, 'res>res');
      let data = cloneDeep(addtionalPdfs);
      if (res) {
        data[index].value = res[0].uri;
        data[index].filename = res[0].name;
        data[index].filename1 = value?.name;
        data[index].file_type = value?.file_type;
        data[index].id = value?.id;
        data[index].mime = res[0].type;

        console.log(data, 'addtionalPdfs>>>data');

        updateState({addtionalPdfs: data});
      }

      // console.log(
      //   res.uri,
      //   res.type, // mime type
      //   res.name,
      //   res.size,
      // );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  //Get Pdf view

  const getPdfView = (type, index) => {
    return (
      <View
        style={{marginRight: moderateScale(20), marginTop: moderateScale(20)}}>
        <Text style={[styles.label3]}>{type?.name}</Text>
        <TouchableOpacity
          onPress={() => getDoc(type, index)}
          style={styles.imageUpload}>
          <Text style={styles.uploadStyle}>
            {addtionalPdfs[index].value != undefined &&
            addtionalPdfs[index].value != null &&
            addtionalPdfs[index].value != ''
              ? `${addtionalPdfs[index].filename}`
              : `+ ${strings.UPLOAD}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  //Update Array for PDF

  //Update Array for image
  const updateArray = (text, index, type) => {
    let data = cloneDeep(addtionalTextInputs);
    data[index].contents = text;
    data[index].id = type?.id;
    data[index].file_type = type?.file_type;
    data[index].label_name = type?.name;
    console.log(data, 'data>>>data');
    updateState({addtionalTextInputs: data});
  };

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.white}
      isLoadingB={isLoading}
      source={loaderOne}>
      <Header
        headerStyle={{backgroundColor: colors.white}}
        // hideRight={true}
        // onPressLeft={()=>navigation.goBack()}
        centerTitle={strings.SIGNUP}
      />
      <View style={{...commonStyles.headerTopLine}} />
      <View
        style={{
          marginHorizontal: moderateScale(15),
          marginVertical: moderateScale(20),
        }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceHorizontal={false}>
          <View style={styles.imageViewStyle}>
            {userImage ? (
              <TouchableOpacity onPress={() => showActionSheet(true)}>
                <Image source={{uri: userImage}} style={styles.imageStyle} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => showActionSheet(true)}>
                <Image
                  source={imagePath?.photoInactive}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginTop: moderateScale(20)}}>
            <Text style={styles.label}>{strings.PERSONAL}</Text>
            <View style={{marginTop: moderateScaleVertical(20)}}>
              <TextInputWithlabel
                editable={true}
                label={strings.FULLNAME}
                value={fullName}
                onChangeText={text => updateState({fullName: text})}
                labelStyle={styles.textInputlabel}
              />
              <View>
                <Text style={styles.label2}>{strings.PHONENUMBER}</Text>
              </View>
              <PhoneNumberInput
                onCountryChange={_onCountryChange}
                onChangePhone={phoneNumber =>
                  updateState({phoneNumber: phoneNumber.replace(/[^0-9]/g, '')})
                }
                cca2={cca2}
                phoneNumber={phoneNumber}
                callingCode={state.callingCode}
                placeholder={strings.YOUR_PHONE_NUMBER}
                keyboardType={'phone-pad'}
                returnKeyType={'done'}
                color={colors.black}
                borderColor={colors.themeColor}
                containerStyle={{
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: colors.borderLight,
                }}
                borderLeftColor={colors.borderLight}
                // color={isDarkMode ? MyDarkTheme.colors.text : null}
              />
            </View>

            <View style={{marginVertical: moderateScaleVertical(20)}}>
              <Text style={styles.label}>{strings.TRASNPORTATION}</Text>
            </View>
            <View>
              <ScrollView
                horizontal
                alwaysBounceHorizontal={false}
                style={styles.transporationOuterContainer}>
                {allTransportation.map((i, inx) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.transportationContainer,
                        {...styles.shadowStyle},
                      ]}
                      onPress={() => {
                        _selectedTransportation(i);
                      }}>
                      {selectedVehicleType == i ? (
                        <Image
                          style={{position: 'absolute', end: 5, top: 10}}
                          source={imagePath.blue_tik}
                        />
                      ) : null}

                      <Image
                        source={
                          selectedVehicleType == i
                            ? i.activeIcon
                            : i.inactiveIcon
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{marginTop: moderateScaleVertical(10)}}>
              <Text style={styles.employeetypeHeadingtext}>
                {strings.EMPLOYEETYPE}
              </Text>
              <ScrollView
                horizontal
                alwaysBounceHorizontal={false}
                style={styles.mainallEmployeeTypeStyle}
                containerStyle={styles.employeeInnerContainer}>
                {allEmployeeTypes.map((i, inx) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        _selectedEpmloyeetype(i);
                      }}
                      style={styles.employeeImageContainer}>
                      <Image
                        source={
                          selectedEpmloyeetype == i
                            ? imagePath.redioSelectedButton
                            : imagePath.redioUnSelectedButton
                        }
                      />
                      <Text
                        style={{
                          marginHorizontal: moderateScale(10),
                          fontSize: textScale(12),
                          fontFamily: fontFamily.medium,
                          color:
                            selectedEpmloyeetype == i
                              ? colors.themeColor
                              : colors.lightGreyBg2,
                        }}>
                        {i?.typeName}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{marginTop: moderateScaleVertical(10)}}>
              <TextInputWithlabel
                labelStyle={styles.textInputlabel}
                editable={true}
                label={strings.MODELMAKE}
                value={modelMake}
                onChangeText={text => updateState({modelMake: text})}
              />

              <TextInputWithlabel
                labelStyle={styles.textInputlabel}
                editable={true}
                label={strings.COLOR}
                value={vehicleColor}
                onChangeText={text => updateState({vehicleColor: text})}
              />

              <TextInputWithlabel
                labelStyle={styles.textInputlabel}
                editable={true}
                label={strings.PLATEORDER}
                value={vehiclePlateNumber}
                onChangeText={text => updateState({vehiclePlateNumber: text})}
              />
            </View>

            {!!(addtionalTextInputs && addtionalTextInputs.length) &&
              addtionalTextInputs.map((item, index) => {
                return getTextInputField(item, index);
              })}

            {!!(addtionalImages && addtionalImages.length) && (
              <View style={styles.viewStyleForUploadImage}>
                {addtionalImages.map((item, index) => {
                  return getImageFieldView(item, index);
                })}
              </View>
            )}

            {!!(addtionalPdfs && addtionalPdfs.length) && (
              <View style={styles.viewStyleForUploadImage}>
                {addtionalPdfs.map((item, index) => {
                  return getPdfView(item, index);
                })}
              </View>
            )}
          </View>
          <GradientButton
            onPress={_onSignup}
            containerStyle={{marginVertical: moderateScaleVertical(40)}}
            // onPress={_onLogin}
            marginTop={moderateScaleVertical(20)}
            marginBottom={moderateScaleVertical(40)}
            textStyle={{color: colors.black}}
            btnText={strings.SIGNUP}
            colorsArray={[colors.themeColor, colors.themeColor]}
          />
        </KeyboardAwareScrollView>
        <ActionSheet
          ref={actionSheet}
          // title={'Choose one option'}
          options={[strings.CAMERA, strings.GALLERY, strings.CANCEL]}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={index => cameraHandle(index)}
        />
      </View>
    </WrapperContainer>
  );
}
