import React from 'react';
import {Login, PhoneVerification, Webview} from '../Screens';
import navigationStrings from './navigationStrings';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
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
