<script setup>

import QBLogo from "@/components/icons/QBLogo.vue";
</script>

<template>
  <div class="nav_area">
<nav class="navbar">
  <div class="navbar_items"><router-link to="/"><QBLogo/></router-link></div>
  <div class="navbar_items"><router-link to="/">Accueil</router-link></div>
  <div class="navbar_items"><router-link to="/account">Compte</router-link></div>
  <div class="navbar_items"><router-link class="navbar_button" to="/list">Trouver une partie</router-link></div>
</nav>
  </div>
</template>

<style scoped>

@import "@/assets/scss/layout.css";
</style>