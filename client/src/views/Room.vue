<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import socket from '@/socket';
import { useRoute } from "vue-router";
import SideChatAndPlayers from "@/components/room/SideChatAndPlayers.vue";
import router from "@/router/index.js";
import Trans from "@/i18n/translation.js";
import {useI18n} from "vue-i18n";

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
          router.push(Trans.i18nRoute({ name: 'home' }))
        }
      }
    })

  })

window.onbeforeunload = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  socket.emit('remove-player', user, roomID)

  socket.off('get-players')
  socket.off('get-points')
  socket.off('time-left')
  socket.off('owner')
  socket.off('question')
  socket.off('answer')
  socket.off('game-over')

}

onUnmounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  socket.emit('remove-player', user, roomID)

  socket.off('get-players')
  socket.off('get-points')
  socket.off('time-left')
  socket.off('owner')
  socket.off('question')
  socket.off('answer')
  socket.off('game-over')
})

document.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState === 'hidden') {
    window.onbeforeunload = () => {
      const user = JSON.parse(localStorage.getItem('user'))
      socket.emit('remove-player', user, roomID)

      socket.off('get-players')
      socket.off('get-points')
      socket.off('time-left')
      socket.off('owner')
      socket.off('question')
      socket.off('answer')
      socket.off('game-over')
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

const { t, locale } = useI18n();

</script>

<template>
  <div v-if="!user" class="connexion">
    {{ t('pages.Room.loading') }}
  </div>

  <div class="myroom_area">
    <div class="myroom_area_center">

      <div class="myroom_area_center_content" v-if="answer === null">
      <div>
      <div class="timer_info"><p>{{ t('pages.Room.timeleft') }}</p><span>00:{{timer > 9 ? timer : '0'+timer}}</span></div>
      <div  class="timer_container">
        <div v-if="timer" class="timer" :style="{ width: timer*5 + '%' }"></div>
      </div>
      </div>

        <div v-if="question.type === 'multiple'">
          <div class="question_boxes">
            <div class="questions">
            <p class="question_text">{{ question.question }}</p>
            </div>
          </div>
          <div class="multiple">
      <div v-for="res in question.reponses">
        <button @click="sendResponse(res)" class="multiple_answer" :disabled="check">{{ res }}</button>
      </div>
          </div>
        </div>

      <div v-if="question.type === 'input'">
        <div class="question_boxes">
          <div class="questions">
            <p class="question_text">{{ question.question }}</p>
          </div>
        </div>
        <div class="question_area">
        <input class="enter_input" :placeholder="t('pages.Room.answer')" type="text" @keyup.enter="sendResponse(reponse)" v-model="reponse" />
        </div>
      </div>

      <div v-if="question.type === 'image'" class="question_area">
        <img class="question_image" :src="question.url_image" alt="image" />
        <p class="question">{{ question.question }}</p>
        <input :placeholder="t('pages.Room.answer')" class="enter_input" type="text" v-model="reponse" @keyup.enter="sendResponse(reponse)" />
      </div>

<button v-if="owner && !start" @click="startGame">{{ t('pages.Room.start') }}</button>
    </div>

      <div v-else-if="answer !== null && winner === null" class="answer">
        <h2>{{ t('pages.Room.answeris') }}</h2>
        <h3>{{ answer }}</h3>
      </div>

      <div v-if="winner !== null">
        <p>    {{ t('pages.Room.end') }}</p>
      </div>

    </div>
    <SideChatAndPlayers :player="player" />
  </div>



</template>



<style lang="scss" scoped>
@import "@/assets/scss/_var.scss";


@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

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
  background-color: #cee7ce;
  margin: 10px 20px;
  overflow: hidden;
  border-radius: 20px;
}

.timer {
  height: 100%;
  background-color: #52ca2a;
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
  border-radius: 20px;
}

.question {
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  text-align: center;
  font-family: 'Public Sans', sans-serif;
}

.question_text {
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
  font-weight: 800;
}

.question_area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background-color: white;
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

.question_boxes {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.questions {
  width: 700px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 5px solid #ccc;
}

.answer {
  position: fixed;
  width: calc(100vw - 360px);
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
}

.answer h2 {
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  font-family: 'Public Sans', sans-serif;
}

.answer h3 {
  font-size: 30px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  font-family: 'Public Sans', sans-serif;
}

.myroom_area_center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.myroom_area_center_content {
  z-index: 10;
}

.multiple {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.multiple_answer {
  width: 100%;
  height: 70px;
  border-radius: 10px;
  border: 1px solid #d6d6d642;
  transition: 0.3s background-color ease-in-out, 0.3s border ease-in-out;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-family: $base-font;
  font-weight: 500;
}

.multiple_answer:hover {
  border: 1px solid #c9c9c9;
}

.multiple div:nth-of-type(1) button:disabled {
  background: #e3ffd2;
  color: #54a24e;
}

.multiple div button {
  box-shadow: inset 0 2px 6px 1px #8282825e,inset 0 -3px .5px #55555547;
}

.multiple div button:disabled {
  cursor: not-allowed;
  box-shadow: none;
}

.multiple div:nth-of-type(1) button {
  background: lighten($linear-green, 10%);


}

.multiple div:nth-of-type(2) button {
  background: lighten($linear-blue, 10%);

}

.multiple div:nth-of-type(3) button {
  background: lighten($linear-red, 10%);

}

.multiple div:nth-of-type(4) button {
  background: lighten($linear-purple, 10%);

}

.multiple div:nth-of-type(2) button:disabled {
  background: #d2dfff;
  color: #4e69a2;
}

.multiple div:nth-of-type(2) button:disabled {
  background: #d2dfff;
  color: #4e69a2;
}

.multiple div:nth-of-type(3) button:disabled {
  background: #ffd2e0;
  color: #a24e67;
}

.multiple div:nth-of-type(4) button:disabled {
  background: #e8d2ff;
  color: #704ea2;
}




.multiple_answer:disabled {
  cursor: not-allowed;
}

</style>
