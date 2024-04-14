<script setup>
import {onMounted, ref} from 'vue';
import {Store} from "@/utils/localstorage.js";
import axios from "axios";
import socket from "@/socket.js";

const user = ref(null)

onMounted(async () => {

  if (localStorage.getItem('user')) {
    // localStorage.setItem('user', JSON.stringify(user.value))
    user.value = JSON.parse(localStorage.getItem('user'))
    console.log(user.value)
  }
})

</script>
<template>
    <section class="center">
        <div v-if="user" class="accounts">
            <h1>Statistiques</h1>
          <img width="100" height="100" src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="pp">
          <p>{{ user.name }}</p>
          <p>{{ user.email }}</p>
          <p>Nombre de victoire: </p>
        </div>
        <div v-else class="account">
            <a href="/fr/account/register">Créer un compte</a>
            <a href="/fr/account/login">Connexion</a>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_var.scss";
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 500px;
    }

    .account {
        margin: 30px;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: #222222;
        border-radius: 10px;
    }

    .accounts {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      color: black;
      border-radius: 10px;
      margin-top: 20px;
      font-family: Inter, sans-serif;
      gap: 20px;
      width: 450px;
      border: 1px solid #ccc;

      img {
        border-radius: 50%;
      }
    }

    .account a {
        font-family: $base-font;
        font-weight: 600;
        display: flex;
        text-decoration: none;
        text-align: center;
        margin: 15px;
        color: aliceblue;
        font-size: 20px;

        transition: transform 0.3s; /* Transition pour un effet fluide */
    }

    .account a:hover {
        transform: scale(1.1); /* Zoom de 10% au survol */
    }
</style>

