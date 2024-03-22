<script setup>

</script>

<template>
  <button class="blue_button"><slot></slot></button>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_var.scss";

.blue_button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background: $linear-blue;
  color: white;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: darken($linear-blue, 10%);
  }
}
</style>