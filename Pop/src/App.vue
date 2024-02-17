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

  //si la personne n'a pas de usrname dans le localstorage cree un guest username
  if (!localStorage.getItem('username')) {
    localStorage.setItem('username', `guest${Math.floor(Math.random() * 1000)}`);
  }

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

  watch(() => roomStore.roomInfo, (newState, oldState) => {
    if (newState) {
      socket.emit('getRoomInfo', newState);
      roomStore.roomInfo = null;
    }

  });

  socket.on('roomInfo', (room) => {
    console.log(room);
    roomStore.roomOwner = room.creator;
    roomStore.roomName = room.name;
    roomStore.players = room.players;
  });

  socket.on('roomCreated', (room, code, userid) => {
    console.log(room, code);
    roomStore.userId = userid;
    router.push({ name: 'Room', params: { id: code } });
  });

  socket.emit('getPublicRooms');

  socket.on('publicRooms', function(publicRoom) {

roomStore.updatePublicRooms([publicRoom]);
  })

  socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');
  });

  socket.on('roomJoined', (room, code, userid) => {
    roomStore.roomName = room;
    roomStore.userId = userid;
    router.push({ name: 'Room', params: { id: code } });

  });

  socket.on('roomClosed', (room) => {
    players.value = [];
    chats.value = [];
  })

  socket.on('roomNotFound', (room) => {
    router.push({ name: 'home' });
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
    router.push({ name: 'home' });
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
