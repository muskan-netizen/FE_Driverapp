import React, {Fragment, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import navigationStrings from '../navigation/navigationStrings';
import actions from '../redux/actions';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {height, moderateScale, textScale} from '../styles/responsiveSize';
import {showError, showSuccess} from '../utils/helperFunctions';
import Loader from './Loader';

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
        label: strings.SETTINGS,
        image: imagePath.settingsIcon,
        key: navigationStrings.SETTINGS,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 3,
        label: strings.LOGOUT,
        image: imagePath.logout,
        // key: navigationStrings.PROFILESTACK,
        // subRoute:navigationStrings.MYPROFILE
      },
    ],
    logoutAlert: false,
    selectedDrawerItem: null,
    isLoading: false,
  });
  const {routes, selectedDrawerItem, logoutAlert, isLoading} = states;
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  console.log(clientInfo, 'clientInfo>clientInfo');

   //Naviagtion to specific screen
   const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  //Update states
  const updateState = data => setState(state => ({...state, ...data}));

  const onLogoutPress = () => {
    navigation.toggleDrawer();
    Alert.alert('', strings.AREYOUSURE, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('progress');
          logout();
          // navigation.toggleDrawer();
        },
      },
    ]);
  };

  const logout = () => {
    updateState({isLoading: true});
    actions
      .logout({}, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'login data');
        updateState({isLoading: false});
        showSuccess(res?.message ? res?.message : 'Logout successfully.');
        moveToNewScreen(navigationStrings.LOGIN)();
      })
      .catch(errorMethod);
  };

  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false});
    showError(error?.message || error?.error);
  };

  return (
    <>
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
              onLogoutPress();
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
      <Loader isLoading={isLoading} withModal={true} />
    </>
  );
}
