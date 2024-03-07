<script setup>
import { ref } from 'vue';
import router from '@/router';
import RoomArea from "@/components/RoomArea.vue";
import socket from "@/socket.js";




</script>

<template>


    <!--rejoindre le salon-->

  <main>
    <div class="flat_header">

    </div>

    <RoomArea></RoomArea>


  </main>







</template>

<style scoped>
.flat_header {
  height: 90vh;
  background: url('../assets/image/flat.webp') no-repeat center center/cover;
}
</style>
