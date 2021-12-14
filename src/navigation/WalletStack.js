import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AddMoney, Wallet} from '../Screens';
import navigationStrings from './navigationStrings';

const Stack = createNativeStackNavigator();
export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.WALLET}
        component={Wallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ADD_MONEY}
        component={AddMoney}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
