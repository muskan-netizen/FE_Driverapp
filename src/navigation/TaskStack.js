import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AddSignature,
  ContactUs,
  DashBoard,
  OrderDetail,
  Scanner,
  TaskCancel,
  TaskCompleteDocument,
  TaskDetail,
  TaskHistory,
} from '../Screens';
import Cart from '../Screens/CustomerCart/Cart3';
import navigationStrings from './navigationStrings';
import WalletStack from './WalletStack';

const Stack = createNativeStackNavigator();
export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.DASHBOARD}
        component={DashBoard}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name={navigationStrings.TASKHISTORY}
        component={TaskHistory}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.TASKDETAIL}
        component={TaskDetail}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.TASKCANCEL}
        component={TaskCancel}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.TASKCOMPLETEDOCUMENT}
        component={TaskCompleteDocument}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ADDSIGNATURE}
        component={AddSignature}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.SCANNER}
        component={Scanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.WALLETSTACK}
        component={WalletStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.CONTACTUS}
        component={ContactUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ORDERDETAIL}
        component={OrderDetail}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name={navigationStrings.CART}
        component={Cart}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
