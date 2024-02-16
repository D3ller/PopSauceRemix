<script setup>
import {onMounted} from "vue";
import {onBeforeRouteLeave, onBeforeRouteUpdate} from "vue-router";
import router from "@/router/index.js";

const id = router.currentRoute.value.params.id;
console.log(id);
</script>

<template>

</template>

<style scoped>

</style>