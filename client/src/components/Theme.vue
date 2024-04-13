<script setup>
import {useI18n} from "vue-i18n";

defineProps({
  color: {
    type: String,
    default: 'black'
  }
})

const {t, locale} = useI18n()
</script>

<template>
  <div class="theme" :style="{backgroundColor: color}">
<slot></slot>

    <hr class="bar">

    <p>{{t('theme.20')}}<b><slot></slot></b></p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_var.scss";

.theme {
  width: 350px;
  padding: 20px;
  font-family: $base-font;
  font-weight: 600;
  font-size: $base-font-size;
  border-radius: 20px;
  border: 1px solid rgba(204, 204, 204, 0.39);
  transition: 0.3s;
  cursor: pointer;
}

.bar {
  border: 0;
  height: 1px;
  background: #000000;
  margin-top: 20px;
  margin-bottom: 10px;
}

b {
  color: #000000;
  font-weight: 600;
}
</style>