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

onMounted(async () => {
    const user = await JSON.parse(localStorage.getItem('user'))
    console.log(user)
    console.log(roomID)
    await socket.emit('add-player', user, roomID)
})

onUnmounted(() => {
    socket.emit('remove-player', roomID)
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
    check.value = true
  });

}

</script>

<template>
  <div class="myroom_area">
    <div>
      {{ roomID }}

      <div v-if="player !== null">
        <div v-for="p in player" :key="p.id">
          <p>{{ p.name }}</p>
        </div>
      </div>

      <p>{{ question.question }}</p>

      <div v-if="!check" v-for="res in question.reponses">
        <button @click="sendResponse(res)">{{ res }}</button>
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
</style>
