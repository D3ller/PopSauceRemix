<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import AddItem from "@/components/Admin/AddItem.vue";
import AddQuestion from "@/components/Admin/AddQuestion.vue";
import ValideCard from "@/components/Admin/ValideCard.vue";
import {useI18n} from "vue-i18n";
const route = useRoute();
const data = ref();
const showform = ref(false);
const reponse = ref('');
const data_themes = ref();
const originalData = ref();
const filteredData = ref();
const {t} = useI18n();
// const showformUpdate = ref(false)
// const theme = ref('')
// const theme_en =ref()
console.log(route)
onMounted(() => {
  getData()
  getData_theme()
  
})
function handleDelete(id) {
  const result = confirm("Es-tu sûr de vouloir supprimer ?");
  if (result) {
    axios.delete(`https://apiplateform.karibsen.fr/api/valid_questions/${id}`)
        .then(() => {
          getData();
        })
        .catch(error => {
          console.error("Erreur lors de la suppression :", error);
        });
  }
}
const getData = () => {
  axios.get('https://apiplateform.karibsen.fr/api/valid_questions')
    .then(res => {
      data.value = res.data["hydra:member"];
      originalData.value = data.value;
      filteredData.value = data.value;
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
    });
    console.log(filteredData)
};
console.log(originalData)
const getData_theme = () => {
  axios.get('https://apiplateform.karibsen.fr/api/themes')
      .then(res => {
        data_themes.value = res.data["hydra:member"]
      })
    
}
const updateFilter = () => {
  filteredData.value = originalData.value.filter(question => {
    return (
      question.question.toLowerCase().includes(reponse.value.toLowerCase()) ||
      question.id.toString().toLowerCase().includes(reponse.value.toLowerCase())
    );
  });
};
</script>
<template>
  <div id="block">
    <header class="header_admin">
      <NavbarAdmin :lien="route.name"></NavbarAdmin>
    </header>
    <div class="right_block">
      <main class="main_admin">
        <h2 class="h2_admin">{{ t('pages.validate_question_page.header_title') }}</h2>
        <div id="main_button">
          <div class="input-wrapper">
            <input v-model="reponse" :placeholder="t('pages.validate_question_page.search_placeholder')" class="input" @input="updateFilter">
          </div>
          <button type="button" class="button_add" @click="showform = !showform">
            <span class="button__text">{{ t('pages.validate_question_page.add_button_text') }}</span>
            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg">
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg></span>
          </button>
        </div>
      </main>
      <div id="dashbord">
        <Transition>
          <AddQuestion v-model:showform="showform" @refresh="getData"/>
        </Transition>
        <div class="grid_cards">
          <div v-for="question in filteredData" :key="question.id">
            <div v-for="theme in data_themes" :key="theme.id">
              <div  v-if="question.themes === theme['@id']">
                <ValideCard :cards="question" :theme="theme" @delete="handleDelete" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import "@/assets/scss/admin.scss";
.right_block {
  width: 75%;
  position: absolute;
  right: 0;
}
.grid_cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  width: 90%;
  margin: 0 auto 50px auto;
}
.grid_cards>div {
  //width: 50%;
}
#conteneur_card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 30px;
}
#main_button {
  display: flex;
  align-items: center;
  margin-right: 10px
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  width: 300px
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.img_incone_theme {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 3%;
  right: 1%;
}
.img_conteneur {
  position: relative;
}
</style>