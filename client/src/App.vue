<script setup>
import socket from '@/socket'

let user = localStorage.getItem('user');

socket.on("connect", () => {
  console.log(socket.id);
})

if(user === undefined) {
  socket.emit('first-connexion', (user) => {
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user))
  })
}

</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>
