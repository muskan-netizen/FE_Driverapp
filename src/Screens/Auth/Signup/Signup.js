import React, {useRef, useState} from 'react';
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
import styles from './styles';
import ActionSheet from 'react-native-actionsheet';
import {cameraHandler} from '../../../utils/commonFunction';
import {androidCameraPermission} from '../../../utils/permissions';
import validator from '../../../utils/validations';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import PhoneNumberInput from '../../../Components/PhoneNumberInput';
import validations from '../../../utils/validations';
import actions from '../../../redux/actions';

export default function Signup({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  console.log(userData, 'userData');
  const [state, setState] = useState({
    isLoading: false,
    fullName: '',
    phoneNumber: '',
    callingCode: '91',
    cca2: 'IN',
    allTransportation: transportationArray,
    allEmployeeTypes: employeetypeArray,
    selectedVehicleType: null,
    modelMake: '',
    vehicleColor: '',
    vehiclePlateNumber: '',
    userImage: null,
    selectedEpmloyeetype: null,
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
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});

  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  //On country change
  const _onCountryChange = data => {
    updateState({cca2: data.cca2, callingCode: data.callingCode[0]});
    return;
  };

  let actionSheet = useRef();
  const showActionSheet = () => {
    actionSheet.current.show();
  };

  // this funtion use for camera handle
  const cameraHandle = async index => {
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
            console.log(res, 'ress>>>>>>');
            updateState({userImage: res?.sourceURL || res?.path});
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
    console.log(formdata, 'formdata');
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
              <TouchableOpacity onPress={showActionSheet}>
                <Image source={{uri: userImage}} style={styles.imageStyle} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={showActionSheet}>
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
                style={{
                  height: moderateScaleVertical(70),
                  // marginHorizontal: moderateScale(-20),
                }}>
                {allTransportation.map((i, inx) => {
                  return (
                    <TouchableOpacity
                      style={{
                        ...styles.shadowStyle,
                        // backgroundColor: 'red',
                        width: width / 6,
                        borderRightColor: colors.borderLight,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
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
                style={{
                  height: moderateScaleVertical(50),
                  // marginHorizontal: moderateScale(-20),
                }}>
                {allEmployeeTypes.map((i, inx) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        _selectedEpmloyeetype(i);
                      }}
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: moderateScale(30),
                        marginVertical: moderateScaleVertical(10),
                        alignItems: 'center',
                      }}>
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
                editable={true}
                label={strings.MODELMAKE}
                value={modelMake}
                onChangeText={text => updateState({modelMake: text})}
              />

              <TextInputWithlabel
                editable={true}
                label={strings.COLOR}
                value={vehicleColor}
                onChangeText={text => updateState({vehicleColor: text})}
              />

              <TextInputWithlabel
                editable={true}
                label={strings.PLATEORDER}
                value={vehiclePlateNumber}
                onChangeText={text => updateState({vehiclePlateNumber: text})}
              />
            </View>
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
