<script setup>

</script>

<template>
  <button class="blue_button"><slot></slot></button>
</template>

<style lang="scss" scoped>
.blue_button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background: #0066ff;
  color: white;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: #004de7;
  }
}
</style>