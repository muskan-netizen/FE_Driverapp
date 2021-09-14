import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {useSelector} from 'react-redux';
import ShortCode from '../Screens/ShortCode/ShortCode';
import {navigationRef} from './NavigationService';
import navigationStrings from './navigationStrings';
import AuthStack from './AuthStack';
import DrawerRoutes from './DrawerStack';

const Stack = createNativeStackNavigator();

export function shortCode(Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.SHORT_CODE}
        component={ShortCode}
        options={{headerShown: false}}
      />
    </>
  );
}

export function drawer(Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.DRAWER_ROUTES}
        component={DrawerRoutes}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </>
  );
}

export default function Routes() {
  const userData = useSelector(state => state?.auth?.userData);
  console.log(userData, 'userData>userData>userData');
  // const {shortCodeStatus, appStyle} = useSelector(state => state?.initBoot);

  return (
    <AppearanceProvider>
      <NavigationContainer
        // theme={scheme == 'dark' ? DarkTheme : DefaultTheme}
        ref={navigationRef}>
        <Stack.Navigator>
          {shortCode(Stack)}
          {userData && userData?.access_token
            ? drawer(Stack)
            : AuthStack(Stack)}
          {/* {AuthStack(Stack)}
          {drawer(Stack)} */}
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
