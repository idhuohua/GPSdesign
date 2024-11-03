import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-chained-backend'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: {
      default: ['en'],
    },
    defaultNS: 'common',
    resources: {},

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      backends: [],
      backendOptions: [],
    },
  })

export default i18n
