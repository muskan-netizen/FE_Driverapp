import React, {Fragment, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import navigationStrings from '../navigation/navigationStrings';
import colors from '../styles/colors';
import {height, moderateScale, textScale} from '../styles/responsiveSize';

export default function CustomDrawerContent({
  state,
  descriptors,
  navigation,
  progress,
  ...props
}) {
  
  const [states, setState] = useState({

    routes: [
      {
        id: 0,
        label: strings.TASKHISTORY,
        image: imagePath.taskHistory,
        key: navigationStrings.DASHBOARD,
      },
      {
        id: 1,
        label: strings.SETTING,
        image: imagePath.settingsIcon,
        key: navigationStrings.MYPROFILE,
      },
    ],
    selectedDrawerItem: null,
  });
  const {routes, selectedDrawerItem} = states;
  const currentTheme = useSelector(state => state.initBoot);
  const insets = useSafeAreaInsets();
  const {themeColors, themeLayouts, appStyle} = currentTheme;
  const fontFamily = appStyle?.fontSizeData;
  // const translateX = Animated.interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [-100, 0],
  // });

  return (
    <View
      style={{
        height: height,
        marginTop: moderateScale(100),
      }}
      colors={[colors.white, colors.white]}>
      {routes.map((route, index) => {
        // const {options} = descriptors[route.key];
        const isFocused = selectedDrawerItem?.index === index;
        const label = route.label;
        const onPress = () => {
          // const event = navigation.emit({
          //   type: 'drawerItemPress',
          //   target: route.key,
          //   canPreventDefault: true,
          // });

          // if (!isFocused && !event.defaultPrevented) {
          //   navigation.navigate(route.name);
          // }
          navigation.navigate(route.key);
        };

        return (
          <Fragment key={route.name}>
            <TouchableOpacity
            key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              testID={JSON.stringify(route.id)}
              onPress={onPress}
              // onLongPress={onLongPress}
              style={{
                margin: moderateScale(10),
                // alignItems: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* {options.drawerIcon({focused: isFocused})} */}
              <Image source={route.image} />
              <Text
                style={{
                  paddingLeft: moderateScale(20),
                  fontSize: textScale(14),
                  fontFamily: fontFamily?.bold,
                  ...props.labelStyle,
                  color: isFocused ? colors.black : 'rgba(255,255,255,.5)',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          </Fragment>
        );
      })}
    </View>
  );
}
