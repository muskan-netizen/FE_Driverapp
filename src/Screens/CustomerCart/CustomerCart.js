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
import {requestUserPermission} from '../../../utils/notificationServices';

export default function PhoneVerification({navigation, route}) {
  const paramData = route?.params?.data;

  const [state, setState] = useState({
    isLoading: false,
  });

  const {isLoading} = state;
  //   const fontFamily = appStyle?.fontSizeData;
  const {themeColors} = useSelector(state => state?.initBoot);
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  const fcmToken = useSelector(state => state?.initBoot?.fcmToken);

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
    </WrapperContainer>
  );
}
