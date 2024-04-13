<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { h } from "vue";
import Graphique from "@/components/Graphique.vue";
import { useRoute } from 'vue-router';
import {useI18n} from "vue-i18n";
const route = useRoute();
console.log(route)
const { t } = useI18n();
</script>
<template>
  <div id="block">
    <header class="header_admin">
      <NavbarAdmin :lien="route.name"></NavbarAdmin>
    </header>
    <div class="right_block">
      <main class="main_admin">
        <h2 class="h2_admin">{{ t('pages.admin_page.page_title') }}</h2>
      </main>
      <div id="dashbord">
        <div class="contenu_admin">
          <h2>{{ t('pages.admin_page.welcome_message') }}</h2><br>
          <h4>{{ t('pages.admin_page.dashboard_title') }}</h4>
          <Graphique></Graphique>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/admin.scss";

.contenu_admin{
  margin: 0 auto;
  width: 90%;
  font-family: $base-font;
}
</style>