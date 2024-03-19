<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import router from '@/router';
import RoomArea from "@/components/RoomArea.vue";
import socket from "@/socket.js";
let rooms = ref(null)
import Trans from "@/i18n/translation.js";
import RoomCard from "@/components/RoomCard.vue";

onMounted( () => {
socket.emit('get-public-room', (res) => {
  console.log(res)
  rooms.value = res
})
})

socket.on('public-room', (room) => {
  console.log(room)
  rooms.value = room
})

onUnmounted(() => {
  socket.off('public-room')
})

</script>

<template>


    <!--rejoindre le salon-->

  <main>
    <div class="flat_header">

    </div>

    <RoomArea></RoomArea>

    <div v-if="rooms" v-for="room in rooms" :key="room.id">
      <RoomCard :room-name="room.name" :players="room.players === 0 ? 1 : room.players" :room-id="room.id"></RoomCard>
    </div>



  </main>







</template>

<style scoped>
.flat_header {
  height: 90vh;
  background: url('../assets/image/flat.webp') no-repeat center center/cover;
}
</style>
