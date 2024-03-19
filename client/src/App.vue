<script setup>
import socket from '@/socket'
import Navbar from "@/components/Navbar.vue";
import {onMounted, onUnmounted, watch} from "vue";
import router from "@/router/index.js";
import LangSelect from "@/components/langSelect.vue";
import Tr from "@/i18n/translation.js";

let user = localStorage.getItem('user');

socket.on("connect", () => {
  console.log(socket.id);
})

console.log(user)

onMounted(() => {
  if(user === undefined || user === null){
    socket.emit('first-connexion', (user) => {
      localStorage.setItem('user', JSON.stringify(user))
      location.reload()
    })
  }
})

</script>

<template>
  <lang-select></lang-select>
  <navbar></navbar>
  <RouterView/>
</template>

<style scoped>

</style>
