<template>
  <section>
    <form @submit.prevent="updatetheme" class="theme_edit_form" v-if="data">
      <label for="theme" class="theme_label">
        Theme :
        <input type="text" name="theme" :placeholder="data.nomThemes" v-model="theme">
      </label>
      <label for="theme_en">
        Theme_en :
        <input type="text" name="theme_en" :placeholder="data.enThemes" v-model="theme_en">
      </label>
      <button type="submit">Update</button>
    </form>
  </section>
</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";

const theme = ref()
const theme_en = ref()

const route = useRoute()
const data = ref()

onMounted(async(id) => {
  function getData() {
    const id = route.params.id
    axios.get(`http://localhost:8080/api/themes/${id}`)
        .then(res => {
          data.value = res.data
          // console.log(data.value)
        })
  }
  await getData()
})

function updatetheme() {
  const id = route.params.id
  axios.put(`http://localhost:8080/api/themes/${id}`, {
    nomThemes: theme.value,
    enThemes: theme_en.value,
    image: 'test'
  })
      // .then(() => {
      //   route
      // })
}
</script>

<style scoped>
section {
  height: 100vh;
}
</style>