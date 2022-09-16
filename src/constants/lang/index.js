import LocalizedStrings from 'react-native-localization';
import DeviceInfo from 'react-native-device-info';

import en from './en';
import ar from './ar';
import es from './es';
import de from './de';
import fr from './fr';
import tr from './tr';
import zh from './zh';
import ru from './ru';
import ptBr from './ptBr';
import sv from './sv';
import pr from './pr';
import vi from './vi';
import ne from './ne';
import { appIds } from '../../utils/constants/DynamicAppKeys';


let strings = new LocalizedStrings({
  en: en,
  ar: ar,
  es: es,
  de: de,
  fr: fr,
  tr: tr,
  zh: zh,
  ru: ru,
  ptBr: ptBr,
  sv: sv,
  pr: pr,
  vi: vi,
  ne:ne,
});
export const changeLaguage = languageKey => {
   strings.setLanguage(languageKey);
};
export default strings;
