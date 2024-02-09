import './assets/scss/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createI18n} from 'vue-i18n'
import { messages } from './i18n'

const i18n = createI18n({
    legacy: false,
    locale: "fr",
    globalInjection: true,
    messages,
});

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)


app.mount('#app')
