import {StyleSheet} from 'react-native';
import generateBoxShadowStyle from '../../../Components/generateBoxShadowStyle';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import {getColorCodeWithOpactiyNumber} from '../../../utils/helperFunctions';

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
    // backgroundColor: colors.lightGreyBg,
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
  shadowStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    marginHorizontal: moderateScale(2),
    borderColor: colors.grey2,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: 5,
    // height: moderateScaleVertical(100),
    ...generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717'),
  },
  employeetypeHeadingtext: {
    fontSize: textScale(12),
    fontFamily: fontFamily.medium,
    color: colors.lightGreyBg2,
    marginVertical: moderateScaleVertical(10),
  },
  label2: {
    marginBottom: moderateScaleVertical(10),

    fontSize: textScale(12),
    fontFamily: fontFamily.medium,
    color: colors.lightGreyBg2,
  },
  label3: {
    marginBottom: moderateScaleVertical(10),

    fontSize: textScale(12),
    fontFamily: fontFamily.medium,
    color: colors.lightGreyBg2,
  },
  imageUpload: {
    height: 100,
    width: 100,
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: colors.blue,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScaleVertical(10),
  },
  imageStyle2: {
    height: 100,
    width: 100,
    borderRadius: moderateScale(4),
  },
  uploadStyle: {
    color: colors.blue,
    fontFamily: fontFamily.medium,
  },
});
