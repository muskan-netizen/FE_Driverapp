import {Platform} from 'react-native';
import {getBundleId} from 'react-native-device-info';

const shortCodes = {
  runrun: 'cbec70',
  royoorder: '8e3eef',
  deliverstat:'e6b31c'
};

const appIds = {
  royoorder: Platform.select({
    ios: 'com.CodeBrew.Royo.Driver',
    android: 'com.codebew.royodispatcher',
  }),
  runrun: Platform.select({
    ios: 'com.RunrunOne.Dispatch',
    android: 'com.Runrun.royodispatcher',
  }),
  deliverstat: Platform.select({
    ios: 'com.Deliverstat.Dispatch',
    android: 'com.Deliverstat.royodispatcher',
  }),
};

export {appIds, shortCodes};
