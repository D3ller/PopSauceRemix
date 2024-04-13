<script setup>
import { ref } from 'vue';
import Trans from "@/i18n/translation.js";
import {Store} from "@/utils/localstorage.js";
import BlueButton from "@/components/Button/BlueButton.vue";
import axios from "axios";
import router from "@/router/index.js";

  const form = ref({
    username: "",
    password: "",
  })

function getToken() {
  var cookieName = "token"
  var cookieArray = document.cookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(cookieName + '=') == 0) {
      return cookie.substring(cookieName.length + 1, cookie.length);
    }
  }
}

function handleLogin(form) {
  axios.post('http://localhost:8080/api/login_check', {
    username: form.username,
    password: form.password
  })
      .then(async (res) => {
        console.log(res)
        if (res.data.token) {
          var dateExpiration = new Date();
          dateExpiration.setTime(dateExpiration.getTime() + (1 * 60 * 60 * 1000));
          console.log(dateExpiration)
          var dateUTC = dateExpiration.toUTCString();
          document.cookie = `token=${res.data.token};expires=${dateUTC};path=/`;

          let token = await getToken();
          console.log(token);

          const userResponse = await axios.get('http://localhost:8080/api/me', {
            headers: {Authorization: `Bearer ${token}`}
          });

          localStorage.setItem('user', JSON.stringify(userResponse.data.user))

          await router.push('/fr/account');
        }
      })
}

// const store = new Store();

</script>

<template>
  <div class="account_div">
    <form class="account_form" @submit.prevent="handleLogin(form)">
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