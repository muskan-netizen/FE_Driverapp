import React, {useEffect, useState} from 'react';
import {
  Platform,
  View,
  Image,
  BackHandler,
  Text,
  Linking,
  Alert,
} from 'react-native';
import DeviceInfo, {getBundleId} from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import GradientButton from '../../../Components/GradientButton';
import {loaderOne} from '../../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../styles/responsiveSize';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import validator from '../../../utils/validations';
import stylesFunc from './styles';
import PhoneNumberInput from '../../../Components/PhoneNumberInput';
import ScaledImage from 'react-native-scalable-image';
import {appIds} from '../../../utils/constants/DynamicAppKeys';
import Header from '../../../Components/Header';
import {TouchableOpacity} from 'react-native';
import {requestUserPermission} from '../../../utils/notificationServices';

export default function Login({navigation, route}) {
  const paramData = route?.params?.data;
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  const fcmToken = useSelector(state => state?.initBoot?.fcmToken);
  console.log(paramData, 'paramData>paramData');
  const [state, setState] = useState({
    isLoading: false,
    callingCode: clientInfo?.get_country_set?.phonecode
      ? clientInfo?.get_country_set?.phonecode
      : '91',
    cca2: clientInfo?.get_country_set?.code
      ? clientInfo?.get_country_set?.code
      : 'IN',
    phoneNumber: '',
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const {themeColors} = useSelector(state => state?.initBoot);
  //   const fontFamily = appStyle?.fontSizeData;

  //Update states
  const updateState = data => setState(state => ({...state, ...data}));

  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  //Styles in app
  const styles = stylesFunc({defaultLanguagae});

  //all states used in this screen
  const {phoneNumber, cca2, callingCode, isLoading} = state;

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };
  //On change textinput
  const _onChangeText = key => val => {
    updateState({[key]: val});
  };

  useEffect(() => {
    // actions.sessionLogoutUser(false);
    updateState({
      callingCode: clientInfo?.get_country_set?.phonecode
        ? clientInfo?.get_country_set?.phonecode
        : '91',
      cca2: clientInfo?.get_country_set?.code
        ? clientInfo?.get_country_set?.code
        : 'IN',
    });
  }, [clientInfo]);

  //Validate form
  const isValidData = () => {
    const error = validator({phoneNumber});
    if (error) {
      showError(error);
      return;
    }
    return true;
  };

  // const _alert = () => {
  //   Alert.alert(strings.notificationAlertTitle, strings.notificationAlert, [
  //     {
  //       text: strings.CANCEL,
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: strings.visitSetting, onPress: () => Linking.openSettings()},
  //   ]);
  // };

  const _onLogin = () => {
    // requestUserPermission(login, _alert);

    const checkValid = isValidData();
    if (checkValid) {
      let data = {};
      data['phone_number'] = `+${callingCode}${phoneNumber}`;
      // actions.sessionLogoutUser(false);
      updateState({isLoading: true});
      actions
        .login(data, {client: clientInfo?.database_name})
        .then(res => {
          console.log(res, 'login data');
          updateState({isLoading: false});
          if (res?.data) {
            showSuccess(strings.OTPSENDSUCCESS);
            moveToNewScreen(navigationStrings.SEND_OTP, res?.data)();
          }
        })
        .catch(errorMethod);
    }
  };

  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false});
    showError(error?.message || error?.error, 10000);
  };

  //On country change
  const _onCountryChange = data => {
    updateState({cca2: data.cca2, callingCode: data.callingCode[0]});
    return;
  };

  const _signUp = () => {
    navigation.navigate(navigationStrings.SIGN_UP);
  };
  return (
    <WrapperContainer
      isLoadingB={isLoading}
      source={loaderOne}
      statusBarColor={colors.white}
      bgColor={colors.white}>
      {!!(getBundleId() == appIds.royoorder) && (
        <Header
          leftIcon={imagePath.backArrow}
          // centerTitle={title}
          onPressLeft={
            () =>
              navigation.push(navigationStrings.SHORT_CODE, {
                shortCodeParam: true,
              })
            // navigation.goBack()
          }
          headerStyle={{backgroundColor: colors.white}}
        />
      )}
      <View style={{flex: 1, marginHorizontal: 20}}>
        <View style={styles.imageStyle}>
          <ScaledImage
            width={width / 2}
            source={
              clientInfo && clientInfo?.logo
                ? {uri: clientInfo?.logo}
                : imagePath.logo
            }
          />
        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{height: height / 2}}>
          <View style={styles.bottomSectionStyle}>
            <Text style={styles.loginUsing}>{strings.LOGINUSING}</Text>
            <Text style={styles.loginUsing}>{strings.PHONENUMBER}</Text>
            <Text style={styles.weneedCompany}>
              {strings.WENEDDPHONENUMBER}
            </Text>
            <View style={{marginTop: moderateScale(20)}} />
            <View>
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
                callingCodeTextStyle={styles.callingCodeTextStyle}
                // color={isDarkMode ? MyDarkTheme.colors.text : null}
              />
            </View>

            <GradientButton
              containerStyle={{marginTop: moderateScaleVertical(40)}}
              onPress={() => {
                _onLogin();
              }}
              textStyle={{color: colors.black}}
              btnText={strings.LOGIN}
              colorsArray={[colors.themeColor, colors.themeColor]}
            />

            <TouchableOpacity onPress={_signUp} style={styles.signUpView}>
              <Text style={styles.signUpText}>{strings.SIGNUP}</Text>
            </TouchableOpacity>
            <View style={styles.byContinueTextContainer}>
              <Text style={styles.byContinue}>{`${strings.BYCONTINUE} `}</Text>
            </View>

            <View style={styles.webLinkContainer}>
              <Text
                onPress={() =>
                  navigation.navigate(navigationStrings.WEBLINKS, {id: 1})
                }
                style={styles.bylogging}>
                {`${strings.TERMSANDCONDITIONS} `}
              </Text>
              <Text style={styles.byContinue}>{`${strings.AND} `}</Text>
              <Text
                onPress={() =>
                  navigation.navigate(navigationStrings.WEBLINKS, {id: 2})
                }
                style={[styles.bylogging]}>
                {strings.PRIVACYPOLICY}
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </WrapperContainer>
  );
}
