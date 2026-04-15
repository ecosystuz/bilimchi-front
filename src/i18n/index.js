import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import uz from '../locales/uz.json';

const LOCALE_STORAGE_KEY = 'app-locale';
const messages = { en, ru, uz };

const getSavedLocale = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
  return messages[savedLocale] ? savedLocale : null;
};

const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale() || 'ru',
  fallbackLocale: 'en',
  messages
});

export { LOCALE_STORAGE_KEY };
export default i18n;
