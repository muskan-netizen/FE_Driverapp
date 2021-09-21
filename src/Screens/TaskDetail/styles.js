import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, textScale, width} from '../../styles/responsiveSize';

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
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: moderateScale(width / 2),
  },
  statusView: {
    minWidth: moderateScale(50),
    maxWidth: moderateScale(75),
    padding: moderateScale(3),
    marginTop: moderateScale(10),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
  },
  address: {
    fontSize: textScale(14),
    fontFamily: fontFamily.medium,
    color: colors.blackShade2,
    paddingBottom: moderateScale(5),
  },
  shortName: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    color: colors.iconGrey,
    paddingBottom: moderateScale(5),
  },
  taskDetailView: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    color: colors.iconGrey,
    paddingBottom: moderateScale(5),
    backgroundColor: colors.backGround,
    padding: moderateScale(10),
    justifyContent: 'center',
  },
  taskText: {
    fontSize: textScale(12),
    fontFamily: fontFamily.medium,
    color: colors.black,
    opacity: 0.5,

    // paddingBottom: moderateScale(5),
  },
  taskLable: {
    fontSize: textScale(12),
    fontFamily: fontFamily.medium,
    color: colors.iconGrey,

    // paddingBottom: moderateScale(5),
  },
  taskValue: {
    fontSize: textScale(14),
    fontFamily: fontFamily.medium,
    color: colors.blackShade2,

    // paddingBottom: moderateScale(5),
  },
  labelView: {
    flexDirection: 'row',
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginTop: -20,
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'flex-end',
    // marginBottom: -15,
  },
  button: {
    padding: 15,
    borderWidth: 0,
    borderColor: '#111',
    backgroundColor: colors.themeColor,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#111',
    textAlign: 'center',
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: textScale(14),
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
