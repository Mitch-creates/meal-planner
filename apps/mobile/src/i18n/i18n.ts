import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import { en } from "./en";

const deviceLocale = getLocales()[0]?.languageCode ?? "en";

void i18n.use(initReactI18next).init({
  lng: deviceLocale,
  fallbackLng: "en",
  defaultNS: "translation",
  resources: {
    en: { translation: en }
  },
  interpolation: { escapeValue: false }
});

export { i18n };
