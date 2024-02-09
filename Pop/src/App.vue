<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import {onMounted, onUnmounted, ref} from 'vue';
import socket from './socket';
import {io} from "socket.io-client";
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
  })

    socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');
  });

  socket.on('roomCreated', (room, code) => {
    alert(`Salon créé: ${room}`)
    shareCode.value = code;
  });

  socket.on('joinedRoom', (room) => {
    alert(`Salon rejoint: ${room}`)
  });

  socket.on('alreadyInRoom', (room) => {
    alert(`Vous êtes déjà dans le salon: ${room}`)
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
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
