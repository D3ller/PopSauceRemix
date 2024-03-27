<script setup>
import router from '@/router';
import { ref } from 'vue';
import {Store} from "@/utils/localstorage.js";
// import { ref } from 'vue';
import axios from 'axios';


  const user = ref({
    email: "",
    username: "",
    password: "",
  })

const store = new Store()

</script>

<template>
    <form @submit.prevent="store.handleRegister(user)">
        <input type="email" placeholder="email" v-model="user.email">
        <input type="username" placeholder="username" v-model="user.username">
        <input type="password" placeholder="mdp" v-model="user.password">
<!--        <input type="" placeholder="confirm mdp" v-model="confirm_mdp">-->
        <button>Créer compte</button>
    </form>

<!--    <button @click="test">test</button>-->
</template>

<style scoped>

</style>