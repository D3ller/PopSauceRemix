<script setup>
import { ref } from 'vue';

const user = ref(true);

</script>

<template>
    <section>
        <div v-if="!user">
            Statistiques
        </div>
        <div v-else>
            <a href="/account/register">Créer un compte</a>
            <a href="/account/login">Connexion</a>
        </div>
    </section>
</template>

<style scoped>
    section {
        position: absolute;
    }
</style>