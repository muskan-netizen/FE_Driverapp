import { getBundleId } from "react-native-device-info";
import { appIds, shortCodes } from "../../utils/constants/DynamicAppKeys";

export const getAppCode = () => {
switch (getBundleId()) {
    case appIds.hubDrives: return shortCodes.hubDrives
    default: return 'cf0b96'
}
}