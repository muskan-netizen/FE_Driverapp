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
import stylesFunction from './styles';

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
    plateNumber: userData?.plate_number ? userData?.plate_number : '',
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
    plateNumber,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});

  const updateState = data => setState(state => ({...state, ...data}));

  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  const styles = stylesFunction({defaultLanguagae});

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
      <View style={styles.rootContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceHorizontal={false}>
          <View style={styles.imageViewStyle}>
            {userData && userData?.image_url && (
              <Image
                source={{uri: userData?.image_url}}
                style={styles.imageStyle}
              />
            )}
          </View>
          <View style={styles.personalInfoContainer}>
            <Text style={styles.label}>{strings.PERSONAL}</Text>
            <View style={styles.personalInfoContainer}>
              <TextInputWithlabel
                labelStyle={styles.textInputStyle}
                label={strings.FULLNAME}
                value={fullName}
                textInputStyle={styles.textInputStyle}
              />
              <TextInputWithlabel
                labelStyle={styles.textInputStyle}
                label={strings.PHONENUMBER}
                value={phoneNumber}
                textInputStyle={styles.textInputStyle}
              />
            </View>

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
            <View style={styles.carInfoStyle}>
              <TextInputWithlabel
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
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </WrapperContainer>
  );
}
