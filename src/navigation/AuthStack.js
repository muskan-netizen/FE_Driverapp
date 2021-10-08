import React from 'react';
import {Login, PhoneVerification, Signup, Webview} from '../Screens';
import navigationStrings from './navigationStrings';


export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
        options={{headerShown: false,gestureEnabled:false}}
      />
      <Stack.Screen
        name={navigationStrings.SIGN_UP}
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.SEND_OTP}
        component={PhoneVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.WEBLINKS}
        component={Webview}
        options={{headerShown: false}}
      />
    </>
  );
}
