<script setup>
import router from "@/router/index.js";
import {useRoomStore} from "@/stores/counter.js";
const roomStore = useRoomStore();
const id = router.currentRoute.value.params.id;
console.log(id);
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