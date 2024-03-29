<script setup>
import { ref } from 'vue';
import Trans from "@/i18n/translation.js";
import {Store} from "@/utils/localstorage.js";
import BlueButton from "@/components/Button/BlueButton.vue";

  const form = ref({
    username: "",
    password: "",
  })

const store = new Store();

</script>

<template>
  <div class="account_div">
    <form class="account_form" @submit.prevent="store.handleLogin(form)">
        <h1 class="account_title">Se connecter</h1>
        <hr class="bar">

        <label class="account_label" for="email">Adresse email</label>
        <input class="account_input" type="email" placeholder="Email" v-model="form.username">
        <label class="account_label" for="password">Mot de passe</label>
        <input class="account_input" type="password" placeholder="Mot de passe" v-model="form.password">

        <p class="have">Vous n'avez pas de compte ? <router-link :to="Trans.i18nRoute({name: 'register'})">Créez un compte</router-link></p>
        <BlueButton>Connexion</BlueButton>
    </form>
</div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/account.scss";
</style>