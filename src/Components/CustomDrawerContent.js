import React, {Fragment, useEffect, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import {Text, TouchableOpacity, View, Image} from 'react-native';
// import Animated from 'react-native-reanimated';
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
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import {showError, showSuccess} from '../utils/helperFunctions';
import Loader from './Loader';
import {useFocusEffect} from '@react-navigation/native';
import {cloneDeep} from 'lodash';
import ScaledImage from 'react-native-scalable-image';
import DeviceInfo from 'react-native-device-info';
import ZendeskChat from '../library/react-native-zendesk-chat';
import {appIds} from '../utils/constants/DynamicAppKeys';
import {Subscriptions} from '../Screens';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
import {useDarkMode} from 'react-native-dark-mode';

export default function CustomDrawerContent({
  state,
  descriptors,
  navigation,
  progress,
  ...props
}) {
  const {zendeskKeys, clientInfo, defaultLanguage} = useSelector(
    state => state?.initBoot,
  );
  const {userData} = useSelector(state => state?.auth);

  const darkthemeusingDevice = useDarkMode();
  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;

  const [states, setState] = useState({
    routes: [
      {
        id: 1,
        label: strings.TASKHISTORY,
        image: imagePath.taskHistory,
        key: navigationStrings.TASKSTACK,
        subRoute: navigationStrings.TASKHISTORY,
      },
      {
        id: 2,
        label: strings.PROFILE,
        image: imagePath.profileImage,
        key: navigationStrings.PROFILESTACK,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 3,
        label: strings.SETTING,
        image: imagePath.settingsIcon,
        key: navigationStrings.SETTINGS,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 4,
        label: strings.WALLET,
        image: imagePath.wallet,
        key: navigationStrings.TASKSTACK,
        subRoute: navigationStrings.WALLETSTACK,
        // key: navigationStrings.WALLET,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 5,
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
      appIds.transportSystem === DeviceInfo.getBundleId()
        ? {
            id: 7,
            label: strings.DAMAGEREPORT,
            image: imagePath.damagereport,
            key: navigationStrings.DAMAGEREPORT,
            // subRoute:navigationStrings.MYPROFILE
          }
        : {},
      appIds.transportSystem === DeviceInfo.getBundleId()
        ? {
            id: 7,
            label: strings.REIMBURSEMENT,
            image: imagePath.reimbursement,
            key: navigationStrings.REIMBURSEMENT,
            // subRoute:navigationStrings.MYPROFILE
          }
        : {},
      {
        id: 9,
        label: strings.CHAT_ROOM,
        image: imagePath.settingsIcon,
        key: navigationStrings.CHAT_ROOM,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 10,
        label: strings.LOGOUT,
        image: imagePath.logout,
        // key: navigationStrings.PROFILESTACK,
        // subRoute:navigationStrings.MYPROFILE
      },
      {
        id: 9,
        label: strings.SUBSCRIPTIONS,
        image: imagePath.icSubscription,
        key: navigationStrings.SUBSCRIPTION_STACK,
        subRoute: navigationStrings.SUBSCRIPTION_STACK,
      },
    ],
    logoutAlert: false,
    selectedDrawerItem: null,
    isLoading: false,
  });
  const {
    routes,
    selectedDrawerItem,
    logoutAlert,
    isLoading,
    themeToggle,
    themeColor,
  } = states;

  // ZendeskChat.init(
  //   'kI9WjmYer9iy7gCYF2sne4gXUure2AK4',
  //   'bdea936e4bdb8130bb3f74cf9be7001aeaf503fe61c1543c',
  // );
  useEffect(() => {
    ZendeskChat.init(
      `${zendeskKeys?.keys?.account_key}`,
      `${zendeskKeys?.keys?.application_id}`,
    );
    updateState({
      routes: [
        {
          id: 1,
          label: strings.TASKHISTORY,
          image: imagePath.taskHistory,
          key: navigationStrings.TASKSTACK,
          subRoute: navigationStrings.TASKHISTORY,
        },
        {
          id: 2,
          label: strings.PROFILE,
          image: imagePath.profileImage,
          key: navigationStrings.PROFILESTACK,
          // subRoute:navigationStrings.MYPROFILE
        },
        {
          id: 3,
          label: strings.SETTING,
          image: imagePath.settingsIcon,
          key: navigationStrings.SETTINGS,
          // subRoute:navigationStrings.MYPROFILE
        },
        {
          id: 4,
          label: strings.WALLET,
          image: imagePath.wallet,
          key: navigationStrings.WALLETSTACK,
          subRoute: navigationStrings.WALLETSTACK,
          // key: navigationStrings.WALLET,
          // subRoute:navigationStrings.MYPROFILE
        },
        {
          id: 5,
          label: strings.PAYOUT,
          image: imagePath.icPayout,
          key: navigationStrings.PAYOUT_STACK,
          subRoute: navigationStrings.PAYOUT_STACK,
          // key: navigationStrings.WALLET,
          // subRoute:navigationStrings.MYPROFILE
        },
        {
          id: 5,
          label: strings.CONTACT,
          image: imagePath.contact2,
          key: navigationStrings.TASKSTACK,
          subRoute: navigationStrings.CONTACTUS,
          // key: navigationStrings.WALLET,
          // subRoute:navigationStrings.MYPROFILE
        },
        {
          id: 6,
          label: strings.SUPPORT,
          support: true,
          image: imagePath.support2,
          // key: navigationStrings.PROFILESTACK,
          // subRoute:navigationStrings.MYPROFILE
        },

        {
          id: 9,
          label: strings.SUBSCRIPTIONS,
          support: true,
          image: imagePath.icSubscription,
          key: navigationStrings.SUBSCRIPTION_STACK,
          subRoute: navigationStrings.SUBSCRIPTION_STACK,
        },
        appIds.transportSystem === DeviceInfo.getBundleId()
          ? {
              id: 7,
              label: strings.DAMAGEREPORT,
              image: imagePath.damagereport,
              key: navigationStrings.DAMAGEREPORT,
              // subRoute:navigationStrings.MYPROFILE
            }
          : {},
        appIds.transportSystem === DeviceInfo.getBundleId()
          ? {
              id: 7,
              label: strings.REIMBURSEMENT,
              image: imagePath.reimbursement,
              key: navigationStrings.REIMBURSEMENT,
              // subRoute:navigationStrings.MYPROFILE
            }
          : {},

        !!clientInfo?.socket_url
          ? {
              id: 9,
              label: strings.CHAT_ROOM,
              image: imagePath.settingsIcon,
              key: navigationStrings.CHAT_ROOM,
              // subRoute:navigationStrings.MYPROFILE
            }
          : {},
        {
          id: 10,
          label: strings.LOGOUT,
          image: imagePath.logout,
          // key: navigationStrings.PROFILESTACK,
          // subRoute:navigationStrings.MYPROFILE
        },
      ],
    });
  }, [
    defaultLanguage,
    zendeskKeys?.keys?.account_key,
    zendeskKeys?.keys?.application_id,
  ]);

  //

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
          BackgroundGeolocation.removeAllListeners();
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

  const onStartSupportChat = () => {
    ZendeskChat.setVisitorInfo({
      name: userData?.name,
      phone: userData?.phone_number ? userData?.phone_number : '',
    });
    ZendeskChat.startChat({
      name: userData?.name,
      phone: userData?.phone_number ? userData?.phone_number : '',
      withChat: true,
      color: '#000',
    });
  };

  return (
    <>
    <ScrollView
    showsVerticalScrollIndicator={false}>

    
      <View
        style={{
          // height: height,
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
              clientInfo && (clientInfo?.logo || clientInfo?.dark_logo)
                ? {uri: isDarkMode ? clientInfo?.dark_logo : clientInfo?.logo}
                : imagePath.logo
            }
          />
        </View>

        {routes.map((route, index) => {
          // const {options} = descriptors[route.key];
          const isFocused = selectedDrawerItem?.index === index;
          const label = route?.label;
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
              onStartSupportChat();
            } else {
              onLogoutPress();
            }
            // navigation.navigate(route.key, { screen: navigationStrings.subRoute });
          };

          return route?.id ? (
            <Fragment key={route?.name}>
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                testID={JSON.stringify(route?.id)}
                onPress={onPress}
                // onLongPress={onLongPress}
                style={{
                  margin: moderateScale(8),
                  // alignItems: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',

                  justifyContent: 'center',
                }}>
                {/* {options.drawerIcon({focused: isFocused})} */}
                <View style={{flex: 0.15}}>
                  <Image source={route?.image} />
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
          ) : null;
        })}
       
      </View>
      <View
          style={{
            alignItems: 'center',
            // position: 'absolute',
            marginVertical:moderateScaleVertical(10)
          
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: fontFamily.regular,
              color: colors.lightGreyBg2,
              fontSize: textScale(12),
            }}>
            {`${strings.VERSION} ${DeviceInfo.getVersion()} `}
            <Text>{`(${DeviceInfo.getBuildNumber()})`}</Text>
          </Text>
        </View>
      </ScrollView>
      <Loader isLoading={isLoading} withModal={true} />
    </>
  );
}
