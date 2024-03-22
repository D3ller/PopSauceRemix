
<script setup >
import QBLogo from "@/components/icons/QBLogo.vue";

</script>
<template>
   <div class="nav_area">
    <nav class="navbar">
      <div class="navbar_items"><router-link :to="({ name: 'home' })"><QBLogo/></router-link></div>
      <div class="navbar_items"><img src="@/assets/image/entrevue.png" alt="icone des questions"><router-link :to="({ name: 'question' })">Question</router-link></div>
      <div class="navbar_items"><img src="@/assets/image/bibliotheque.png" alt="icone des thèmes"><router-link :to="({ name: 'account' })">Thèmes</router-link></div>
      <div class="navbar_items"><img src="@/assets/image/utilisateur.png" alt="icone des utilisateurs"><router-link :to="({ name: 'home' })">Utilisateurs</router-link></div>
      <div class="navbar_items"><img src="@/assets/image/verifie.png" alt="icone des verifie"><router-link :to="({ name: 'home' })">Valider une question</router-link></div>
    </nav>
  </div>
</template>
<style scoped>
@import "@/assets/scss/layout.css";
img{
  width: 20px;
  height: 20px;

}
.navbar{
  gap: 2rem !important;
  align-items: flex-start !important;
  flex-direction: column;
  margin: 20px;
}
.navbar_items{
  margin: 10px;
  
}
a{
  color: white;
  text-decoration: none;
}

svg{
  margin-bottom: 30px;
 
}
</style>