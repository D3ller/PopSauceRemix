<script setup>

import Navbar from "@/components/Navbar.vue";
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import socket from "@/socket.js";
import router from "@/router/index.js";
import { useRoomStore } from "@/stores/counter.js";
const roomStore = useRoomStore();

let publicRooms = ref([]);
let message = ref('');
let players = ref([]);

onMounted(() => {

  function generateToken(length) {
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return token;
  }

  if (!localStorage.getItem('username')) {
    localStorage.setItem('username', `guest${Math.floor(Math.random() * 1000)}`);
  }

  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', generateToken(30));
  }

  watch(() => roomStore.leaveRoom, (newState, oldState) => {
    if (newState === true) {
      console.log(roomStore)
      roomStore.leaveRoom = false;
      socket.emit('leaveRoom', roomStore.roomId, localStorage.getItem('token'));
    }
  });

  watch(() => roomStore.$state, (newState, oldState) => {
    if (newState.createorjoin === true) {

      if (newState.roomName === '' || newState.privacy === '') {
        alert('Veuillez remplir tous les champs')
        return;
      }

      if (newState.roomName.length < 3) {
        alert('Le nom du salon est trop court');
        return;
      }

      socket.emit('createRoom', newState.roomName, newState.privacy, localStorage.getItem('username'), localStorage.getItem('token'));
      roomStore.createorjoin = '';
    }

    if (newState.createorjoin === false) {
      console.log(newState.inviteCode);
      socket.emit('joinRoom', newState.inviteCode, newState.username, localStorage.getItem('token'));
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
    roomStore.roomOwner = room.creator;
    roomStore.roomName = room.name;
    roomStore.players = room.players;
  });

  socket.on('roomCreated', (room, code, userid, id) => {
    console.log(room, code);
    roomStore.userId = userid;
    roomStore.roomId = id;
    router.push({ name: 'Room', params: { id: code } });
  });



  socket.emit('getPublicRooms');

  socket.on('publicRooms', function (publicRoom) {
console.log(publicRoom)
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


  socket.on('alreadyInRoom', (room) => {
    alert('Vous êtes déjà dans ce salon');
    return;
  });
  socket.on('roomNotFound', (room) => {
    alert('Le salon n\'existe pas');
    router.push({ name: 'home' });
  })
  socket.on('roomClosed', (room) => {
    console.log(room)
    alert('ROOM FERME')
    router.push({ name: 'home' });
  })

  socket.on('roomLeft', (room) => {
    alert('Vous avez quitté le salon')
    players.value = [];
    router.push({ name: 'home' });
  })

  socket.on('roomUpdated', (room) => {
    console.log(room);
    roomStore.players = room;
  });

  socket.on('cantCreateRoom', () => {
    alert('Vous ne pouvez pas créer de salon car vous êtes déjà dans un salon');
    return;
  });

  socket.on('roomNameTooShort', () => {
    alert('Le nom du salon est trop court');
    return;
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

<style scoped></style>
