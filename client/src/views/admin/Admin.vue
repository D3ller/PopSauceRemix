<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { h } from "vue";
import Graphique from "@/components/Graphique.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route)
</script>
<template>
  <div id="block">
    <header class="header_admin">
    <NavbarAdmin :lien="route.name"></NavbarAdmin>
  </header>
  <div class="right_block">
  <main class="main_admin">
   <h2 class="h2_admin">Admin</h2>
  </main>
  <div id="dashbord">
  <div class="contenu_admin">
    <h2>Bienvenue sur la partie admin du site question pour un buisson</h2><br>
  <h4>Dashbord</h4>
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