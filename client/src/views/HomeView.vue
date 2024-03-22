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

    <RoomArea class="areas"></RoomArea>


  </main>







</template>

<style scoped>
.flat_header {
  height: 100vh;
  background: url('../assets/image/flat.webp') no-repeat center center/cover;
}

.areas {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
}
</style>
