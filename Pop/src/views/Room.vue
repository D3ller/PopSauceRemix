<script setup>
import { useRouter, useRoute } from "vue-router";
import { useRoomStore } from "@/stores/counter.js";
import {onMounted, onUnmounted, watch} from "vue";
import SideChatAndPlayers from "@/components/room/SideChatAndPlayers.vue";

const router = useRouter();
const route = useRoute(); // Utilisez useRoute pour accéder aux paramètres de l'URL
const roomStore = useRoomStore();

const id = route.params.id;


onMounted(() => {
  roomStore.roomInfo = id;
console.log(roomStore.players)


  watch(() => roomStore.players, (newState, oldState) => {
    console.log(newState)

    //regarde si le token est le même que celui d'un des joueurs
    if (newState.some(player => player.token === localStorage.getItem('token'))) {
      alert('tu es dans la room')
    } else {
alert('tu n\'es pas dans la room')
    }

  }, {
    deep: true
  });
})

onUnmounted(() => {
  roomStore.leave();
})
</script>

<template>
  <div class="myroom_area">
  <div>
Tu es dans la room {{roomStore.roomName}}
  Code d'invitation: {{id}}

  <div v-for="players in roomStore.players">
    <p>{{players.username}}</p>
  </div>


  <button @click="roomStore.leave()">Quitter la room</button>
  </div>
  <side-chat-and-players :player="roomStore.players"></side-chat-and-players>
  </div>
</template>

<style scoped>
.myroom_area {
  display: grid;
  grid-template-columns: calc(100% - 360px) 360px;
}
</style>