<script setup>
// Import
import {onMounted, onUnmounted, ref} from 'vue';
import socket from '@/socket';
import { useRoute } from "vue-router";
import SideChatAndPlayers from "@/components/room/SideChatAndPlayers.vue";

// Variables
let roomID = useRoute().params.id
let player = ref([])
let owner = ref(false)
let start = ref(false)
let question = ref('')
let check = ref(false)
let reponse = ref('')


  onMounted(async () => {
    while (!user) {
      console.log('tentative de connexion')
      user = JSON.parse(localStorage.getItem('user'));
      await new Promise(resolve => setTimeout(resolve, 500)); // Adjust the delay as needed
    }

    await socket.emit('add-player', user, roomID)


  })

onUnmounted( () => {
  const user = JSON.parse(localStorage.getItem('user'))
    socket.emit('remove-player', user, roomID)
})

socket.on('get-players', (players) => {
    player.value = players
})

socket.on('owner', (isOwner) => {
    owner.value = true
})

function startGame() {
  socket.emit('start-game', roomID);
  start.value = true;
}

socket.on('question', (questions) => {
  question.value = questions;
  check.value = false;
});

let user = JSON.parse(localStorage.getItem('user'))
function sendResponse(res) {

  console.log(res)
  socket.emit('reponse', res, roomID, user, (res) => {
    console.log(res)

    if(question.type === "input") {
      reponse.value = ''
      return
    }

    check.value = true
    reponse.value = ''

    if(res === "message") {

    }
  });

}

</script>

<template>
  <div v-if="!user" class="connexion">
    connexion en cours
  </div>

  <div class="myroom_area">
    <div>
      {{ roomID }}

      <div v-if="player !== null">
        <div v-for="p in player" :key="p.id">
          <p>{{ p.name }}</p>
        </div>
      </div>

      <p>{{ question.question }}</p>

      <div v-if="question.type === 'multiple'" v-for="res in question.reponses">
        <button @click="sendResponse(res)" :disabled="check">{{ res }}</button>
      </div>

      <div v-if="question.type === 'input'">
        <input type="text" v-model="reponse" />
        <button @click="sendResponse(reponse)">Envoyer</button>
      </div>

      <div v-if="question.type === 'image'">
        <img :src="question.url_image" alt="image" width="300px" />
        <input type="text" v-model="reponse" @keyup.enter="sendResponse(reponse)" />
        <button @click="sendResponse(reponse)" :disabled="check">Envoyer</button>
      </div>

<button v-if="owner && !start" @click="startGame">Start</button>
    </div>
    <SideChatAndPlayers :player="player" />
  </div>
</template>



<style scoped>
.myroom_area {
  display: grid;
  grid-template-columns: calc(100% - 360px) 360px;
}

.connexion {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
