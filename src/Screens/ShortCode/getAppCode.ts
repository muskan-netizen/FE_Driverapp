import { getBundleId } from "react-native-device-info";
import { appIds, shortCodes } from "../../utils/constants/DynamicAppKeys";

export const getAppCode = () => {
    switch (getBundleId()) {
        case appIds.grub: return shortCodes.grub
        case appIds.punnet: return shortCodes.punnet
        case appIds.suel: return shortCodes.suel    
        case appIds.gusto: return shortCodes.gusto
        case appIds.voltaic: return shortCodes.voltaic
        case appIds.elixir: return shortCodes.elixir
        case appIds.ace: return shortCodes.ace
        case appIds.zest: return shortCodes.zest
        case appIds.homeric: return shortCodes.homeric
        case appIds.gokab: return shortCodes.gokab
        case appIds.spa: return shortCodes.spa
        case appIds.emart: return shortCodes.emart
        case appIds.khaleejTimes: return shortCodes.khaleejTimes
        case appIds.n2go: return shortCodes.n2go

        default: return '102ad2'
    }
}