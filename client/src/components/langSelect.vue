<script setup>
import {useI18n} from "vue-i18n";
import Tr from "@/i18n/translation.js";
import router from "@/router/index.js";
import {ref} from "vue";
let viewLanguage = ref(false);

const { t, locale } = useI18n()

const supportedLanguage = Tr.supportedLocales

const switchLanguage = async (lang) => {
  const newLocale = lang;
  const currentRoute = router.currentRoute.value;
  console.log(currentRoute)
  const newPath = currentRoute.path.replace(`/${currentRoute.params.locale}/`, `/${newLocale}/`); // Construire le nouveau chemin

  await Tr.switchLanguage(newLocale);

  await router.replace({ path: newPath });
  viewLanguage.value = false;
};

const vL = () => {
  viewLanguage.value = !viewLanguage.value
}

</script>

<template>

  <div class="language">
  <img class="lang" alt="" :src="'/src/assets/image/flag-'+Tr.currentLocale+'.png'"  @click="vL">


  <div v-if="viewLanguage" class="col">

      <img class="lang" alt="" :src="'/src/assets/image/flag-'+lang+'.png'" v-for="lang in supportedLanguage" @click="switchLanguage(lang)" :key="lang">{{ lang }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.language {
  position: absolute;
  top: 35px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 30px;
}

.lang {
  width: 30px;
  height: 30px;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>