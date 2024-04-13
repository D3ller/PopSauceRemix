<script setup>
import { ref } from 'vue';
import Trans from "@/i18n/translation.js";
import {Store} from "@/utils/localstorage.js";
import BlueButton from "@/components/Button/BlueButton.vue";
import axios from "axios";
import router from "@/router/index.js";
import {useI18n} from "vue-i18n";
const {t, locale} = useI18n();

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

// const store = new Store();

</script>

<template>
  <div class="account_div">
    <form class="account_form" @submit.prevent="handleLogin(form)">
      <h1 class="account_title">{{ t('pages.login_page.title') }}</h1>
      <hr class="bar">

      <label class="account_label" for="email">{{ t('pages.login_page.email_label') }}</label>
      <input class="account_input" type="email" :placeholder="t('pages.login_page.email_placeholder')" v-model="form.username">
      <label class="account_label" for="password">{{ t('pages.login_page.password_label') }}</label>
      <input class="account_input" type="password" :placeholder="t('pages.login_page.password_placeholder')" v-model="form.password">

      <p class="have">{{ t('pages.login_page.no_account') }} <router-link :to="Trans.i18nRoute({name: 'register'})">{{ t('pages.login_page.register_link') }}</router-link></p>
      <BlueButton>{{ t('pages.login_page.login_button') }}</BlueButton>
    </form>
  </div>
</template>


<style lang="scss" scoped>
@import "@/assets/scss/account.scss";
</style>