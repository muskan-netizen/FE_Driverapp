import React from 'react';
import {
  AddSignature,
  DashBoard,
  Scanner,
  TaskCancel,
  TaskCompleteDocument,
  TaskDetail,
  TaskHistory,
} from '../Screens';
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
      
    </Stack.Navigator>
  );
}
