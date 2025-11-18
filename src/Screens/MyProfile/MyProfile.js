import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import TextInputWithlabel from '../../Components/TextInputWithlabel';
import WrapperContainer from '../../Components/WrapperContainer';
import PhoneNumberInput from '../../Components/PhoneNumberInput';

import strings from '../../constants/lang';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import {transportationArray} from '../../utils/constants/ConstantValues';
import stylesFunction from './styles';
import actions from '../../redux/actions';
import navigationStrings from '../../navigation/navigationStrings';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {removeItem} from '../../utils/utils';
import {removerUserData} from '../../redux/actions/auth';
import {getBundleId} from 'react-native-device-info';
import {appIds} from '../../utils/constants/DynamicAppKeys';
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';
import ActionSheet from 'react-native-actionsheet';
import {cameraHandler} from '../../utils/commonFunction';
import {androidCameraPermission} from '../../utils/permissions';

export default function MyProfile({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );
  const [state, setState] = useState({
    isLoading: false,
    fullName: userData?.name ? userData?.name : '',
    phoneNumber: userData?.phone_number ? userData?.phone_number : '',
    callingCode: '91',
    cca2: 'IN',
    allTransportation: transportationArray,
    selectedVehicleType: userData?.vehicle_type_id
      ? userData?.vehicle_type_id
      : null,
    modelMake: userData?.make_model ? userData?.make_model : null,
    vehicleColor: userData?.color ? userData?.color : null,
    plateNumber: userData?.plate_number ? userData?.plate_number : null,

    type: userData?.type ? userData?.type : null,
    team: userData?.team ? userData?.team : null,
    referCode: userData?.refferal_code ? userData?.refferal_code : '',
    DriverUniqueId: userData?.unique_id,
    isEditable: false,
    profilePic: userData?.image_url,
    loader: false,
  });

  const {
    team,
    type,
    isLoading,
    fullName,
    phoneNumber,
    callingCode,
    cca2,
    allTransportation,
    selectedVehicleType,
    modelMake,
    vehicleColor,
    plateNumber,
    DriverUniqueId,
    referCode,
    isEditable,
    profilePic,
    loader,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});
  let actionSheet = useRef();
  console.log(actionSheet.current, 'actionSheetactionSheet123321332423432');
  const showActionSheet = value => {
    console.log(value, 'value>value');
    // updateState({ profilePic: value });
    setTimeout(() => {
      actionSheet.current.show();
    }, 500);
  };

  const updateState = data => setState(state => ({...state, ...data}));
  const onShare = () => {
    let options = {
      title: 'Driver id',
      message: DriverUniqueId,
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
console.log(isEditable,'isEditableisEditable')
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      updateState({
        isLoading: false,
        fullName: userData?.name ? userData?.name : '',
        phoneNumber: userData?.phone_number ? userData?.phone_number : '',
        callingCode: '91',
        cca2: 'IN',
        allTransportation: transportationArray,
        selectedVehicleType: userData?.vehicle_type_id
          ? userData?.vehicle_type_id
          : null,
        modelMake: userData?.make_model ? userData?.make_model : '',
        vehicleColor: userData?.color ? userData?.color : '',
        plateNumber: userData?.plate_number ? userData?.plate_number : '',

        type: userData?.type ? userData?.type : null,
        team: userData?.team ? userData?.team : null,
        referCode: userData?.refferal_code ? userData?.refferal_code : '',
        DriverUniqueId: userData?.unique_id,
      });
    }
  }, [
    userData?.vehicle_type_id,
    userData?.team,
    userData?.plate_number,
    userData?.phone_number,
    userData?.name,
  ]);
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
            console.log(res, 'resasfasdfsdf');
            if (res.path) {
              // if (profilePic) {
              updateState({profilePic: res?.sourceURL || res?.path});
              // }
            } else {
              showError(strings.PICKERCANCLLED);
            }
          })
          .catch(err => {
            console.log(err, 'error');
          });
      }
    }
  };
  const styles = stylesFunction({defaultLanguagae});
  console.log(userData, 'userDatta');
  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const onDeleteAccount = () => {
    Alert.alert('', strings.ARE_YOU_SURE_YOU_WANT_TO_DELETE, [
      {
        text: strings.CANCEL,
        onPress: () => console.log('Cancel Pressed'),
        // style: 'destructive',
      },
      {
        text: strings.CONFIRM,
        onPress: deleleUserAccount,
      },
    ]);
  };
  const deleleUserAccount = async () => {
    try {
      const res = await actions.deleteAccount(
        {},
        {
          client: clientInfo?.database_name,
          language: defaultLanguagae?.value ? defaultLanguagae?.value : 'en',
        },
      );
      console.log('delete user account res++++', res);
      await removeItem('userData');
      removerUserData(null);
      showSuccess(res?.massage);
      // logout()
    } catch (error) {
      console.log('erro raised', error);
      showError(error?.message);
    }
  };
  const copyToClipboard = () => {
    Clipboard.setString(referCode);
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
        centerTitle={strings.PROFILE}
        customRight={() => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: colors?.themeColor,
                padding: moderateScale(8),
                borderRadius: moderateScale(10),
                minWidth: moderateScale(70),
                alignItems: 'center',
              }}
              onPress={() => {
                if (isEditable) {
                  updateState({loader: true});
                  let formdata = new FormData();
                  formdata.append('name', fullName);
                  formdata.append('plate_number', plateNumber);
                  formdata.append('color', vehicleColor);
                  formdata.append('make_model', modelMake);
                  formdata.append('profile_picture', {
                    type: 'image/jpeg',
                    name: `${Math.random()
                      .toString(36)
                      .replace(/[^a-z]+/g, '')
                      .substr(0, 5)}.jpg`,
                    uri: profilePic,
                  });
                  // formdata.append('name',fullName)
                  actions
                    .updateProfile(formdata, {
                      client: clientInfo?.database_name,
                      'Content-Type': 'multipart/form-data',
                    })
                    .then(res => {
                      updateState({loader: false});
                      updateState({isEditable: !isEditable});
                      showSuccess(res?.message);
                      console.log(res);
                      if (res?.data?.data)
                        actions.updataeUserData({
                          ...userData,
                          ...res?.data?.data,
                        });
                      navigation.goBack();
                    })
                    .catch(err => {
                      console.log(err);
                      updateState({loader: false});
                    });
                  return;
                }
                else{

                  updateState({isEditable: !isEditable});
                }
              }}>
              {loader ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontFamily: fontFamily?.bold,
                    fontSize: textScale(15),
                    // paddingHorizontal:moderateScale(10)
                  }}>
                  {isEditable ? 'Save' : 'Edit'}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <ScrollView>
        <View style={{...commonStyles.headerTopLine}} />
        <View style={styles.rootContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            alwaysBounceHorizontal={false}>
            <View style={styles.imageViewStyle}>
              {userData && userData?.image_url && (
                <Image source={{uri: profilePic}} style={styles.imageStyle} />
              )}
              {isEditable && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: colors.white,
                    borderRadius: 20,
                    padding: 5,
                  }}
                  onPress={showActionSheet}>
                  <Image source={imagePath?.icCamIcon} />
                </TouchableOpacity>
              )}
            </View>
           { Number(userData?.rating) >0 && <View
              style={{
                position: 'absolute',
                right: 5,
                backgroundColor: colors?.yellowB,
                padding: moderateScale(5),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={imagePath?.star}
                style={{height: moderateScale(14), width: moderateScale(14)}}
              />
              <Text style={{marginLeft: moderateScale(4)}}>
                {Number(userData?.rating).toFixed(1)}
              </Text>
            </View>}
            <View style={styles.personalInfoContainer}>
              <View
                style={{
                  borderBottomColor: colors.greySearchBackground,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <Text style={styles.label}>{strings.PERSONAL}</Text>
              </View>
              <View style={styles.personalInfoContainer}>
                {/* <TextInputWithlabel
                labelStyle={styles.textInputStyle}
                label={strings.FULLNAME}
                value={fullName}
                textInputStyle={styles.textInputStyle}
              /> */}
                <View
                  style={
                    {
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                    }
                  }>
                  <View style={{flex: 0.5, marginBottom: moderateScale(20)}}>
                    <View>
                      <Text style={[styles.label2, styles.textInputStyle]}>
                        {strings.FULLNAME}
                      </Text>
                    </View>
                    {isEditable && (
                      <TextInput
                        value={fullName}
                        onChangeText={text => updateState({fullName: text})}
                        style={{
                          borderBottomWidth: 0.5,
                          padding: moderateScale(3),
                          borderColor: colors?.textGreyOpcaity6,
                        }}
                      />
                    )}{!isEditable && (
                      <Text
                        style={{
                          color: colors.black,
                          fontFamily: fontFamily.semiBold,
                          fontSize: textScale(12),
                        }}>
                        {fullName}
                      </Text>
                    )}
                  </View>

                  <View style={{flex: 0.5, marginBottom: moderateScale(20)}}>
                    <View>
                      <Text style={[styles.label2, styles.textInputStyle]}>
                        {strings.PHONENUMBER}
                      </Text>
                    </View>
                    {isEditable ? (
                      <TextInput
                        value={phoneNumber}
                        isEditable={false}
                        // onChangeText={text => updateState({fullName: text})}
                        style={{
                          borderBottomWidth: 0.5,
                          padding: moderateScale(3),
                          borderColor: colors?.textGreyOpcaity6,
                          backgroundColor: colors?.greySearchBackground,
                          paddingVertical: moderateScale(10),
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          color: colors.black,
                          fontFamily: fontFamily.semiBold,
                          fontSize: textScale(12),
                        }}>
                        {phoneNumber}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={
                    {
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                    }
                  }>
                  {/* {!!type && (
                    <View style={{flex: 0.5, marginBottom: moderateScale(20)}}>
                      <View>
                        <Text style={[styles.label2, styles.textInputStyle]}>
                          {strings.JOBTYPE}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: colors.black,
                          fontFamily: fontFamily.semiBold,
                          fontSize: textScale(12),
                        }}>
                        {type}
                      </Text>
                    </View>
                  )} */}
                  {!!referCode && (
                    <TouchableOpacity
                      onPress={copyToClipboard}
                      style={{flex: 0.5, marginBottom: moderateScale(20)}}>
                      <View>
                        <Text style={[styles.label2, styles.textInputStyle]}>
                          {strings.REFERRAL_CODE}
                        </Text>
                      </View>
                      {isEditable ? (
                        <TextInput
                          value={referCode}
                          // onChangeText={text => updateState({fullName: text})}
                          style={{
                            borderBottomWidth: 0.5,
                            padding: moderateScale(3),
                            borderColor: colors?.textGreyOpcaity6,
                            backgroundColor: colors?.greySearchBackground,
                            paddingVertical: moderateScale(10),
                          }}
                        />
                      ) : (
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: colors.black,
                              fontFamily: fontFamily.semiBold,
                              fontSize: textScale(12),
                            }}>
                            {referCode}
                          </Text>
                          <Image
                            style={{marginLeft: moderateScale(20)}}
                            source={imagePath.details}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
                {!!team && (
                  <View>
                    <View>
                      <Text style={[styles.label2, styles.textInputStyle]}>
                        {strings.ASSIGNEDTEAM}
                      </Text>
                    </View>
                    {isEditable ? (
                      <TextInput
                        value={team?.name}
                        // onChangeText={text => updateState({fullName: text})}
                        style={{
                          borderBottomWidth: 0.5,
                          padding: moderateScale(3),
                          borderColor: colors?.textGreyOpcaity6,
                          backgroundColor: colors?.greySearchBackground,
                          paddingVertical: moderateScale(10),
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          color: colors.black,
                          fontFamily: fontFamily.semiBold,
                          fontSize: textScale(12),
                        }}>
                        {team?.name}
                      </Text>
                    )}
                  </View>
                )}

                {!!DriverUniqueId && (
                  <View style={{marginBottom: moderateScale(20)}}>
                    <View
                      style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={[styles.label2, styles.textInputStyle]}>
                        Driver id
                      </Text>
                      <TouchableOpacity onPress={onShare}>
                        <Image source={imagePath.share} />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: fontFamily.semiBold,
                        fontSize: textScale(12),
                      }}>
                      {DriverUniqueId}
                    </Text>
                  </View>
                )}

                {/* <TextInputWithlabel
                labelStyle={styles.textInputStyle}
                label={strings.PHONENUMBER}
                value={phoneNumber}
                textInputStyle={styles.textInputStyle}
              /> */}
              </View>

              {/* {!!selectedVehicleType && (
                <View>
                  <View style={styles.personalInfoContainer}>
                    <Text style={styles.label}>{strings.TRASNPORTATION}</Text>
                  </View>
                  <View>
                    <ScrollView
                      horizontal
                      alwaysBounceHorizontal={false}
                      style={styles.transportationViewStyle}>
                      {allTransportation.map((i, inx) => {
                        return (
                          <View style={styles.transportationImageStyle}>
                            <Image
                              source={
                                selectedVehicleType == i.id
                                  ? i.activeIcon
                                  : i.inactiveIcon
                              }
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              )} */}
              <View style={styles.carInfoStyle}>
                {modelMake != null && (
                  <View style={{marginBottom: moderateScale(20)}}>
                    <View>
                      <Text style={[styles.label2, styles.textInputStyle]}>
                        {strings.MODELMAKE}
                      </Text>
                    </View>
                    {isEditable ? (
                      <TextInput
                        value={modelMake}
                        onChangeText={text => updateState({modelMake: text})}
                        style={{
                          borderBottomWidth: 0.5,
                          padding: moderateScale(3),
                          borderColor: colors?.textGreyOpcaity6,
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          color: colors.black,
                          fontFamily: fontFamily.semiBold,
                          fontSize: textScale(14),
                        }}>
                        {modelMake}
                      </Text>
                    )}
                  </View>
                )}

                {vehicleColor != null && (
                  <View style={{marginBottom: moderateScale(20)}}>
                    <View>
                      <Text style={[styles.label2, styles.textInputStyle]}>
                        {strings.COLOR}
                      </Text>
                    </View>
                    {isEditable ? (
                      <TextInput
                        value={vehicleColor}
                        onChangeText={text => updateState({vehicleColor: text})}
                        style={{
                          borderBottomWidth: 0.5,
                          padding: moderateScale(3),
                          borderColor: colors?.textGreyOpcaity6,
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          color: colors.black,
                          fontFamily: fontFamily.semiBold,
                          fontSize: textScale(14),
                        }}>
                        {vehicleColor}
                      </Text>
                    )}
                  </View>
                )}

                {plateNumber != null && (
                  <View style={{marginBottom: moderateScale(20)}}>
                    <View>
                      <Text style={[styles.label2, styles.textInputStyle]}>
                        {getBundleId() == appIds.mrVeloz &&
                        defaultLanguagae?.value == 'es'
                          ? strings.PLATEORDER_MRVELOZ
                          : strings.PLATEORDER}
                      </Text>
                    </View>
                    {isEditable ? (
                      <TextInput
                        value={plateNumber}
                        onChangeText={text => updateState({plateNumber: text})}
                        style={{
                          borderBottomWidth: 0.5,
                          padding: moderateScale(3),
                          borderColor: colors?.textGreyOpcaity6,
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          color: colors.black,
                          fontFamily: fontFamily.semiBold,
                          fontSize: textScale(14),
                        }}>
                        {plateNumber}
                      </Text>
                    )}
                  </View>
                )}

                {/* <TextInputWithlabel
                labelStyle={styles.textInputStyle}
                label={strings.MODELMAKE}
                value={modelMake}
                textInputStyle={styles.textInputStyle}
              />
              <TextInputWithlabel
                labelStyle={styles.textInputStyle}
                label={strings.COLOR}
                value={vehicleColor}
                textInputStyle={styles.textInputStyle}
              />
              <TextInputWithlabel
                labelStyle={styles.textInputStyle}
                label={strings.PLATEORDER}
                value={plateNumber}
                textInputStyle={styles.textInputStyle}
              /> */}
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        {!isEditable && (
          <TouchableOpacity
            onPress={onDeleteAccount}
            style={{
              marginTop: 'auto',
              alignSelf: 'center',
              marginBottom: moderateScaleVertical(12),
              // backgroundColor: colors.blueBackGroudC,
              // padding: 7,
            }}>
            <Text
              style={{
                color: colors.redB,
                fontFamily: fontFamily.bold,
                fontSize: textScale(20),
              }}>
              {strings.DELETE_ACCOUNT}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <ActionSheet
        ref={actionSheet}
        // title={'Choose one option'}
        options={[strings.CAMERA, strings.CANCEL]}
        cancelButtonIndex={1}
        destructiveButtonIndex={1}
        onPress={index => cameraHandle(index)}
      />
    </WrapperContainer>
  );
}
