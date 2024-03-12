<script setup>
import router from '@/router';
import { ref } from 'vue';

// import { ref } from 'vue';

    // const user = ref(true);

    const mail = ref('')
    const username = ref('')
    const mdp = ref('')
    const confirm_mdp = ref('')

    const submit = () => {
        const user = {
            mail: mail.value,
            username: username.value,
            mdp: mdp.value,
            confirm_mdp: confirm_mdp.value,
        }
        console.log(user)

        if(user) {
            ('/account')
        }
    }

</script>

<template>
    <form @submit.prevent="submit">
        <input type="mail" placeholder="email" v-model="mail">
        <input type="username" placeholder="username" v-model="username">
        <input type="password" placeholder="mdp" v-model="mdp">
        <input type="password" placeholder="confirm mdp" v-model="confirm_mdp">
        <button>Créer compte</button>
    </form>
</template>

<style scoped>

</style>