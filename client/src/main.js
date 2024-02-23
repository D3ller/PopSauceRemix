import './assets/scss/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import {createI18n} from 'vue-i18n'
import { messages } from './i18n'

const i18n = createI18n({
    legacy: false,
    locale: "fr",
    globalInjection: true,
    messages,
});

const app = createApp(App)

app.use(i18n)
app.use(router)
app.mount('#app')
