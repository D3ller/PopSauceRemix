<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { h } from "vue";
import Graphique from "@/components/Graphique.vue";
</script>
<template>
  <div id="block">
    <header>
    <NavbarAdmin></NavbarAdmin>
  </header>
  <main>
   <h2>Admin</h2>
  </main>
  <div id="dashbord">
  <h2>Bienvenue sur la partie admin du site question pour un buisson</h2><br>
  <h4>Dashbord</h4>
 <Graphique></Graphique>
  </div>
  </div>
</template>
<style>
@import "@/assets/scss/admin.scss";


h2{
  font-family: 'Raleway', sans-serif;
}
h4{
  font-family: 'Raleway', sans-serif;
}
</style>