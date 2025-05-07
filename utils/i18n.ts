import i18n from "i18next";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
// import { en, zhHans } from "../locales";

const backendOptions: HttpBackendOptions = {
  loadPath: "https://locales.pokemonle.com/{{lng}}/{{ns}}.json",
};

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    lng: "zh-Hans",
    fallbackLng: {
      default: ["en"],
    },
    backend: backendOptions,
    supportedLngs: [
      "en",
      "zh-Hans",
      "zh-Hant",
      "ja",
      "kr",
      "es",
      "fr",
      "de",
      "it",
    ],
    debug: true,
  });

// Object.keys(zhHans).forEach((key) => {
//   i18n.addResourceBundle("zh-Hans", key, zhHans[key]);
// });
// Object.keys(en).forEach((key) => {
//   i18n.addResourceBundle("en", key, en[key]);
// });

export default i18n;
