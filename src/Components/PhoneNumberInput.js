import {callingCodes} from 'country-data';
import React, {useState} from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import CountryPicker, {Flag} from 'react-native-country-picker-modal';
import {useSelector} from 'react-redux';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';

export default function PhoneNumberInput({
  cca2 = '',
  callingCode = '',
  onChangePhone,
  onCountryChange,
  phoneNumber,
  placeholder,
  containerStyle,
  color,
  keyboardType = 'numeric',
  returnKeyType = 'done',
  borderColor = colors.black,
  label = null,
  labelStyle = {},
  borderLeftColor=null
}) {
  const [state, setState] = useState({
    countryPickerModalVisible: false,
  });

  const {appStyle} = useSelector(state => state?.initBoot);

  const fontFamily = appStyle?.fontSizeData;

  const _onCountryChange = data => {
    setState({countryPickerModalVisible: false});
    onCountryChange(data);
  };
  const _openCountryPicker = () => {
    setState({countryPickerModalVisible: true});
  };
  const _onCountryPickerModalClose = () => {
    setState({countryPickerModalVisible: false});
  };
  const {countryPickerModalVisible} = state;
  return (
    <>
      {label && (
        <View>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderRadius: 13,
          borderColor: borderColor ? borderColor : colors.white,
          height: moderateScale(49),
          ...containerStyle,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: moderateScale(88),
          }}
          onPress={_openCountryPicker}>
          <View style={{marginRight: moderateScale(-10)}}>
            <Flag countryCode={cca2} />
          </View>
          <Text
            style={{
              fontFamily: fontFamily.medium,
              color: color ? color : colors.white,
              marginStart: 2,
              fontSize: textScale(14),
            }}>
            +{callingCode}
          </Text>

          <Image source={imagePath.dropdownTriangle} />
        </TouchableOpacity>
        <TextInput
          selectionColor={colors.black}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={phoneNumber}
          placeholderTextColor={color ? color : colors.textGreyOpcaity7}
          onChangeText={onChangePhone}
          style={[styles.textInputStyle,{  borderLeftColor:borderLeftColor?borderLeftColor: colors?.themeColor,}]}
          returnKeyType={returnKeyType}
        />
        {countryPickerModalVisible && (
          <CountryPicker
            withCallingCode={callingCode}
            cca2={cca2}
            visible={countryPickerModalVisible}
            withFlagButton={false}
            withFilter
            onClose={_onCountryPickerModalClose}
            onSelect={_onCountryChange}
            closeButtonImage={imagePath.closeButton}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    // flex: 1,
    width: width / 1.57,
    borderLeftWidth: 1,
    fontFamily: fontFamily.medium,
    color: colors.black,
    fontSize: textScale(14),
  
    // opacity: 0.7,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 8,
    paddingHorizontal: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  label: {
    marginBottom: moderateScaleVertical(10),
    fontSize: textScale(12),
    fontFamily: fontFamily.medium,
    color: colors.lightGreyBg2,
  },
});
