<script setup>
import router from '@/router';
import { ref } from 'vue';
import {Store} from "@/utils/localstorage.js";
// import { ref } from 'vue';
import axios from 'axios';
import BlueButton from "@/components/Button/BlueButton.vue";
import Trans from "@/i18n/translation.js";


  const user = ref({
    email: "",
    username: "",
    password: "",
  })

const store = new Store()

</script>

<template>
  <div class="account_div">
    <form class="account_form" @submit.prevent="store.handleRegister(user)">

      <h1 class="account_title">Crée un compte</h1>
      <hr class="bar">

      <label class="account_label" for="email">Adresse email</label>
        <input class="account_input" type="email" placeholder="Adresse mail" v-model="user.email">
      <label class="account_label" for="username">Nom d'utilisateur</label>
        <input class="account_input" type="text" placeholder="Nom d'utilisateur" v-model="user.username">
      <label class="account_label" for="password">Mot de passe</label>
        <input class="account_input" type="password" placeholder="Mot de passe" v-model="user.password">

      <p class="have">Vous avez un compte ? <router-link :to="Trans.i18nRoute({name:'login'})">Connectez-vous</router-link></p>

      <BlueButton>Créer compte</BlueButton>

    </form>

  </div>
<!--    <button @click="test">test</button>-->
</template>

<style lang="scss" scoped>
@import "@/assets/scss/account.scss";
</style>