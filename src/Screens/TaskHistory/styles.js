import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, textScale} from '../../styles/responsiveSize';

export default StyleSheet.create({
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
});
