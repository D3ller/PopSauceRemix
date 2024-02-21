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
console.log(roomStore.players)

  //regarde quand player se met à jour
  watch(() => roomStore.players, (newState, oldState) => {
    console.log(newState)
  }, {
    deep: true
  });
})

</script>

<template>
Tu es dans la room {{roomStore.roomName}}
  Code d'invitation: {{id}}

  <div v-for="players in roomStore.players">
    <p>{{players.username}}</p>
  </div>

  <button>Quitter la room</button>
</template>

<style scoped>

</style>