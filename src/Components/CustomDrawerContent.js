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
import {
  height,
  moderateScale,
  textScale,
  width,
} from '../styles/responsiveSize';
import {showError, showSuccess} from '../utils/helperFunctions';
import Loader from './Loader';
import {useFocusEffect} from '@react-navigation/native';
import {cloneDeep} from 'lodash';
import ScaledImage from 'react-native-scalable-image';
import DeviceInfo from 'react-native-device-info';
import ZendeskChat from 'react-native-zendesk-chat';

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
        image: imagePath.profileImage,
        key: navigationStrings.PROFILESTACK,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 2,
        label: strings.SETTING,
        image: imagePath.settingsIcon,
        key: navigationStrings.SETTINGS,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 3,
        label: strings.WALLET,
        image: imagePath.wallet,
        key: navigationStrings.TASKSTACK,
        subRoute: navigationStrings.WALLET,
        // key: navigationStrings.WALLET,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 4,
        label: strings.CONTACT,
        image: imagePath.contact2,
        key: navigationStrings.TASKSTACK,
        subRoute: navigationStrings.CONTACTUS,
        //

        key: navigationStrings.WALLET,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 6,
        label: strings.SUPPORT,
        image: imagePath.support2,
        // key: navigationStrings.PROFILESTACK,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 5,
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
  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  useEffect(() => {
    ZendeskChat.init('oPDUTCv5ROQI8UbvxmUTuTmaHpxxDJVP');

    updateState({
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
          image: imagePath.profileImage,
          key: navigationStrings.PROFILESTACK,
          // subRoute:navigationStrings.MYPROFILE
        },
        {
          id: 2,
          label: strings.SETTING,
          image: imagePath.settingsIcon,
          key: navigationStrings.SETTINGS,
          // subRoute:navigationStrings.MYPROFILE
        },
        // {
        //   id: 3,
        //   label: strings.WALLET,
        //   image: imagePath.wallet,
        //   key: navigationStrings.TASKSTACK,
        //   subRoute: navigationStrings.WALLET,
        //   // key: navigationStrings.WALLET,
        //   // subRoute:navigationStrings.MYPROFILE
        // },
        {
          id: 4,
          label: strings.CONTACT,
          image: imagePath.contact2,
          key: navigationStrings.TASKSTACK,
          subRoute: navigationStrings.CONTACTUS,
          // key: navigationStrings.WALLET,
          // subRoute:navigationStrings.MYPROFILE
        },
        // {
        //   id: 6,
        //   label: strings.SUPPORT,
        //   support: true,
        //   image: imagePath.support2,
        //   // key: navigationStrings.PROFILESTACK,
        //   // subRoute:navigationStrings.MYPROFILE
        // },
        {
          id: 5,
          label: strings.LOGOUT,
          image: imagePath.logout,
          // key: navigationStrings.PROFILESTACK,
          // subRoute:navigationStrings.MYPROFILE
        },
      ],
    });
  }, [defaultLanguagae]);

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
        text: strings.CANCEL,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: strings.OK,
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
          marginTop: moderateScale(10),
        }}
        colors={[colors.white, colors.white]}>
        {/* client logo */}
        <View
          style={{
            // height: height / 3,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: moderateScale(30),
            // backgroundColor:'red'
          }}>
          <ScaledImage
            width={width / 2}
            source={
              clientInfo && clientInfo?.logo
                ? {uri: clientInfo?.logo}
                : imagePath.logo
            }
          />
        </View>

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
            } else if (route?.support) {
              ZendeskChat.startChat({
                name: 'Dinesh',
                email: 'dkdenni07@gmail.com',
                phone: '9832421234',
              });
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
                <View style={{flex: 0.15}}>
                  <Image source={route.image} />
                </View>

                <View style={{flex: 0.85}}>
                  <Text
                    style={{
                      // paddingLeft: moderateScale(5),
                      paddingRight: 0,
                      fontSize: textScale(15),
                      fontFamily: fontFamily?.regular,
                      ...props.labelStyle,
                      color: colors.black,
                    }}>
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            </Fragment>
          );
        })}
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            top: height - 150,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fontFamily.regular,
              color: colors.lightGreyBg2,
              fontSize: textScale(12),
            }}>
            {`Version ${DeviceInfo.getVersion()} `}
            <Text>{`(${DeviceInfo.getBuildNumber()})`}</Text>
          </Text>
        </View>
      </View>
      <Loader isLoading={isLoading} withModal={true} />
    </>
  );
}
