import { createI18n } from 'vue-i18n';

const messages = {};
const languageFiles = import.meta.glob('./*.json', { eager: true });

for (const path in languageFiles) {
  const locale = path.replace(/(\.\/|\.json)/g, '');
  messages[locale] = languageFiles[path].default;
}

const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});

export default i18n;
