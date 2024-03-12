import { createI18n } from "vue-i18n";
import fr from "./locale/messages_fr.json";
import en from "./locale/messages_en.json";

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages: {
        fr: fr,
        en: en
    }
});
