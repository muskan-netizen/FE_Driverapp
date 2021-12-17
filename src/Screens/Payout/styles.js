import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, textScale, width} from '../../styles/responsiveSize';

export default () => {
  const styles = StyleSheet.create({
    payoutBlockView: {
      marginHorizontal: moderateScale(10),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: moderateScale(10),
    },
    payoutBlockSubView: {
      width: (width - moderateScale(55)) / 3,
      backgroundColor: colors.ligthBlue,
      height: moderateScale(100),
      borderRadius: moderateScale(10),
    },
    payoutNumbersTxt: {
      fontFamily: fontFamily.bold,
      fontSize: textScale(15),
      marginTop: moderateScale(20),
      marginHorizontal: moderateScale(10),
    },
    payoutTitlesTxt: {
      fontFamily: fontFamily.regular,
      marginHorizontal: moderateScale(10),
      marginTop: moderateScale(5),
    },
  });
  return styles;
};
