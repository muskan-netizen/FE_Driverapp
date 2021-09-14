import React from 'react';
import {DashBoard} from '../Screens';
import navigationStrings from './navigationStrings';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.DASHBOARD}
        component={DashBoard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
