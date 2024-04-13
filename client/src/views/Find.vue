<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import socket from "@/socket.js";
import RoomCard from "@/components/RoomCard.vue";

let rooms = ref(null)

onMounted( () => {
  console.log('mounted')
  socket.emit('get-public-room', (res) => {
    console.log(res + 'res')
    rooms.value = res
  })
})

onUnmounted(() => {
  socket.off('public-room')
})
</script>

<template>



  <div class="room_cards_area">
    {{rooms}}
    <div v-if="rooms" v-for="room in rooms" :key="room.id">
      <RoomCard :room-name="room.name" :players="room.players === 0 ? 1 : room.players" :room-id="room.id"></RoomCard>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>