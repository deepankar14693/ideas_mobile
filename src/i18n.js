import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';

function getLanguageUrl() {
  let timeStamp = moment().format("YYYYMMDDHH");
  return "https://appcenter.vicicentral.com/Content/locales2/default/{{lng}}/{{ns}}.json?" + timeStamp;
}

function getCurrentCulture() {
  return 'en';
}

i18n
  .use(XHR)
  .use(initReactI18next)
  .init({
    lng: getCurrentCulture(),
    fallbackLng: getCurrentCulture(),
    preload: ['en'],
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    cache: {
      enabled: true
    },
    "backend": {
      "loadPath": getLanguageUrl(),
      crossDomain: true,
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      useSuspense: false
    },
  });

export default i18n;