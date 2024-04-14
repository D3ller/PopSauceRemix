<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {  useRouter } from "vue-router";

const router = useRouter();
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
const theme = ref('')
const imageData = ref()
const data_themes = ref()
const plusieur_question =ref( false)
const image_question =ref (false)
const {t, locale} = useI18n()

onMounted(() => {
  getData_themes()
})
function addpropose() {
  if (!question.value || !question_en.value || !reponse_1.value || !reponse_1_en.value || !theme.value) {
    return ;
  }
  if (plusieur_question) {
    if (!reponse_2.value || !reponse_2_en.value || !reponse_3.value || !reponse_3_en.value || !reponse_4.value || !reponse_4_en.value || !bonne_reponse.value || !good_reponse.value) {
      return ;
    }
  }
  if (image_question) {
    if (!imageData.value) {
      return ;
    }
  }
<<<<<<< Updated upstream
  console.log('ajouter' )
  axios.post('http://apiplateform.karibsen.fr/api/valid_questions', {
=======
  axios.post('https://apiplateform.karibsen.fr/api/valid_questions', {
>>>>>>> Stashed changes
    question: question.value,
      questionEn: question_en.value,
      reponse1: reponse_1.value,
      reponseEn: reponse_1_en.value,
      reponse2: reponse_2.value,
      reponse2En: reponse_2_en.value,
      reponse3: reponse_3.value,
      reponse3En: reponse_3_en.value,
      reponse4: reponse_4.value,
      reponse4En: reponse_4_en.value,
      image: imageData.value,
      bonneReponse: bonne_reponse.value,
      goodReponse: good_reponse.value,
      themes_id_id: theme.value
  }).then(() => {
    // Réinitialisation des valeurs des champs
    question.value = '';
    question_en.value = '';
    reponse_1.value = '';
    reponse_1_en.value = '';
    reponse_2.value = '';
    reponse_2_en.value = '';
    reponse_3.value = '';
    reponse_3_en.value = '';
    reponse_4.value = '';
    reponse_4_en.value = '';
    bonne_reponse.value = '';
    good_reponse.value = '';
    theme.value = '';
    imageData.value = '';

    // Redirection vers la page d'accueil après l'ajout de la question
    closeForm();
  }).catch(error => {
  console.error('Erreur lors de l\'ajout de la question :', error);
  // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
});
}
const getData_themes = () => {
  axios.get('https://apiplateform.karibsen.fr/api/themes')
      .then(res => {
        data_themes.value = res.data["hydra:member"]
      })
    console.log(data_themes)
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Vérifier la taille de l'image
  if (file.size > 500 * 1024) {
    alert("L'image ne doit pas dépasser 500ko.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    imageData.value = e.target.result;
  };
  reader.readAsDataURL(file);
}
function closeForm() {
     router.push({ name: 'home' });
     console.log('close')
   }
</script>

<template>
    <div id="formulaire_question">
    <div class="form_propose">
        <div class="form-box">
        <form class="form" @submit.prevent>
          <button @click="closeForm" class="button_close">
            <span class="X"></span>
            <span class="Y"></span>
          </button>
          <span class="title">{{ t('add_question_form.add_question') }}</span>
          <span class="subtitle">{{ t('add_question_form.fill_form_to_add_question') }}</span>
          <div class="form-container">
            <input class="form_input" type="text" v-model="question" :placeholder="t('add_question_form.question_placeholder')" name="question" required>
            <input class="form_input" type="text" v-model="question_en" :placeholder="t('add_question_form.question_en_placeholder')" name="question_en" required>
            <input class="form_input" type="text" v-model="reponse_1" :placeholder="t('add_question_form.response_1_placeholder')" name="reponse1" required>
            <input class="form_input" type="text" v-model="reponse_1_en" :placeholder="t('add_question_form.response_1_en_placeholder')" name="reponse1_en" required>
            <div class="conteneur_checkbox">
              <div>
                <input type="checkbox" v-model="plusieur_question" name="plusieur_question" value="plusieur_question">
                <label for="plusieur_question">{{ t('add_question_form.multiple_responses_label') }}</label>
              </div>
              <div>
                <input type="checkbox" v-model="image_question" name="image_question" value="image_question">
                <label for="image_question">{{ t('add_question_form.image_label') }}</label>
              </div>
            </div>
            <div v-if="plusieur_question">
              <input class="form_input" type="text" v-model="reponse_2" :placeholder="t('add_question_form.response_2_placeholder')" name="reponse2" required>
              <input class="form_input" type="text" v-model="reponse_2_en" :placeholder="t('add_question_form.response_2_en_placeholder')" name="reponse2_en" required>
              <input class="form_input" type="text" v-model="reponse_3" :placeholder="t('add_question_form.response_3_placeholder')" name="reponse3" required>
              <input class="form_input" type="text" v-model="reponse_3_en" :placeholder="t('add_question_form.response_3_en_placeholder')" name="reponse3_en" required>
              <input class="form_input" type="text" v-model="reponse_4" :placeholder="t('add_question_form.response_4_placeholder')" name="reponse4" required>
              <input class="form_input" type="text" v-model="reponse_4_en" :placeholder="t('add_question_form.response_4_en_placeholder')" name="reponse4_en" required>
              <input class="form_input" type="text" v-model="bonne_reponse" :placeholder="t('add_question_form.correct_response_placeholder')" name="bonne_reponse" required>
              <input class="form_input" type="text" v-model="good_reponse" :placeholder="t('add_question_form.correct_response_en_placeholder')" name="good_reponse" required>
            </div>
            <div v-if="image_question">
              <input class="form_input" type="file" accept="image/png" @change="handleImageUpload" name="image" required>
            </div>
            <select name="theme" id="theme" v-model="theme" required>
              <option value="">{{ t('add_question_form.select_theme') }}</option>
              <template v-for="theme in data_themes">
                <option v-if="theme.nomThemes" :value="theme['@id']">{{ theme.nomThemes }}</option>
              </template>
            </select>
          </div>
          <button type="button" class="button_add" @click="addpropose">
            <span class="button__text">{{ t('add_question_form.add_button') }}</span>
            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24"
                                            stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24"
                                            fill="none" class="svg">
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg></span>
          </button>
        </form>
      </div>
    </div>
  </div>

      
</template>

<style>
.conteneur_checkbox{
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.form_propose{
    margin-top: 120px;
    margin-bottom: 50px;
}
</style>