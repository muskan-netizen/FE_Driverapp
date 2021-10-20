import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import CustomDrawerContent from '../Components/CustomDrawerContent';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import {Settings} from '../Screens';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import AppSettingStack from './AppSettingStack';
import navigationStrings from './navigationStrings';
import ProfileStack from './ProfileStack';
import TaskStack from './TaskStack';

const Drawer = createDrawerNavigator();
export default function DrawerRoutes(props) {
  return (
    <Drawer.Navigator
      drawerPosition={'left'}
      backBehavior={'initialRoute'}
      drawerType={'front'}
      overlayColor={'rgba(0,0,0,0.6)'}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        gestureEnabled: true,
        drawerStyle: {
          paddingTop: moderateScaleVertical(width / 6),
        },
      }}
      // hideStatusBar={true}
      drawerStyle={{width: '75%', backgroundColor: colors.blueHeaderColor}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        component={TaskStack}
        name={navigationStrings.TASKSTACK}
        options={{
          drawerLabel: strings.TASKHISTORY,
          drawerIcon: ({focused}) => (
            <Image
              style={{tintColor: focused ? colors.blackShade2 : colors.grey2}}
              source={imagePath.taskHistory}
            />
          ),
        }}
      />

      <Drawer.Screen
        component={ProfileStack}
        name={navigationStrings.PROFILESTACK}
        options={{
          drawerLabel: strings.SETTING,
          drawerIcon: ({focused}) => (
            <Image
              style={{tintColor: focused ? colors.blackShade2 : colors.grey2}}
              source={imagePath.profileImage}
            />
          ),
        }}
      />

      <Drawer.Screen
        component={Settings}
        name={navigationStrings.SETTINGS}
        options={{
          drawerLabel: strings.SETTING,
          drawerIcon: ({focused}) => (
            <Image
              style={{tintColor: focused ? colors.blackShade2 : colors.grey2}}
              source={imagePath.settingsIcon}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  cartItemCountView: {
    position: 'absolute',
    zIndex: 100,
    top: -5,
    right: -5,
    backgroundColor: colors.cartItemPrice,
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemCountNumber: {
    fontFamily: fontFamily.futuraBtHeavy,
    color: colors.white,
    fontSize: textScale(8),
  },
});
