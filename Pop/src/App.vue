<script setup>

import Navbar from "@/components/Navbar.vue";
import {onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
import socket from "@/socket.js";
import router from "@/router/index.js";
import {useRoomStore} from "@/stores/counter.js";
const roomStore = useRoomStore();

let publicRooms = ref([]);
let message = ref('');
let players = ref([]);

onMounted(() => {

  watch(() => roomStore.$state, (newState, oldState) => {
    if (newState.createorjoin === true) {
      socket.emit('createRoom', newState.roomName, newState.privacy, 'kora');
      roomStore.createorjoin = '';
    }

    if(newState.createorjoin === false){
      console.log(newState.inviteCode);
      socket.emit('joinRoom', newState.inviteCode, newState.username);
      roomStore.createorjoin = '';
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

roomStore.updatePublicRooms([publicRoom]);
  })

  socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');
  });

  socket.on('roomJoined', (room, code) => {
    alert(`Salon rejoint: ${room}`)
    roomStore.roomName = room;
    router.push({ name: 'Room', params: { id: code } });

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

  socket.on('roomUpdated', (room) => {
    console.log(room);
    roomStore.players = room;
  });


  onUnmounted(() => {
    socket.disconnect();
  });
});

function sendMessage() {
  socket.emit('chatEnter', message.value);
  message.value = '';
}


</script>

<template>

  <Navbar />


  <RouterView />
</template>

<style scoped>
</style>
