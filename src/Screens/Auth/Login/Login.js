import React, {useState} from 'react';
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
import stylesFunc from './styles';
import PhoneNumberInput from '../../../Components/PhoneNumberInput';
import ScaledImage from 'react-native-scalable-image';

export default function Login({navigation, route}) {
  const paramData = route?.params?.data;
  console.log(paramData, 'paramData>paramData');
  const [state, setState] = useState({
    isLoading: false,
    callingCode: paramData?.get_country_set?.phonecode
      ? paramData?.get_country_set?.phonecode
      : '91',
    cca2: paramData?.get_country_set?.code
      ? paramData?.get_country_set?.code
      : 'IN',
    phoneNumber: '9785771568',
  });

  const {themeColors} = useSelector(state => state?.initBoot);
  //   const fontFamily = appStyle?.fontSizeData;
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  console.log(clientInfo, 'clientInfo>clientInfo');
  //Update states
  const updateState = data => setState(state => ({...state, ...data}));
  //Styles in app
  const styles = stylesFunc({themeColors});
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

  //Validate form
  const isValidData = () => {
    const error = validator({phoneNumber});
    if (error) {
      showError(error);
      return;
    }
    return true;
  };

  //Login api fucntion
  const _onLogin = () => {
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }
    let data = {};
    data['phone_number'] = `+${callingCode}${phoneNumber}`;
    updateState({isLoading: true});
    actions
      .login(data, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'login data');
        updateState({isLoading: false});
        if (res?.data) {
          showSuccess('Otp send successfuly.');
          moveToNewScreen(navigationStrings.SEND_OTP, res?.data)();
        }
      })
      .catch(errorMethod);
  };

  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false});
    showError(error?.message || error?.error);
  };

  //On country change
  const _onCountryChange = data => {
    updateState({cca2: data.cca2, callingCode: data.callingCode[0]});
    return;
  };

  return (
    <WrapperContainer
      isLoadingB={isLoading}
      source={loaderOne}
      statusBarColor={colors.white}
      bgColor={colors.white}>
      <View style={{flex: 1, marginHorizontal: 20}}>
        <View style={styles.imageStyle}>
          <ScaledImage
            width={width / 2}
            source={
              paramData && paramData?.logo
                ? {uri: paramData?.logo}
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
              // color={isDarkMode ? MyDarkTheme.colors.text : null}
            />

            <GradientButton
              containerStyle={{marginTop: moderateScaleVertical(40)}}
              onPress={_onLogin}
              textStyle={{color: colors.black}}
              btnText={strings.LOGIN}
              colorsArray={[colors.themeColor, colors.themeColor]}
            />

            <View
              style={{
                marginTop: moderateScaleVertical(20),
                flexDirection: 'row',
              }}>
              <Text style={styles.byContinue}>{`${strings.BYCONTINUE} `}</Text>
            </View>

            <View
              style={{
                marginTop: moderateScaleVertical(5),
                flexDirection: 'row',
              }}>
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
