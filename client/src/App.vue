<script setup>
import socket from '@/socket'
import Navbar from "@/components/Navbar.vue";

let user = localStorage.getItem('user');

socket.on("connect", () => {
  console.log(socket.id);
})

console.log(user)

if(user === undefined || user === null){
  socket.emit('first-connexion', (user) => {
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user))
  })
}

</script>

<template>
  <navbar></navbar>
  <RouterView/>
</template>

<style scoped>

</style>
