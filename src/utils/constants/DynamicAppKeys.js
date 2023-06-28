import { Platform } from 'react-native';

const shortCodes = {
  ace: '3c58a1',
  spa: '69dd33',
  homeric: '66951f',
  gokab: '362d14', 
  grub: 'b68843',
  gusto: '057ff8',
  punnet: '87444d',
  suel: 'b11cb2',
  voltaic: '0ff16f',
  elixir: 'cca668',
  zest: 'ddceeb',
};

const appIds = {
  ace: Platform.select({
    ios: 'com.Ace.Dispatch',
    android: 'com.Ace.royodispatcher',
  }),
  homeric: Platform.select({
    ios: 'com.Homeric.Dispatch',
    android: 'com.Homeric.royodispatcher',
  }),
  gokab: Platform.select({
    ios: 'com.GoKab.Dispatch',
    android: 'com.Gokab.royodispatcher',
  }),
  grub: Platform.select({
    ios: 'com.Grub.Dispatch',
    android: 'com.Grub.royodispatcher',
  }),
  punnet: Platform.select({
    ios: 'com.Punnet.Dispatch',
    android: 'com.Punnet.royodispatcher',
  }),
  suel: Platform.select({
    ios: 'com.Suel.Dispatch',
    android: 'com.Suel.royodispatcher',
  }),
  gusto: Platform.select({
    ios: 'com.Gusto.Dispatch',
    android: 'com.Gusto.royodispatcher',
  }),
  voltaic: Platform.select({
    ios: 'com.Voltaic.Dispatch',
    android: 'com.Voltaic.royodispatcher',
  }),
  elixir: Platform.select({
    ios: 'com.Elixir.Dispatch',
    android: 'com.Elixir.royodispatcher',
  }),
  zest: Platform.select({
    ios: 'com.Zest.Dispatch',
    android: 'com.Zest.royodispatcher',
  }),
  spa: Platform.select({
    ios: 'com.spa.Dispatch',
    android: 'com.spa.royodispatcher',
  }),
  
};

export { appIds, shortCodes };
