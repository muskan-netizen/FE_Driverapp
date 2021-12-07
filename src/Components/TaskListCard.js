import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import colors from '../styles/colors';
import {StyleSheet} from 'react-native';
import fontFamily from '../styles/fontFamily';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import imagePath from '../constants/imagePath';
import moment from 'moment';
import generateBoxShadowStyle from './generateBoxShadowStyle';
import {getColorCodeWithOpactiyNumber} from '../utils/helperFunctions';
import {colorArray} from '../utils/constants/ConstantValues';
import {format} from 'date-fns';
import {useSelector} from 'react-redux';
const TaskListCard = ({
  data = {},
  allTasks = [],
  index = null,
  _onPressTask = () => {},
  showCurrency = false,
  previousData = null,
  _onPressTaskDetails = () => {},
}) => {
  //Get Date
  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );
  const styles = stylesFunc({defaultLanguagae});

  const getDate = date => {
    const local = moment.utc(date).local().format('DD MMM YYYY hh:mm:a');

    return local;
  };

  console.log(data, 'datadata');

  //get BackGroundColor
  const getBackGroudColor = name => {
    switch (name) {
      case 'Pickup':
        return getColorCodeWithOpactiyNumber(colors.circularBlue.substr(1), 50);
        break;
      case 'Drop':
        return getColorCodeWithOpactiyNumber(
          colors.circularOrnage.substr(1),
          50,
        );
        break;
      default:
        return getColorCodeWithOpactiyNumber(colors.circularRed.substr(1), 50);
        break;
    }
  };

  //get Text color
  const getTextColor = name => {
    switch (name) {
      case 'Pickup':
        return colors.circularBlue;
        break;
      case 'Drop':
        return colors.circularOrnage;
        break;
      default:
        return colors.circularRed;
        break;
    }
  };

  /****GET DYNAMIC VALUES */
  const getDynamicUpdateOnValues = () => {
    var colorData = colorArray;

    if (data?.order_id == previousData?.order_id) {
      data['backgroundColor'] = previousData?.backgroundColor;
      data['blur'] = 0.5;
      data['click'] = true;
      allTasks[allTasks.indexOf(data)] = data;
      return {
        backgroundColor: data?.backgroundColor,
        blur: data?.blur,
        click: data?.click,
      };
    } else {
      data['backgroundColor'] =
        colorData[allTasks.indexOf(data) % colorData.length];
      data['blur'] = 1;
      data['click'] = false;
      allTasks[allTasks.indexOf(data)] = data;
      return {
        backgroundColor: data?.backgroundColor,
        blur: data?.blur,
        click: data?.click,
      };
      // return colorData[allTasks.indexOf(data) % colorData.length];
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={getDynamicUpdateOnValues().click}
      onPress={_onPressTask}>
      <View
        opacity={getDynamicUpdateOnValues().blur}
        style={[styles.shadowStyle]}>
        <View
          style={[
            styles.borderLine,
            {backgroundColor: getDynamicUpdateOnValues().backgroundColor},
          ]}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.address} numberOfLines={2}>
            {data?.location?.address}
          </Text>

          <View style={styles.dateContainer}>
            <Image source={imagePath.time} />
            <Text style={styles.dateTimeStyle}>
              {getDate(data?.order?.order_time)}
            </Text>
          </View>

          {!!showCurrency && (
            <View style={styles.currencyContainer}>
              {/* <Image source={imagePath.dollor} /> */}
              <Text style={styles.dateTimeStyle}>
                {data?.order?.amount
                  ? Number(data?.order?.amount).toFixed(2)
                  : Number(0).toFixed(2)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.dotViewStyle}>
          {data?.order?.call_back_url && (
            <TouchableOpacity onPress={_onPressTaskDetails}>
              <Image source={imagePath.expand} />
            </TouchableOpacity>
          )}

          <View style={styles.dotBaseViewStyle} />
          <View
            style={[
              styles.statusView,
              {
                backgroundColor: getBackGroudColor(data?.tasktype?.name),
              },
            ]}>
            <Text
              style={[
                styles.taskTypeName,
                {color: getTextColor(data?.tasktype?.name)},
              ]}>
              {data?.tasktype?.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export function stylesFunc({defaultLanguagae}) {
  const styles = StyleSheet.create({
    textStyle: {
      fontFamily: fontFamily.semiBold,
    },
    textInputStyle: {width: width / 1.8},
    address: {
      fontFamily: fontFamily.semiBold,
      fontSize: textScale(14),
    },
    shadowStyle: {
      flexDirection: defaultLanguagae?.value === 'ar' ? 'row-reverse' : 'row',
      borderWidth: 1,
      marginHorizontal: moderateScale(10),
      borderColor: colors.grey2,
      borderRadius: 8,
      marginVertical: 5,
      backgroundColor: colors.white,
      height: moderateScaleVertical(100),
      ...generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717'),
    },
    borderLine: {
      width: moderateScale(5),

      borderBottomLeftRadius: 8,
      borderTopLeftRadius: 8,
    },
    dateTimeStyle: {
      fontFamily: fontFamily.semiBold,
      fontSize: textScale(10),
      opacity: 0.5,
      paddingLeft: 5,
    },
    statusView: {
      minWidth: moderateScale(60),
      maxWidth: moderateScale(100),
      padding: moderateScale(3),
      marginTop: moderateScale(10),
      borderRadius: moderateScale(10),
      justifyContent: 'center',
    },
    mainContainer: {
      flex: 0.6,
      justifyContent: 'center',
      marginVertical: moderateScale(10),
      marginLeft: defaultLanguagae?.value === 'ar' ? 0 : moderateScale(10),
      marginRight: defaultLanguagae?.value === 'ar' ? moderateScale(10) : 0,
    },
    dateContainer: {
      flexDirection: defaultLanguagae?.value === 'ar' ? 'row-reverse' : 'row',
      marginTop: moderateScale(10),
    },
    currencyContainer: {
      flexDirection: defaultLanguagae?.value === 'ar' ? 'row-reverse' : 'row',
      marginTop: moderateScale(5),
    },
    dotViewStyle: {
      flex: 0.4,
      alignItems: defaultLanguagae?.value === 'ar' ? 'flex-start' : 'flex-end',
      justifyContent: 'center',
      margin: moderateScale(10),
    },
    dotBaseViewStyle: {
      backgroundColor: colors.redB,
      height: moderateScale(10),
      width: moderateScale(10),
      borderRadius: moderateScale(10 / 2),
      marginTop: moderateScaleVertical(10),
    },
    taskTypeName: {
      textAlign: 'center',
      fontFamily: fontFamily.medium,
      fontSize: textScale(10),
    },
  });
  return styles;
}

export default TaskListCard;
