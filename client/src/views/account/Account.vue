<script setup>
import {onMounted, ref} from 'vue';
import {Store} from "@/utils/localstorage.js";
import axios from "axios";

const user = ref(null)
const store = new Store()

onMounted(async () => {
  user.value = await store.getUser()
})

</script>
<template>
    <section class="center">
        <div v-if="user">
            Statistiques <br>
          {{ user.name }} <br>
          {{ user.email }} <br>
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

