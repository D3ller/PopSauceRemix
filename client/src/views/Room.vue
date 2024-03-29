<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import socket from '@/socket';
import { useRoute } from "vue-router";
console.log(useRoute())
import SideChatAndPlayers from "@/components/room/SideChatAndPlayers.vue";
import router from "@/router/index.js";
import Trans from "@/i18n/translation.js";
import {useI18n} from "vue-i18n";
import Theme from "@/components/Theme.vue";
import BlueButton from "@/components/Button/BlueButton.vue";
import CopyButton from "@/components/Button/CopyButton.vue";
let origin = ref(null)

onMounted(() => {
  origin.value = window.location.href
})

let roomID = useRoute().params.id
let player = ref([])
let owner = ref(false)
let start = ref(false)
let question = ref('')
let check = ref(false)
let reponse = ref('')
let timer = ref(null)
let points = ref(null)
let answer = ref(null)
let winner = ref(null)
let good = ref(true)
let waiting = ref(false)

let selected = ref(null)


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

      document.title = `Dans la salle ${res.room.name} - QPUB`

      socket.emit('get-rooms-info', roomID, (res) => {
        console.log(res)
        waiting.value = res
      })
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
  waiting.value = true
})

function startGame() {
  socket.emit('choose-theme', selected, roomID, (res) => {
    console.log(res)
  })

  setTimeout(() => {
    socket.emit('start-game', roomID);
    start.value = true;
  }, 50)
}

socket.on('question', (questions) => {
  waiting.value = true
  answer.value = null
  good.value = true
  reponse.value = ''
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

    if(res.type === "message") {
      console.log('message')
  good.value = false
      reponse.value = ''

    }
  });

}

socket.on('answer', (answers) => {
  answer.value = answers
  timer.value = null
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

  <div v-if="!waiting && !owner" class="waiting">
    <p class="waiting_title">Le propriétaire est entrain de configurer la room</p>
  </div>

  <div class="myroom_area">
    <div class="myroom_area_center">

      <div v-if="owner && !start && !waiting">

        <h1 class="main-title">Choissisez votre thème</h1>

        <div class="theme_container">
          <Theme  @click="selected = 'B'" :color="selected === 'B' ? '#6363ff' : '#9595ff'">
            Biodiversité
          </Theme>

          <Theme @click="selected = 'Eg'" :color="selected === 'Eg' ? '#ff4242' : '#ff6565'">
            Eco-geste
          </Theme>

          <Theme @click="selected = 'Er'" :color="selected === 'Er' ? '#7cff4e' : '#abff8e'">
            Energie Renouvlable
          </Theme>

          <Theme @click="selected = 'Et'" :color="selected === 'Et' ? '#9f5aff' : '#be92fd'">
            Eco-transports
          </Theme>



        </div>

        <BlueButton v-if="selected"  @click="startGame">{{ t('pages.Room.start') }}</BlueButton>

        <hr class="main-hr">

        <h2 class="submain-title">Partager votre lien avec vos amis</h2>

        <CopyButton v-if="origin" :link="`${origin}`" />

      </div>

      <div class="myroom_area_center_content" v-if="answer === null">
        <Transition name="fade">
      <div v-if="timer && question">
      <div class="timer_info"><p>{{ t('pages.Room.timeleft') }}</p><span>00:{{timer > 9 ? timer : '0'+timer}}</span></div>
      <div  class="timer_container">
        <div v-if="timer" class="timer" :style="{ width: timer*5 + '%' }"></div>
      </div>
      </div>
        </Transition>

        <div v-if="!question && timer" class="waiting_2">
          <p class="waiting_title">Attendez que la question suivante arrive pour rejoindre</p>
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
        <input v-if="good" class="enter_input" :placeholder="t('pages.Room.answer')" type="text" @keyup.enter="sendResponse(reponse)" v-model="reponse" />
        </div>
      </div>

      <div v-if="question.type === 'image'" class="question_area">
        <img class="question_image" :src="question.url_image" alt="image" />
        <p class="question">{{ question.question }}</p>
        <input v-if="good" :placeholder="t('pages.Room.answer')" class="enter_input" type="text" v-model="reponse" @keyup.enter="sendResponse(reponse)" />
        <p v-else class="good_answer">{{ t('pages.Room.answered') }}</p>
      </div>

    </div>

      <div v-else-if="answer !== null && winner === null" class="answer">
        <h2>{{ t('pages.Room.answeris') }}</h2>
        <h3>{{ answer }}</h3>
      </div>

      <div v-if="winner !== null">
        <p>    {{ t('pages.Room.end') }}</p>
      </div>

    </div>
    <SideChatAndPlayers :player="player" :rooms="roomID" />
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
  min-height: 100vh;
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
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: black;

  h3 {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    font-family: 'Raleway', sans-serif;
  }

  h2 {
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    font-family: 'Raleway', sans-serif;
  }
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
  height: 50px;
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

.theme_container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.main-title {
  font-size: 35px;
  font-weight: 700;
  color: #000;
  font-family: $base-font;
  margin-bottom: 20px;
}

.submain-title {
  font-size: 25px;
  font-weight: 700;
  color: #000;
  font-family: $base-font;
  margin-bottom: 20px;
}

.main-hr {
  margin: 20px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.waiting_2 {
  width: calc(100vw - 360px);
  height: 100vh;
  background-color: rgba(124, 124, 124, 0.4);
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: column;

  .waiting_title {
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 22px;
    color: #000000;
    text-align: center;
  }
}

.waiting {
  position: fixed;
  width: calc(100vw - 360px);
  height: 100vh;
  background-color: rgba(124, 124, 124, 0.4);
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: column;

  .waiting_title {
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 22px;
    color: #000000;
    text-align: center;
  }
}

.good_answer {
  margin-top: 20px;
}
</style>
