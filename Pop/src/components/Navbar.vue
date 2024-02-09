<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import QBLogo from "@/components/icons/QBLogo.vue";

const { t, locale } = useI18n(); // Correctly destructure `t` and `locale`

function changeLanguage(lang) {
  locale.value = lang; // This will change the locale for i18n
}

// It's not necessary to call onMounted just to log the initial locale
// unless you have other side effects to trigger once the component mounts.
</script>

<template>
  <div class="nav_area">
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
