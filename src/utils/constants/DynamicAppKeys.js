import { Platform } from 'react-native';
import { getBundleId } from 'react-native-device-info';

const shortCodes = {
  cla:'cf0b96',
  hubDrives:'cf0b96',
};

const appIds = {
  cla: Platform.select({
    ios: 'com.royodispatcher.cla',
    android: 'com.royodispatcher.cla',
  }),
  hubDrives: Platform.select({
    ios: 'com.dispatch.hubdrives',
    android: 'com.dispatch.hubdrives',
  }),
};

const socialKeys = {
  TWITTER_COMSUMER_KEY:
    'R66DHARfuoYAPowApUxNxwbPi',
  TWITTER_CONSUMER_SECRET:
    'itcicJ7fUV3b73B8V05GEDBo4tzxGox2Si2q0BCk5pue327k15',
};

export { appIds, socialKeys, shortCodes };
