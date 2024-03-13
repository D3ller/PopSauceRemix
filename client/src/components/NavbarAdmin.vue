
<script setup >
import QBLogo from "@/components/icons/QBLogo.vue";

</script>
<template>
   <div class="nav_area">
    <nav class="navbar">
      <div class="navbar_items"><router-link :to="({ name: 'home' })"><QBLogo/></router-link></div>
      <div class="navbar_items"><router-link :to="({ name: 'home' })">Question</router-link></div>
      <div class="navbar_items"><router-link :to="({ name: 'account' })">Thèmes</router-link></div>
      <div class="navbar_items"><router-link :to="({ name: 'home' })">Utilisateurs</router-link></div>
      <div class="navbar_items"><router-link :to="({ name: 'home' })">Valider une question</router-link></div>
    </nav>
  </div>
</template>
<style scoped>
@import "@/assets/scss/layout.css";
</style>