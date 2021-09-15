import React, {useState} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
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
  width,
} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import {transportationArray} from '../../utils/constants/ConstantValues';
import styles from './styles';

export default function MyProfile({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  console.log(userData, 'userData');
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
    modelMake: userData?.make_model ? userData?.make_model : '',
    vehicleColor: userData?.color ? userData?.color : '',
  });

  const {
    isLoading,
    fullName,
    phoneNumber,
    callingCode,
    cca2,
    allTransportation,
    selectedVehicleType,
    modelMake,
    vehicleColor,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});

  const updateState = data => setState(state => ({...state, ...data}));

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  //On country change
  const _onCountryChange = data => {
    updateState({cca2: data.cca2, callingCode: data.callingCode[0]});
    return;
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
      />
      <View style={{...commonStyles.headerTopLine}} />
      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginVertical: moderateScale(20),
        }}>
        <KeyboardAwareScrollView bounces={false} alwaysBounceHorizontal={false}>
          <View style={styles.imageViewStyle}>
            {userData && userData?.image_url && (
              <Image
                source={{uri: userData?.image_url}}
                style={styles.imageStyle}
              />
            )}
          </View>
          <View style={{marginTop: moderateScale(20)}}>
            <Text style={styles.label}>{strings.PERSONAL}</Text>
            <View style={{marginTop: moderateScaleVertical(20)}}>
              <TextInputWithlabel label={strings.FULLNAME} value={fullName} />
              <TextInputWithlabel
                label={strings.PHONENUMBER}
                value={phoneNumber}
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
                  height: moderateScaleVertical(60),
                  marginHorizontal: moderateScale(-20),
                }}>
                {allTransportation.map((i, inx) => {
                  return (
                    <View
                      style={{
                        // backgroundColor: 'red',
                        width: width / 5,
                        borderRightWidth: 1,
                        borderRightColor: colors.borderLight,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={
                          selectedVehicleType == inx
                            ? i.activeIcon
                            : i.inactiveIcon
                        }
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{marginTop: moderateScaleVertical(20)}}>
              <TextInputWithlabel label={strings.MODELMAKE} value={modelMake} />

              <TextInputWithlabel label={strings.COLOR} value={vehicleColor} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </WrapperContainer>
  );
}
