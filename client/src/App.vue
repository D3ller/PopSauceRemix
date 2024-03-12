<script setup>
import socket from '@/socket'
import Navbar from "@/components/Navbar.vue";
import {onMounted, onUnmounted} from "vue";
import router from "@/router/index.js";
import LangSelect from "@/components/langSelect.vue";

let user = localStorage.getItem('user');

socket.on("connect", () => {
  console.log(socket.id);
})

console.log(user)

onMounted(() => {
  if(user === undefined || user === null){
    socket.emit('first-connexion', (user) => {
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user))
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
