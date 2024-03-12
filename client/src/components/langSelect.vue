<script setup>
import {useI18n} from "vue-i18n";
import Tr from "@/i18n/translation.js";
import router from "@/router/index.js";
import {ref} from "vue";
let viewLanguage = ref(false);

const { t, locale } = useI18n()

const supportedLanguage = Tr.supportedLocales

const switchLanguage = async (event) => {
  const newLocale = event;
  console.log(newLocale)
  const currentRoute = router.currentRoute.value;
  console.log(currentRoute)
  const newPath = currentRoute.path.replace(`/${currentRoute.params.locale}/`, `/${newLocale}/`); // Construire le nouveau chemin

  await Tr.switchLanguage(newLocale);

  await router.replace({ path: newPath });
};

const vL = () => {
  viewLanguage.value = !viewLanguage.value
}

</script>

<template>

  <div @click="vL">
    {{Tr.currentLocale}}
    <div v-if="viewLanguage">
      <div v-for="lang in supportedLanguage" @change="switchLanguage(lang)" :key="lang">{{ lang }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>