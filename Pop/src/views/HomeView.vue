<script setup>
import socket from "@/socket.js";
import { RouterLink, RouterView } from 'vue-router'

import {onMounted, onUnmounted, ref} from 'vue';
import {io} from "socket.io-client";
import Navbar from "@/components/Navbar.vue";
import RoomCard from "@/components/RoomCard.vue";
import RoomArea from "@/components/RoomArea.vue";
let roomName = ref('');
let inviteCode = ref('');
let message = ref('');
let shareCode = ref('');
let Privacy = ref(false);
let players = ref([]);
let chats = ref([]);
let publicRooms = ref([]);

onMounted(() => {

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

  socket.on('roomUpdated', (rooms) => {
    console.log(rooms)
    players.value = rooms;
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
  <main>
    <div class="flat_header">

    </div>

    <RoomArea></RoomArea>

    <RoomCard :roomName="'nom de la room'" :creatorName="'nom du créateur'" :types="'test'" />
  </main>





  <button @click="socket.emit('message', 'Hello, world!')">Envoyer un message</button>
  <button @click="socket.emit('createRoom', roomName, Privacy)">Créer un salon</button>
  <input type="checkbox" checked id="private" @change="togglePrivacy" />
  <label for="private">{{ Privacy ? 'Privé' : 'Public' }}</label>

  <button @click="socket.emit('leaveRoom')">Quitter le salon</button>

  <div v-for="player in players" :key="player">
    <router-link :to="`/room/${player}`">{{ player }}</router-link>
  </div>

  <p>Code d'invitation: {{ shareCode }}</p>

  <input v-model="roomName" placeholder="Nom du salon" />
  <input v-model="inviteCode" placeholder="Code d'invitation" />
  <button @click="socket.emit('joinRoom', {inviteCode})">Rejoindre un salon</button>

  <input v-model="message" @keyup.enter="sendMessage" placeholder="Message" />

  <div>
    <p v-for="chat in chats" :key="chat.id">{{ chat }}</p>
  </div>

  <div v-for="room in publicRooms" :key="room">
    <router-link :to="`/room/${room}`">{{ room }}</router-link>
  </div>

</template>

<style scoped>
.flat_header {
  height: 90vh;
  background: url('../assets/images/flat.webp') no-repeat center center/cover;
}
</style>