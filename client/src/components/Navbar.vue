<script setup>
import {ref, onMounted, computed, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import QBLogo from "@/components/icons/QBLogo.vue";
import Tr from "@/i18n/translation"
import {useRouter} from "vue-router";
const router = useRouter()

let navAccept = ref(true);

watch(() => router.currentRoute.value.name, (name) => {
  navAccept.value = name !== 'room' && name !== 'admin'

})

const { t, locale } = useI18n()



</script>

<template>


  <div class="nav_area" v-if="navAccept">

    <nav class="navbar">
      <div class="navbar_items"><router-link :to="Tr.i18nRoute({ name: 'home' })"><QBLogo/></router-link></div>
      <div class="navbar_items"><router-link :to="Tr.i18nRoute({ name: 'home' })">{{ t('layout.navbar.home') }}</router-link></div>
      <div class="navbar_items"><router-link :to="Tr.i18nRoute({ name: 'account' })">{{ t('layout.navbar.account') }}</router-link></div>
      <div class="navbar_items"><router-link class="navbar_button" :to="Tr.i18nRoute({ name: 'find' })">{{ t('layout.navbar.find') }}</router-link></div>
    </nav>
  </div>



</template>

<style lang="scss" scoped>
@import "@/assets/scss/_var.scss";
@import "@/assets/scss/_mixins.scss";

.nav_area {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: $dark-bg;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: white;
    max-width: 650px;
    font-family: $base-font;
    gap: 3rem;
    border-radius: 5px;
    position: absolute;
    top: 20px;

    .navbar_items {
      display: flex;
      align-items: center;
      gap: 1rem;

      a {
        color: white;
        text-decoration: none;
        font-size: 16px;
        display: flex;
        align-items: center;
        font-weight: 600;


      }

      .navbar_button {
        padding: 0.5rem 1.2rem;
        background-color: $linear-blue;
        border-radius: 5px;
        transition: background-color 0.3s;
      }
    }

  }
}
</style>
