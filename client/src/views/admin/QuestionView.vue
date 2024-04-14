<template>
  <div id="block">
    <header class="header_admin">
      <NavbarAdmin :lien="route.name"></NavbarAdmin>
    </header>
    <div class="right_block">
      <main class="main_admin">
        <h2 class="h2_admin">{{ t('pages.modify_question_page.header_title') }}</h2>
      </main>
      <div id="dashbord">
        <div id="formulaire_question">
          <div class="form-box">
            <form class="form" @submit.prevent="updatetheme" v-if="data">
              <button @click="closeForm" class="button_close">
                <span class="X"></span>
                <span class="Y"></span>
              </button>
              <span class="title">{{ t('pages.modify_question_page.form_title') }}</span>
              <span class="subtitle">{{ t('pages.modify_question_page.form_subtitle') }}</span>
              <div class="form-container">
                <input class="form_input" type="text" v-model="question" :placeholder="data.question" name="question">
                <input class="form_input" type="text" v-model="question_en" :placeholder="data.question_en" name="question_en">
                <input class="form_input" type="text" v-model="reponse_1" :placeholder="data.reponse_1" name="reponse1">
                <input class="form_input" type="text" v-model="reponse_1_en" :placeholder="data.reponse_1_en" name="reponse1_en">
                <div class="conteneur_checkbox">
                  <div>
                    <input type="checkbox" v-model="plusieur_question" name="plusieur_question" value="plusieur_question">
                    <label for="plusieur_question">{{ t('pages.modify_question_page.multiple_answers_label') }}</label>
                  </div>
                  <div>
                    <input type="checkbox" v-model="image_question" name="image_question" value="image_question">
                    <label for="image_question">{{ t('pages.modify_question_page.image_label') }}</label>
                  </div>
                </div>
                <div v-if="plusieur_question">
                  <!-- Additional inputs for multiple answers -->
                </div>
                <div v-if="image_question">
                  <input class="form_input" type="file" accept="image/png" @change="handleImageUpload" :placeholder="data.image" name="image">
                </div>
                <select name="theme" id="theme" v-model="theme">
                  <option value="">{{ t('pages.modify_question_page.select_theme_prompt') }}</option>
                  <template v-for="theme in data_themes">
                    <option v-if="theme.nomThemes" :value="theme['@id']">{{ theme.nomThemes }}</option>
                  </template>
                </select>
              </div>
              <button @click="updatetheme" class="Button_edit">{{ t('pages.modify_question_page.edit_button_text') }}
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
   import {useI18n} from "vue-i18n";
   const emit = defineEmits(['refresh'])
const question = ref('')
const question_en = ref('')
const reponse_1 = ref('')
const reponse_1_en = ref('')
const reponse_2 = ref('')
const reponse_2_en = ref('')
const reponse_3 = ref('')
const reponse_3_en = ref('')
const reponse_4 = ref('')
const reponse_4_en = ref('')
const bonne_reponse = ref('')
const good_reponse = ref('')
   const { t } = useI18n();
const theme = ref('')
const imageData = ref()
const data_themes = ref()
const plusieur_question =ref( false)
const image_question =ref (false)
   const router = useRouter();
   const route = useRoute()
   const data = ref()
   const fields = [
  { value: question, dataKey: 'question' },
  { value: question_en, dataKey: 'question_en' },
  { value: reponse_1, dataKey: 'reponse_1' },
  { value: reponse_1_en, dataKey: 'reponse_1_en' },
  { value:theme, dataKey: 'themes'},
    { value: reponse_2, dataKey: 'reponse_2' },
    { value: reponse_2_en, dataKey: 'reponse_2_en' },
    { value: reponse_3, dataKey: 'reponse_3' },
    { value: reponse_3_en, dataKey: 'reponse_3_en' },
    { value: reponse_4, dataKey: 'reponse_4' },
    { value: reponse_4_en, dataKey: 'reponse_4_en' },
    { value: bonne_reponse, dataKey: 'bonneReponse' },
    { value: good_reponse, dataKey: 'bonneReponseEn' },
    { value: imageData, dataKey: 'image' },
]
  

   
   onMounted(async(id) => {
     function getData() {
       const id = route.params.id
       axios.get(`https://apiplateform.karibsen.fr/api/questions/${id}`)
           .then(res => {
             data.value = res.data
           })
     }
     await getData()
   })
   
   onMounted(() => {
     getData_themes()
   })
   function getData_themes(){
  axios.get('https://apiplateform.karibsen.fr/api/themes')
      .then(res => {
        data_themes.value = res.data["hydra:member"]
      })
 
}
   function updatetheme() {
    fields.forEach(field => {
  if (!field.value.value) {
    field.value.value = data.value[field.dataKey];
  }
  console.log(field.value.value)
});
     
     const id = route.params.id
     axios.put(`https://apiplateform.karibsen.fr/api/questions/${id}`, {
         question: question.value,
         questionEn: question_en.value,
         reponse1: reponse_1.value,
         reponse1En: reponse_1_en.value,
         reponse2: reponse_2.value,
         reponse2En: reponse_2_en.value,
         reponse3: reponse_3.value,
         reponse3En: reponse_3_en.value,
         reponse4: reponse_4.value,
         reponse4En: reponse_4_en.value,
         image: imageData.value,
         bonneReponse: bonne_reponse.value,
         bonneReponseEn: good_reponse.value,
         themes: theme.value
     })
     .then(() => {
        emit('refresh');
        
      })
         router.push({ name: 'question' });
   }
   function closeForm() {
     router.push({ name: 'question' });
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