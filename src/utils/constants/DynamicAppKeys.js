import { Platform } from "react-native";
import { getBundleId } from "react-native-device-info";

const shortCodes = {
  payanam:'7a6d0e',
  hubDrives:'86392b',
};

const appIds = {

  payanam: Platform.select({
    ios: "com.payanam.driver",
    android: "com.payanam.driver",
  }),

  hubDrives: Platform.select({
    ios: 'com.dispatch.hubdrives',
    android: 'com.dispatch.hubdrives',
  }),
};

export { appIds, shortCodes };
