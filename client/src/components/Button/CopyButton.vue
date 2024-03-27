<script setup>
defineProps({
  link: {
    type: String,
    default: '',
    required: true
  }
})

function copyIn(link) {
  navigator.clipboard.writeText(link)
}
</script>

<template>
<input class="copyInput" type="button" @click="copyIn(link)" :value="link" />
</template>

<style scoped>
.copyInput {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  background: #ffffff;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid #ccc;
  color: #7a7a7a;
}
</style>