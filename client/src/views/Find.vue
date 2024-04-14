<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import socket from "@/socket.js";
import RoomCard from "@/components/RoomCard.vue";
import {useI18n} from "vue-i18n";

let rooms = ref(null)
let loaded = ref(false)

onMounted( () => {
  console.log('mounted')
  setTimeout(() => {
    socket.emit('get-public-room', (res) => {
      console.log(res + 'res')

      rooms.value = res
      loaded.value = true
    })
  }, 500)
})
</script>

<template>
  <main>
    <div class="flat_header">
      <div class="room_cards_area" v-if="loaded">

        <div v-if="rooms.length > 0" v-for="room in rooms" :key="room.id">

          <RoomCard :room-name="room.name" :players="room.players === 0 ? 1 : room.players" :themes="room.themes" :room-id="room.id"></RoomCard>
        </div>
        <div v-else>
          <p>Aucune salle publique disponible</p>
        </div>
      </div>
    </div>
  </main>


</template>

<style scoped>
.flat_header {
  min-height: 100vh;
  background: url('@/assets/image/flat.webp') center center/cover;
}

.room_cards_area {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 120px 20px 20px;
}
</style>