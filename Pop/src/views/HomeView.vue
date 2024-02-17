<script setup>
import {ref} from 'vue';
import RoomCard from "@/components/RoomCard.vue";
import RoomArea from "@/components/RoomArea.vue";
let shareCode = ref('');
let chats = ref([]);
import {useRoomStore} from "@/stores/counter.js";
const roomStore = useRoomStore();

console.log(roomStore.publicRooms)
</script>

<template>
  <main>
    <div class="flat_header">

    </div>

    <RoomArea></RoomArea>


    <RoomCard v-for="room in roomStore.publicRooms" :roomName="room" :creatorName="'nom du créateur'" :types="'test'" />
  </main>







</template>

<style scoped>
.flat_header {
  height: 90vh;
  background: url('../assets/images/flat.webp') no-repeat center center/cover;
}
</style>