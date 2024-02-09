<template>
  <div>
    {{ t('message.hello') }}
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('fr')">Français</button>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t, locale } = useI18n({
    });

    const changeLanguage = (lang) => {
      locale.value = lang;
    };

    return { t, changeLanguage };
  },
}
</script>
