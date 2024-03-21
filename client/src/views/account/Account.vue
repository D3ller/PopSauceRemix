<script setup>
import { ref } from 'vue';

const user = ref(true);

</script>
<template>
    <section class="center">
        <div v-if="!user">
            Statistiques
        </div>
        <div v-else class="account">
            <a href="/account/register">Créer un compte</a>
            <a href="/account/login">Connexion</a>
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
        text-decoration: none   ;
        text-align: center;
        margin: 10px;
        color: aliceblue;


    }
</style>