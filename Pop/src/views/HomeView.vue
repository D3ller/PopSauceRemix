<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {onMounted, onUnmounted, ref} from 'vue';
import Navbar from "@/components/Navbar.vue";
import RoomCard from "@/components/RoomCard.vue";
import RoomArea from "@/components/RoomArea.vue";
import router from "@/router/index.js";
let roomName = ref('');
let inviteCode = ref('');
let message = ref('');
let shareCode = ref('');
let Privacy = ref(false);
let players = ref([]);
let chats = ref([]);
import {useRoomStore} from "@/stores/counter.js";
const roomStore = useRoomStore();

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