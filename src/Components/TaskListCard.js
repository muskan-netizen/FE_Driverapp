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
const TaskListCard = ({
  data = {},
  allTasks = [],
  index = null,
  _onPressTask = () => {},
  showCurrency = false,
}) => {
  let dueDate = new Date(data?.order?.order_time).toUTCString();
  //console.log(dueDate, 'dueDate');

  var date = new Date(dueDate + ' UTC');
  //console.log(date, 'date');

  var getMilliseconds = new Date(data?.order?.order_time).getTime();
  //console.log(getMilliseconds, 'getMilliseconds');

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

  const getRandomColor = () => {
    var colorData = colorArray;
    return colorData[allTasks.indexOf(data) % colorData.length];
  };

  return (
    <TouchableOpacity style={styles.shadowStyle} onPress={_onPressTask}>
      <View style={[styles.borderLine, {backgroundColor: getRandomColor()}]} />
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          marginVertical: moderateScale(10),
          marginLeft: moderateScale(10),
        }}>
        <Text style={styles.address} numberOfLines={2}>
          {data?.location?.address}
        </Text>
        <View style={{flexDirection: 'row', marginTop: moderateScale(10)}}>
          <Image source={imagePath.time} />
          <Text style={styles.dateTimeStyle}>
            {moment(date).format('MM/DD/YYYY HH:mm')}
          </Text>
        </View>

        {!!showCurrency && (
          <View style={{flexDirection: 'row', marginTop: moderateScale(5)}}>
            <Image source={imagePath.dollor} />
            <Text style={styles.dateTimeStyle}>
              {data?.order?.amount
                ? Number(data?.order?.amount).toFixed(2)
                : Number(0).toFixed(2)}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 0.4,
          alignItems: 'flex-end',
          justifyContent: 'center',
          margin: moderateScale(10),
        }}>
        <View
          style={{
            backgroundColor: colors.redB,
            height: moderateScale(10),
            width: moderateScale(10),
            borderRadius: moderateScale(10 / 2),
          }}
        />
        <View
          style={[
            styles.statusView,
            {
              backgroundColor: getBackGroudColor(data?.tasktype?.name),
            },
          ]}>
          <Text
            style={{
              color: getTextColor(data?.tasktype?.name),
              textAlign: 'center',
              fontFamily: fontFamily.medium,
              fontSize: textScale(10),
            }}>
            {data?.tasktype?.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
    flexDirection: 'row',
    borderWidth: 1,
    marginHorizontal: moderateScale(10),
    borderColor: colors.grey2,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: 5,
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
});

export default TaskListCard;
