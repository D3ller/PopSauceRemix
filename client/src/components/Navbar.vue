<script setup>
import {ref, onMounted, computed, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import QBLogo from "@/components/icons/QBLogo.vue";
import router from "@/router/index.js";
let navAccept = ref(true);

const { t, locale } = useI18n();

function changeLanguage(lang) {
  locale.value = lang;
}


onMounted(() => {
  const routeName = computed(() => {
    return router.currentRoute.value.name;
  });

  watch(routeName, (newVal) => {
    console.log(newVal);
    if (newVal === 'Room') {
      navAccept.value = false;
    } else {
      navAccept.value = true;
    }
  });


});
</script>

<template>
  <div class="nav_area" v-if="navAccept">
    <nav class="navbar">
      <div class="navbar_items"><router-link to="/"><QBLogo/></router-link></div>
      <div class="navbar_items"><router-link to="/">{{ t('layout.navbar.home') }}</router-link></div>
      <div class="navbar_items"><router-link to="/account">{{ t('layout.navbar.account') }}</router-link></div>
      <div class="navbar_items"><router-link class="navbar_button" to="/list">{{ t('layout.navbar.find') }}</router-link></div>
    </nav>
  </div>
</template>

<style scoped>
@import "@/assets/scss/layout.css";
</style>
