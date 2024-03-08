<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import socket from '@/socket';
import { useRoute } from "vue-router";
import SideChatAndPlayers from "@/components/room/SideChatAndPlayers.vue";
import router from "@/router/index.js";

let roomID = useRoute().params.id
let player = ref([])
let owner = ref(false)
let start = ref(false)
let question = ref('')
let check = ref(false)
let reponse = ref('')
let timer = ref(0)
let points = ref(null)
let answer = ref(null)
let winner = ref(null)


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

document.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState === 'hidden') {
    window.onbeforeunload = () => {
      const user = JSON.parse(localStorage.getItem('user'))
      socket.emit('remove-player', user, roomID)
    }

  }

})

socket.on('get-players', (players) => {
  console.log(players)
    player.value = players
})

socket.on('get-points', (point) => {
console.log(point)
  player.value = point
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
  answer.value = null
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

socket.on('answer', (answers) => {
  answer.value = answers
})

socket.on('game-over', (win) => {
  console.log(win)
  winner.value = win
})
</script>

<template>
  <div v-if="!user" class="connexion">
    connexion en cours
  </div>

  <div class="myroom_area">
    <div>
      {{ roomID }}

      <div v-if="answer === null">
      <p>{{ question.question }}</p>

      <div>
      <div class="timer_info"><p>Temps restants</p><span>00:{{timer > 9 ? timer : '0'+timer}}</span></div>
      <div  class="timer_container">
        <div v-if="timer" class="timer" :style="{ width: timer*5 + '%' }"></div>
      </div>
      </div>

      <div v-if="question.type === 'multiple'" v-for="res in question.reponses">
        <button @click="sendResponse(res)" :disabled="check">{{ res }}</button>
      </div>

      <div v-if="question.type === 'input'">
        <input type="text" @keyup.enter="sendResponse(reponse)" v-model="reponse" />
      </div>

      <div v-if="question.type === 'image'" class="question_area">
        <img class="question_image" :src="question.url_image" alt="image" />
        <p class="question">{{ question.question }}</p>
        <input placeholder="Ecrive la réponse" class="enter_input" type="text" v-model="reponse" @keyup.enter="sendResponse(reponse)" />
      </div>

<button v-if="owner && !start" @click="startGame">Start</button>
    </div>

      <div v-else-if="answer !== null && winner === null">
        <p>La réponse est : {{ answer }}</p>
      </div>

      <div v-if="winner !== null">
        <p>La partie est terminée</p>
      </div>


    </div>
    <SideChatAndPlayers :player="player" />
  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');

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

.timer_container {
  height: 10px;
  background-color: #dbe5db;
  margin: 10px 20px;
  overflow: hidden;
  border-radius: 20px;
}

.timer {
  height: 100%;
  background-color: #121712;
  border-radius: 20px;
  transition: width 1s linear;

}

.timer_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  font-family: 'Lexend', sans-serif;
  font-weight: 500;
}


.question_image {
  width: 700px;
  height:450px;
  border: 7px solid #e5e5e5;
}

.question {
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  text-align: center;
  font-family: 'Public Sans', sans-serif;
}

.question_area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.enter_input {
  padding: 15px;
  border: 1px solid #D7D7D9;
  border-radius: 5px;
  font-size: 14px;
  background-color: #F5F5F7;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  width: 400px;
  margin-top: 20px;

}

.enter_input:focus {
  outline: none;
}

.enter_input::placeholder {
  font-size: 14px;
  font-weight: 500;
  color: #4b5d4b;
  font-family: Raleway, sans-serif;
}

</style>
