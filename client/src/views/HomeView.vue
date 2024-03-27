<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import router from '@/router';
import RoomArea from "@/components/RoomArea.vue";
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
