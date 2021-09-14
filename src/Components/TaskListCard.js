import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import colors from '../styles/colors';
import {StyleSheet} from 'react-native';
import fontFamily from '../styles/fontFamily';
import {textScale, width} from '../styles/responsiveSize';
import {TouchableOpacity} from 'react-native';
const TaskListCard = ({data = {}}) => {
    console.log(data,"data>data>data");
  return <TouchableOpacity style={{flexDirection: 'row'}}>
     <View></View>
     <View>
         <Text>{}</Text>
         <Text>{}</Text>
     </View>
     <View>
         <View/>
         <View>
             
         </View>
     </View>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fontFamily.semiBold,
  },
  textInputStyle: {width: width / 1.8},
});

export default TaskListCard;
