<script setup>
import router from '@/router';
import { ref } from 'vue';
import Trans from "@/i18n/translation.js";

// import { ref } from 'vue';

    // const user = ref(true);

    const mail = ref('')
    const username = ref('')
    const mdp = ref('')
    const confirm_mdp = ref('')

    const submit = () => {
        const user = {
            mail: mail.value,
            mdp: mdp.value,
        }
        console.log(user)

        if(user) {
            router.push(Trans.i18nRoute({ name: 'account' }))
        }
    }

</script>

<template>
    <form @submit.prevent="submit">
        <input type="mail" placeholder="email" v-model="mail">
        <input type="password" placeholder="mdp" v-model="mdp">
        <button>Connexion</button>
    </form>
</template>

<style scoped>

</style>