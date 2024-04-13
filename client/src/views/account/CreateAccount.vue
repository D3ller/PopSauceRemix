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

// const store = new Store()

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
  axios.post('http://apiplateform.karibsen.fr/api/login_check', {
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

          const userResponse = await axios.get('http://apiplateform.karibsen.fr/api/me', {
            headers: {Authorization: `Bearer ${token}`}
          });

          localStorage.setItem('user', JSON.stringify(userResponse.data.user))

          await router.push('/fr/account');
        }
      })
}

function handleRegister(user) {
  try {
    axios.post('http://apiplateform.karibsen.fr/api/users', user)
        .then(async (res) => {
          if (res.status === 201) {
            console.log(res.data)
            const login = {
              username: user.email,
              password: user.password
            }
            await handleLogin(login)
            // router.push('/fr/account')
          }
        })
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <div class="account_div">
    <form class="account_form" @submit.prevent="handleRegister(user)">

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