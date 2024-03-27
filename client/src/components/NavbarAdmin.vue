
<script setup >
import QBLogo from "@/components/icons/QBLogo.vue";

</script>
<template>
   <div class="nav_area">
    <nav class="navbar">
      <div class="navbar_items"><router-link :to="({ name: 'home' })"><QBLogo/></router-link></div>
      <div class="navbar_items"><img class="img_navbar_admin" src="@/assets/image/entrevue.png" alt="icone des questions"><router-link :to="({ name: 'question' })">Question</router-link></div>
      <div class="navbar_items"><img class="img_navbar_admin" src="@/assets/image/bibliotheque.png" alt="icone des thèmes"><router-link :to="({ name: 'account' })">Thèmes</router-link></div>
      <div class="navbar_items"><img class="img_navbar_admin" src="@/assets/image/utilisateur.png" alt="icone des utilisateurs"><router-link :to="({ name: 'home' })">Utilisateurs</router-link></div>
      <div class="navbar_items"><img class="img_navbar_admin" src="@/assets/image/verifie.png" alt="icone des verifie"><router-link :to="({ name: 'home' })">Valider une question</router-link></div>
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
      a:hover{
        color: #51C12C;
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

.img_navbar_admin{
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