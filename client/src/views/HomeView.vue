<script setup>
import socket from '@/socket';
import { ref } from 'vue';
import router from '@/router';

let roomName = ref('')
let roomID = ref('')
let privacy = ref(false);
const user = JSON.parse(localStorage.getItem('user'))

function createRoom() {
    let room = {
        name: roomName.value,
        creator: user.name,
        privacy: privacy.value
    }

    if (room.name.value == '' || room.creator == undefined) {
        console.log('erreur', user)
    } else {
        socket.emit('create-room', room, (res) => {
            if(res.type == 'message'){
                router.push(`/room/${res.room.id}`)
            }
        })
    }
}
</script>

<template>

    <!--creer le salon-->

    <form @submit.prevent="createRoom">
        creer un salon
        <input type="text" v-model="roomName">
        <button>creer</button>
    </form>

    <!--rejoindre le salon-->

    <form @submit.prevent="router.push(`/room/${roomID}`)">
        <input type="text" v-model="roomID" />
        <button>rejoindre</button>
    </form>
</template>
