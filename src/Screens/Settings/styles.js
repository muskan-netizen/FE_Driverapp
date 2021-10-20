import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';

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
  languageContainer: {
    marginHorizontal: moderateScale(20),
    backgroundColor: colors.white,
    paddingVertical: moderateScaleVertical(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.8},
    shadowOpacity: 0.6,
    shadowRadius: 1,
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageTitleTextStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.semiBold,
  },
  selectedLanguageViewContainer: {flexDirection: 'row'},
  selectedLanguageText: {
    color: colors.themeColor,
    fontFamily: fontFamily.semiBold,
  },
  spaceViewStyle: {
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
  },
});
