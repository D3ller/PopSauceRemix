<script setup>

import Navbar from "@/components/Navbar.vue";
import {onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
import socket from "@/socket.js";
import router from "@/router/index.js";
import {useRoomStore} from "@/stores/counter.js";
let publicRooms = ref([]);
let message = ref('');
let Privacy = ref(false);
let players = ref([]);
const roomStore = useRoomStore();

onMounted(() => {

  watch(() => roomStore.$state, (newState, oldState) => {
    if (newState.createorjoin) {
      socket.emit('createRoom', newState.roomName, newState.privacy);
    } else {
      console.log("Une salle a été rejoins");
    }
  }, {
    deep: true
  });

  socket.on('roomCreated', (room, code) => {
    console.log(room, code);
    router.push({ name: 'Room', params: { id: code } });
  });

  socket.emit('getPublicRooms');

  socket.on('publicRooms', function(publicRoom) {
    publicRooms.value = publicRoom;
    console.log(publicRooms.value);
  })

  socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');
  });

  socket.on('joinedRoom', (room) => {
    alert(`Salon rejoint: ${room}`)
  });

  socket.on('roomJoined', (room) => {
    alert(`Salon rejoint: ${room}`)
  });

  socket.on('roomClosed', (room) => {
    alert(`Salon fermé: ${room}`)
    players.value = [];
    chats.value = [];
  })

  socket.on('roomNotFound', (room) => {
    alert(`Aucun salon avec le code d'invitation: ${room.inviteCode}`)
  })

  socket.on('chatEnter', (chat) => {
    console.log(chat);
    chats.value.push(chat);
    console.log(chats.value)
  });

  socket.on('chatNotFound', () => {
    console.log('Vous ne pouvez pas envoyer de message dans un salon que vous n\'avez pas rejoint');
  });

  socket.on('roomLeft', (room) => {
    players.value = [];
    chats.value = [];
    shareCode.value = '';
  })


  onUnmounted(() => {
    socket.disconnect();
  });
});

function sendMessage() {
  socket.emit('chatEnter', message.value);
  message.value = '';
}

function togglePrivacy() {
  console.log(Privacy.value);
  Privacy.value = !Privacy.value;
}
</script>

<template>

  <Navbar />


  <RouterView />
</template>

<style scoped>
</style>
