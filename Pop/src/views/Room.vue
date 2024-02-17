<script setup>
import { useRouter, useRoute } from "vue-router";
import { useRoomStore } from "@/stores/counter.js";
import {onMounted, watch} from "vue";

const router = useRouter();
const route = useRoute(); // Utilisez useRoute pour accéder aux paramètres de l'URL
const roomStore = useRoomStore();

const id = route.params.id;

onMounted(() => {
  roomStore.roomInfo = id;

  if (id) {
watch(() => roomStore.roomOwner, (newState, oldState) => {
  if(String(roomStore.userId) === String(newState)){
  } else {
    console.log('joining room')
    roomStore.joinRoom(id, localStorage.getItem('username')); // Assurez-vous que `username` est défini ou récupéré d'une manière appropriée
  }

}, {
  deep: true
})
  }
})

</script>

<template>
Tu es dans la room {{roomStore.roomName}}
  Code d'invitation: {{id}}

  <div v-for="players in roomStore.players">
    <p>{{players.username}}</p>
  </div>
</template>

<style scoped>

</style>