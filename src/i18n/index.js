import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // default locale
  locale: 'en',
  // translations
  messages: {
    en: {
		appTitle: "Wang HQ Database",
		homeDescription: "Welcome to the Wang HQ Database. You can view all of the house's files from photos to documents."
    },
    fr: {
		appTitle: "Wang HQ Database",
		homeDescription: "Welcome to the Wang HQ Database. You can view all of the house's files from photos to documents."
	},
    zh_cn: {
		appTitle: "Wang HQ Database",
		homeDescription: "Welcome to the Wang HQ Database. You can view all of the house's files from photos to documents."
	},
    zh_tw: {
		appTitle: "Wang HQ Database",
		homeDescription: "Welcome to the Wang HQ Database. You can view all of the house's files from photos to documents."
	},
  },
})

export default i18n