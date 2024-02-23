<script setup>
import { onMounted } from 'vue';
import socket from '@/socket';
import { useRoute } from "vue-router";

const route = useRoute()

const roomID = route.params.id

onMounted(async () => {
    const roomID = route.params.id
    const user = await JSON.parse(localStorage.getItem('user'))
    console.log(user)
    await socket.emit('add-player', user, roomID)
})

</script>

<template>
    {{ roomID }}
</template>