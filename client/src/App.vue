<script setup>
import TheWelcome from './components/TheWelcome.vue'
import socket from '@/socket'

let user = localStorage.getItem('user');

socket.on("connect", () => {
  console.log(socket.id);
})

if(user == undefined) {
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
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
