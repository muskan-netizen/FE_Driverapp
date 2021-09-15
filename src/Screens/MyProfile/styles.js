import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, textScale} from '../../styles/responsiveSize';

export default StyleSheet.create({
  imageView: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.textGreyJ,
    position: 'absolute',
    top: -50,
  },
  imageViewStyle: {
    backgroundColor: colors.lightGreyBg,
    height: moderateScale(121),
    width: moderateScale(121),
    borderRadius: moderateScale(121 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageStyle: {
    height: moderateScale(121),
    width: moderateScale(121),
    borderRadius: moderateScale(121 / 2),
  },
  label: {
    fontSize: textScale(14),
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    // textAlign: 'center',
  },
});
