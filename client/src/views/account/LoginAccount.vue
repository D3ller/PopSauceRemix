<script setup>
import { ref } from 'vue';
import Trans from "@/i18n/translation.js";
import {Store} from "@/utils/localstorage.js";

  const form = ref({
    username: "",
    password: "",
  })

const store = new Store();

</script>

<template>
    <form @submit.prevent="store.handleLogin(form)">
        <input type="email" placeholder="email" v-model="form.username">
        <input type="password" placeholder="mdp" v-model="form.password">
        <button>Connexion</button>
    </form>
</template>

<style scoped>

</style>