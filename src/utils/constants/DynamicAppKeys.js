import {Platform} from 'react-native';
import {getBundleId} from 'react-native-device-info';

const shortCodes = {
  runrun: 'cbec70',
  royoorder: '8e3eef',
};

const appIds = {
  royoorder: Platform.select({
    ios: 'com.codebrew.royodispatcher',
    android: 'com.royodriverapp.royodispatcher',
  }),
  runrun: Platform.select({
    ios: 'com.RunrunOne.Dispatch',
    android: 'com.Runrun.royodispatcher',
  }),
};

export {appIds, shortCodes};
