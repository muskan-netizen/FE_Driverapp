import React, {useState, useEffect} from 'react';
import {Platform, View, Image, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
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
import stylesFunction from './styles';
import PhoneNumberInput from '../../../Components/PhoneNumberInput';
import Header from '../../../Components/Header';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import fontFamily from '../../../styles/fontFamily';
import {getItem} from '../../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhoneVerification({navigation, route}) {
  const paramData = route?.params?.data;

  const [state, setState] = useState({
    isLoading: false,
    callingCode: paramData?.callingCode ? paramData?.callingCode : '91',
    cca2: paramData?.cca2 ? paramData?.cca2 : 'IN',
    phoneNumber: paramData?.phoneNumber,
    otp: '87124',
    otpToShow: '',
    otpPrefilled: false,
    fcm_token: null,
  });

  const {
    isLoading,
    callingCode,
    cca2,
    phoneNumber,
    otp,
    otpToShow,
    otpPrefilled,
    fcm_token,
  } = state;
  //   const fontFamily = appStyle?.fontSizeData;
  const {themeColors} = useSelector(state => state?.initBoot);
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  //Update states
  const updateState = data => setState(state => ({...state, ...data}));
  //Styles in app
  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  const styles = stylesFunction({defaultLanguagae});
  //all states used in this screen

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };
  //On change textinput
  const _onChangeText = key => val => {
    updateState({[key]: val});
  };

  //Validate form
  const isValidData = () => {
    const error = validator({phoneNumber});
    if (error) {
      showError(error);
      return;
    }
    return true;
  };
  useEffect(async () => {
    let token = await AsyncStorage.getItem('fcmToken');
    console.log(token, 'token>token>token');
    updateState({fcm_token: token});
  }, []);

  useEffect(() => {
    if (otp && otpPrefilled) {
      updateState({isLoading: false});
    }
  }, [otp, otpPrefilled]);

  //Opt input function
  const onOtpInput = code => {
    (async () => {
      updateState({
        isLoading: true,
        otp: code,
        otpPrefilled: true,
      });
    })();
  };

  //Code input
  useEffect(() => {
    otp.length == 6 && verfifyAccount();
  }, [otp]);

  //VerifyAccount
  const verfifyAccount = () => {
    let data = {};
    data['phone_number'] = `${paramData?.phone_number}`;
    data['otp'] = otp;
    data['device_token'] = fcm_token;
    data['device_type'] = Platform.OS;
    console.log(data, 'data>data>data');
    updateState({isLoading: true});
    actions
      .verifyAccount(data, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'res loginuser info');
        updateState({isLoading: false});
        if (res?.data) {
          showSuccess(strings.ACCOUNTVERIFYSUCESS);
          moveToNewScreen(navigationStrings.DRAWER_ROUTES)();
        }
      })
      .catch(errorMethod);
  };

  const _resendCode = () => {
    let data = {};
    data['phone_number'] = `${paramData?.phone_number}`;
    updateState({isLoading: true});
    actions
      .login(data, {client: clientInfo?.database_name})
      .then(res => {
        updateState({isLoading: false});
        if (res?.data) {
          showSuccess('Otp send successfuly');
          // moveToNewScreen(navigationStrings.SEND_OTP, res?.data)();
        }
      })
      .catch(errorMethod);
  };

  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false});
    showError(error?.message || error?.error);
  };

  return (
    <WrapperContainer
      isLoadingB={isLoading}
      source={loaderOne}
      statusBarColor={colors.white}
      bgColor={colors.white}>
      <Header
        leftIcon={imagePath.backArrow}
        // centerTitle={title}
        headerStyle={{backgroundColor: colors.white}}
      />
      {/* <View style={{height: moderateScaleVertical(28)}} /> */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: moderateScaleVertical(30),
        }}>
        <Text style={styles.verification}>{strings.VERIFICATION}</Text>
        <Text
          style={
            styles.codesendto
          }>{`${strings.CODESENTTO} ${paramData?.phone_number}`}</Text>

        <SmoothPinCodeInput
          containerStyle={{alignSelf: 'center'}}
          password
          autoFocus={true}
          mask={<View style={styles.maskStyle} />}
          cellSize={width / 8}
          codeLength={6}
          cellSpacing={10}
          editable={true}
          cellStyle={styles.cellStyle}
          cellStyleFocused={styles.cellStyleFocused}
          textStyle={styles.textStyleCodeInput}
          textStyleFocused={styles.textStyleFocused}
          inputProps={{
            autoCapitalize: 'none',
            autoFocus: true,
          }}
          value={otpToShow}
          keyboardType={'default'}
          onTextChange={otpToShow => updateState({otpToShow})}
          onFulfill={code => onOtpInput(code)}
        />

        <Text style={styles.didntgetOtp}>
          {`${strings.DIDNTRECIEVEANYCODE}`}
          <Text
            onPress={_resendCode}
            style={{
              color: colors.themeColor,
              fontFamily: fontFamily.bold,
            }}>{`${strings?.RESENTCODE}`}</Text>
        </Text>
      </View>
    </WrapperContainer>
  );
}
