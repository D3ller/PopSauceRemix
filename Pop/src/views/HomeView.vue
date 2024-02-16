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
let publicRooms = ref([]);


</script>

<template>
  <main>
    <div class="flat_header">

    </div>

    <RoomArea></RoomArea>

    <RoomCard :roomName="'nom de la room'" :creatorName="'nom du créateur'" :types="'test'" />
  </main>







</template>

<style scoped>
.flat_header {
  height: 90vh;
  background: url('../assets/images/flat.webp') no-repeat center center/cover;
}
</style>