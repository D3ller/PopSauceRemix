<script setup>
import QBLogo from "@/components/icons/QBLogo.vue";
import Trans from "@/i18n/translation.js";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {useI18n} from "vue-i18n";
const {t, locale} = useI18n();
const router = useRouter()

let isAdminPage = ref(true);


watch(() => router.currentRoute.value.name, (name) => {
  isAdminPage.value = name !== 'admin' && name !== 'question' && name !== 'room' && name !=='themes' && name !=='user' && name !=='valide_question'
});

console.log(isAdminPage);
</script>

<template>
  <footer v-if="isAdminPage" class="footer_area">
    <hr class="bar">
    <div class="footer_container">
      <div class="footer_column">
        <router-link :to="Trans.i18nRoute({name: 'home'})">
          <QBLogo :width="108" :height="74"/></router-link>
      </div>
      <div class="footer_column">
        <h3>{{ t('footer.quick_links') }}</h3>
        <router-link :to="Trans.i18nRoute({name: 'mentions'})">{{ t('footer.legal_mention') }}</router-link>
        <router-link :to="Trans.i18nRoute({name: 'conditions'})">{{ t('footer.terms_of_use') }}</router-link>
        <router-link :to="Trans.i18nRoute({name: 'politique'})">{{ t('footer.privacy_policy') }}</router-link>
        <router-link :to="Trans.i18nRoute({name: 'cookie'})">{{ t('footer.cookies') }}</router-link>
      </div>
      <div class="footer_column">
        <h3>{{ t('footer.qpub_and_you') }}</h3>
        <router-link :to="Trans.i18nRoute({name: 'home'})">{{ t('footer.play') }}</router-link>
        <router-link :to="Trans.i18nRoute({name: 'register'})">{{ t('footer.create_account') }}</router-link>
        <router-link :to="Trans.i18nRoute({name: 'user_question'})">{{ t('footer.propose_question') }}</router-link>
        <router-link :to="Trans.i18nRoute({name: 'login'})">{{ t('footer.login') }}</router-link>
        <router-link :to="Trans.i18nRoute({name: 'find'})">{{ t('footer.find_game') }}</router-link>
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