import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, textScale} from '../../styles/responsiveSize';

export default ({defaultLanguagae}) => {
  const styles = StyleSheet.create({
    cashCollected: {
      fontSize: textScale(12),
      fontFamily: fontFamily.semiBold,
      color: colors.black,
    },
    viewStyle: {
      width: 50,
      alignItems: 'center',
      backgroundColor: colors.themeColor,
      padding: 5,
      borderRadius: moderateScale(4),
    },
    clear: {
      fontSize: textScale(12),
      fontFamily: fontFamily.semiBold,
      color: colors.white,
      fontFamily: fontFamily.medium,
    },
    selectedDate: {
      fontSize: textScale(12),
      fontFamily: fontFamily.regular,
      color: colors.lightGreyBg2,
    },
    cashCollectionContainer: {
      flexDirection: defaultLanguagae?.value === 'ar' ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: colors.white,
    },
    cashTextView: {
      flexDirection: defaultLanguagae?.value === 'ar' ? 'row-reverse' : 'row',
      flex: 0.5,
      alignItems: 'center',
    },
    clearViewStyle: {
      flex: 0.5,
      flexDirection: defaultLanguagae?.value === 'ar' ? 'row-reverse' : 'row',
    },
    dateSelectView: {
      justifyContent: 'center',
      marginHorizontal: moderateScale(10),
    },
  });
  return styles;
};
