import LocalizedStrings from 'react-native-localization';
import en from './en';
import ar from './ar';
import es from './es';
import de from './de';
import fr from './fr';
import tr from './tr';
import zh from './zh';
import ru from './ru';
import ptBr from './ptBr';

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
});
export const changeLaguage = languageKey => {
  strings.setLanguage(languageKey);
};
export default strings;
