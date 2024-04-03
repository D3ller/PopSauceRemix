<script setup>
import QBLogo from "@/components/icons/QBLogo.vue";
import Trans from "@/i18n/translation.js";
import {useRouter} from "vue-router";
const router = useRouter()

let navAccept = ref(true);


watch(() => router.currentRoute.value.name, (name) => {
  navAccept.value = name !== 'admin' && name !== 'question' && name !== 'room' && name !=='themes'
});
</script>

<template>
<footer class="footer_area">
<hr class="bar">
  <div class="footer_container">
    <div class="footer_column"><router-link :to="Trans.i18nRoute({name: 'home'})">
      <QBLogo :width="108" :height="74"/></router-link></div>
    <div class="footer_column">
      <h3>Liens rapides</h3>
      <a>Mention légales</a>
      <a>Conditions d'utilisation</a>
      <a>Politique de confidentialité</a>
      <a>Cookies</a>
    </div>
    <div class="footer_column">
      <h3>QPUB et vous?</h3>
      <router-link :to="Trans.i18nRoute({name: 'home'})">Jouer</router-link>
      <router-link :to="Trans.i18nRoute({name: 'register'})">Créer un compte</router-link>
      <router-link :to="Trans.i18nRoute({name: 'login'})">Se connecter</router-link>
      <router-link :to="Trans.i18nRoute({name: 'find'})">Trouver une partie</router-link>
    </div>
  </div>
</footer>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_var.scss";

.footer_area {
  background: $dark-bg;
  min-height: 300px;
  max-height: 400px;
  width: 100%;
  padding: 40px 60px;

  .bar {
    border: 1px solid #414141;
  }

  .footer_container {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));

    .footer_column {
      grid-column: span 4;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 17px;
      color: #c7c7c7;
      font-size: 14px;
      font-family: Inter, sans-serif;

      a {
        color: #c7c7c7;
        font-size: 14px;
        font-family: $base-font;
        text-decoration: none;
      }

      h3 {
        font-size: 20px;
        font-weight: 700;
        color: #c7c7c7;
        font-family: $base-font;
      }
    }
  }
}
</style>