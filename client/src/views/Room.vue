<script setup>
// Import
import {onMounted, onUnmounted, ref} from 'vue';
import socket from '@/socket';
import { useRoute } from "vue-router";
import SideChatAndPlayers from "@/components/room/SideChatAndPlayers.vue";
import router from "@/router/index.js";

// Variables
let roomID = useRoute().params.id
let player = ref([])
let owner = ref(false)
let start = ref(false)
let question = ref('')
let check = ref(false)
let reponse = ref('')
let timer = ref(null)


  onMounted(async () => {
    while (!user) {
      console.log('tentative de connexion')
      user = JSON.parse(localStorage.getItem('user'));
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    await socket.emit('add-player', user, roomID, (res) => {
      console.log(res.type)

      if(res.type === 'error') {
        console.log(res.error)
        if(res.code === 404) {
          router.push('/')
        }
      }
    })

  })

window.onbeforeunload = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  socket.emit('remove-player', user, roomID)
}

onUnmounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  socket.emit('remove-player', user, roomID)
})


socket.on('get-players', (players) => {
  console.log(players)
    player.value = players
})

socket.on('time-left', (time) => {

  timer.value = time
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
  console.log(questions)
  check.value = false;
});

let user = JSON.parse(localStorage.getItem('user'))
function sendResponse(res) {

  console.log(res)
  socket.emit('reponse', res, roomID, user, (res) => {
    console.log('reponse :',  res)

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

      <span v-if="timer !== null">{{ timer }}</span>

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
