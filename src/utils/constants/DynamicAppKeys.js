import { Platform } from "react-native";
import { getBundleId } from "react-native-device-info";

const shortCodes = {
  payanam:'7a6d0e',
  hubDrives:"66951f",
};

const appIds = {

  payanam: Platform.select({
    ios: "com.payanam.driver",
    android: "com.payanam.driver",
  }),

  hubDrives: Platform.select({
    ios: 'com.driver.restocare',
    android: 'com.driver.restocare',
  }),
};

export { appIds, shortCodes };
