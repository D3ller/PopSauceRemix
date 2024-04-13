<template>
 <div id="block">
    <header class="header_admin">
    <NavbarAdmin :lien="route.name"></NavbarAdmin>
  </header>
  <div class="right_block">
    <main class="main_admin">
   <h2 class="h2_admin">Modification theme</h2>
  </main>
  <div id="dashbord">
    <div id="formulaire_question">
            <div class="form-box">
              <form class="form" @submit.prevent="updatetheme" v-if="data">
                <button @click="closeForm" class="button_close">
                  <span class="X"></span>
                  <span class="Y"></span>
                </button>
                <span class="title">Modifer le thème</span>
                <span class="subtitle">Veuillez remplir le formulaire pour modifier le thème.</span>
                <div class="form-container">
                <label for="theme" class="theme_label">
                Theme :
        <input class="form_input" type="text" name="theme" :placeholder="data.nomThemes" v-model="theme" required>
      </label>
      <label for="theme_en">
        Theme_en :
        <input class="form_input" type="text" name="theme_en" :placeholder="data.enThemes" v-model="theme_en" required>
      </label>
      </div>          
      <button @click="updatetheme" class="Button_edit">Modifier
        <svg class="svg" viewBox="0 0 512 512">
          <path
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
          </path>
        </svg>
      </button>
    </form>
    
</div>
  </div>
</div>
</div>
</div>
</template>

<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";
const emit = defineEmits(['refresh'])
const theme = ref()
const theme_en = ref()
const router = useRouter();
const route = useRoute()
const data = ref()


onMounted(async(id) => {
  function getData() {
    const id = route.params.id
    axios.get(`http://apiplateform.karibsen.fr/api/themes/${id}`)
        .then(res => {
          data.value = res.data
          // console.log(data.value)
        })
  }
  await getData()
})

function updatetheme() {
  if (!theme.value || !theme_en.value) {
    
    return; 
  }
  console.log(theme.value, theme_en.value)
  const id = route.params.id
  axios.put(`http://apiplateform.karibsen.fr/api/themes/${id}`, {
    nomThemes: theme.value,
    enThemes: theme_en.value,
    image: data.value.image
    
  })
  .then(() => {
        emit('refresh');
        
      })
      router.push({ name: 'themes' });
}
function closeForm() {
  router.push({ name: 'themes' });
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/admin.scss";
section {
  height: 100vh;
}

.right_block {
  width: 75%;
  position: absolute;
  right: 0;
}
.error-message {
  color: red;
  margin-top: 5px;
  
}

</style>