<script setup>
import router from '@/router';
import { ref } from 'vue';

// import { ref } from 'vue';
import axios from 'axios';

    // const user = ref(true);

    const mail = ref('')
    const username = ref('')
    const mdp = ref('')
    const confirm_mdp = ref('')
    const alreadyExist = ref(false)

    const createAccount = () => {
        const user = {
            mail: mail.value,
            username: username.value,
            mdp: mdp.value,
        }
    
        if(mdp.value != confirm_mdp.value) {
            console.log('pas les mêmes mdps')
            return;
        }

        axios.get('http://localhost:8080/api/users')
            .then(res => {
                const userExist = res.data["hydra:member"].find(u => u.email === user.mail)
                if(userExist) {
                    alreadyExist.value = true
                    console.log('user already exist')
                } else {
                    axios.post('http://localhost:8080/api/users', {
                        "pseudo": user.username,
                        "mdp": user.mdp,
                        "email": user.mail,
                    })

                    // private key a passer dans un .env plus tard 

                    const privateKey = 'privatekey'
                    var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
                        console.log(token);
                    });

                    document.cookie = `Token=${token};Max-Age=60`

                    router.push('/account')
                }
            })
    }

    const test = () => {
        const privateKey = 'privatekey'
            var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
            console.log(token);
        });
    }

</script>

<template>
    <form @submit.prevent="createAccount">
        <input type="mail" placeholder="email" v-model="mail">
        <input type="username" placeholder="username" v-model="username">
        <input type="password" placeholder="mdp" v-model="mdp">
        <input type="password" placeholder="confirm mdp" v-model="confirm_mdp">
        <button>Créer compte</button>
    </form>

    <button @click="test">test</button>
</template>

<style scoped>

</style>