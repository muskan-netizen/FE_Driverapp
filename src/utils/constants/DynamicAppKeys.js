import {Platform} from 'react-native';
import {getBundleId} from 'react-native-device-info';

const shortCodes = {
  runrun: 'cbec70',
  royoorder: '8e3eef',
  deliverstat:'e6b31c',
  africanVillageMarket:'6c786d',
  africanize:'a98da0'
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
  africanVillageMarket: Platform.select({
    ios: 'com.AfricanVillageMarket.Dispatch',
    android: 'com.AfricanVillageMarket.royodispatcher',
  }),
  africanize: Platform.select({
    ios: 'com.Africanize.Dispatch',
    android: 'com.africanize.royodispatcher',
  }),
};

export {appIds, shortCodes};
