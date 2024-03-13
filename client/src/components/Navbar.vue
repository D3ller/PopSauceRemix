<script setup>
import {ref, onMounted, computed, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import QBLogo from "@/components/icons/QBLogo.vue";
import Tr from "@/i18n/translation"
import {useRouter} from "vue-router";
const router = useRouter()

let navAccept = ref(true);

watch(() => router.currentRoute.value.name, (name) => {
  navAccept.value = name !== 'room';
})

const { t, locale } = useI18n()



</script>

<template>
  <div class="nav_area" v-if="navAccept">
    <nav class="navbar">
      <div class="navbar_items"><router-link :to="Tr.i18nRoute({ name: 'home' })"><QBLogo/></router-link></div>
      <div class="navbar_items"><router-link :to="Tr.i18nRoute({ name: 'home' })">{{ t('layout.navbar.home') }}</router-link></div>
      <div class="navbar_items"><router-link :to="Tr.i18nRoute({ name: 'account' })">{{ t('layout.navbar.account') }}</router-link></div>
      <div class="navbar_items"><router-link class="navbar_button" :to="Tr.i18nRoute({ name: 'home' })">{{ t('layout.navbar.find') }}</router-link></div>
    </nav>
  </div>


</template>

<style scoped>
@import "@/assets/scss/layout.css";
</style>
