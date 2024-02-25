<script setup>
import {onMounted, ref} from 'vue';
import socket from '@/socket';
import { useRoute } from "vue-router";
import SideChatAndPlayers from "@/components/room/SideChatAndPlayers.vue";
let roomID = useRoute().params.id
let player = ref([])
let owner = ref(false)

onMounted(async () => {
    const user = await JSON.parse(localStorage.getItem('user'))
    console.log(user)
    console.log(roomID)
    await socket.emit('add-player', user, roomID)

})

socket.on('get-players', (players) => {
    player.value = players
})

socket.on('owner', (isOwner) => {
    owner.value = true
})

function startGame() {
    socket.emit('start-game', roomID)
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

      <button v-if="player.length > 1 && owner" class="btn btn-primary" @click="startGame()">Start Game</button>
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
