import React, {Fragment, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import navigationStrings from '../navigation/navigationStrings';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
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
        key: navigationStrings.TASKSTACK,
        subRoute: navigationStrings.TASKHISTORY,
      },
      {
        id: 1,
        label: strings.PROFILE,
        image: imagePath.settingsIcon,
        key: navigationStrings.PROFILESTACK,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 2,
        label: strings.LOGOUT,
        image: imagePath.logout,
        // key: navigationStrings.PROFILESTACK,
        // subRoute:navigationStrings.MYPROFILE
      },
    ],
    logoutAlert: false,
    selectedDrawerItem: null,
  });
  const {routes, selectedDrawerItem, logoutAlert} = states;

  useEffect(() => {
    if (logoutAlert) {
      setTimeout(() => {}, 1000);
    }
  }, [logoutAlert]);

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
          if (route?.key) {
            if (route?.subRoute) {
              navigation.navigate(route.key, {
                screen: route?.subRoute,
              });
            } else {
              navigation.navigate(route.key);
            }
          } else {
            navigation.toggleDrawer();
          }
          // navigation.navigate(route.key, { screen: navigationStrings.subRoute });
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
                  fontFamily: fontFamily?.medium,
                  ...props.labelStyle,
                  color: colors.black,
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
