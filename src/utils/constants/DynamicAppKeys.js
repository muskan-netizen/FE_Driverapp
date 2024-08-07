import { Platform } from 'react-native';

const shortCodes = {
  ace: '3c58a1'
};

const appIds = {
  ace: Platform.select({
    ios: 'com.Ace.Dispatch',
    android: 'com.Ace.royodispatcher',
  }),  
};

export { appIds, shortCodes };
