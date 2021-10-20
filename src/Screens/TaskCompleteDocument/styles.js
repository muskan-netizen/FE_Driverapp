import {StyleSheet, I18nManager} from 'react-native';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';

export default ({defaultLanguagae}) => {
  const styles = StyleSheet.create({
    cashCollected: {
      fontSize: textScale(12),
      fontFamily: fontFamily.semiBold,
      color: colors.black,
    },
    cashCollected: {
      fontSize: textScale(12),
      fontFamily: fontFamily.semiBold,
      color: colors.black,
    },
    textStyle: {
      color: colors.black2Color,
      fontSize: textScale(14),
      lineHeight: textScale(28),
      textAlign: 'center',
      fontFamily: fontFamily.semiBold,
    },
    reason: {
      fontSize: textScale(12),
      fontFamily: fontFamily.medium,
      color: colors.black,
      marginHorizontal: moderateScale(20),
    },
    attachment: {
      fontSize: textScale(12),
      fontFamily: fontFamily.bold,
      color: colors.lightGreyBg2,
      marginHorizontal: moderateScale(10),
      marginVertical: moderateScale(10),
    },
    rowViewTaskCancel: {
      marginHorizontal: moderateScale(20),
      borderBottomColor: colors.iconGrey,
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingVertical: moderateScale(15),
      flexDirection: defaultLanguagae?.value === 'ar' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
    },
    textInputStyle: {
      opacity: 0.7,
      color: colors.black,
      fontFamily: fontFamily.semiBold,
      fontSize: textScale(14),
      paddingHorizontal: 8,
      paddingVertical: 0,
      textAlign: defaultLanguagae?.value === 'ar' ? 'right' : 'left',
      marginHorizontal: moderateScale(20),

      backgroundColor: colors.backGround,
      height: moderateScaleVertical(width / 10),
      borderRadius: moderateScale(4),
      marginVertical: moderateScale(10),
      borderBottomColor: colors.themeColor,
      borderBottomWidth: 1,
    },
    titleStyle: {
      fontSize: textScale(10),
      fontFamily: fontFamily.medium,
      color: colors.black,
      textAlign: 'center',
      marginTop: moderateScale(5),
    },
    headerCustomleftView: {
      flexDirection: defaultLanguagae?.value === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    arrowstyle: {
      transform: [{scaleX: defaultLanguagae?.value == 'ar' ? -1 : 1}],
    },
    otpContainer: {
      marginHorizontal: moderateScale(10),
      marginTop: moderateScale(10),
      alignItems: defaultLanguagae?.value === 'ar' ? 'flex-end' : 'flex-start',
    },
  });

  return styles;
};
