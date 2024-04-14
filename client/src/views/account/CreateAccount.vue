<script setup>
import router from '@/router';
import { ref } from 'vue';
import {Store} from "@/utils/localstorage.js";
// import { ref } from 'vue';
import axios from 'axios';
import BlueButton from "@/components/Button/BlueButton.vue";
import Trans from "@/i18n/translation.js";
import {useI18n} from "vue-i18n";
const {t, locale} = useI18n();


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
  axios.post('https://apiplateform.karibsen.fr/api/login_check', {
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

          const userResponse = await axios.get('https://apiplateform.karibsen.fr/api/me', {
            headers: {Authorization: `Bearer ${token}`}
          });

          localStorage.setItem('user', JSON.stringify(userResponse.data.user))

          await router.push('/fr/account');
        }
      })
}

function handleRegister(user) {
  try {
    axios.post('https://apiplateform.karibsen.fr/api/users', user)
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

      <h1 class="account_title">{{ t('pages.account_creation_page.title') }}</h1>
      <hr class="bar">

      <label class="account_label" for="email">{{ t('pages.account_creation_page.email_label') }}</label>
      <input class="account_input" type="email" :placeholder="t('pages.account_creation_page.email_placeholder')" v-model="user.email">
      <label class="account_label" for="username">{{ t('pages.account_creation_page.username_label') }}</label>
      <input class="account_input" type="text" :placeholder="t('pages.account_creation_page.username_placeholder')" v-model="user.username">
      <label class="account_label" for="password">{{ t('pages.account_creation_page.password_label') }}</label>
      <input class="account_input" type="password" :placeholder="t('pages.account_creation_page.password_placeholder')" v-model="user.password">

      <p class="have">{{ t('pages.account_creation_page.existing_account') }} <router-link :to="Trans.i18nRoute({name:'login'})">{{ t('pages.account_creation_page.login_link') }}</router-link></p>

      <BlueButton>{{ t('pages.account_creation_page.create_account_button') }}</BlueButton>

    </form>

  </div>
</template>


<style lang="scss" scoped>
@import "@/assets/scss/account.scss";
</style>