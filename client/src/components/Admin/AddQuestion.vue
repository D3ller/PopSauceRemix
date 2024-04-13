<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

const props = defineProps(['showform', 'getData'])
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
const theme = ref('')
const imageData = ref()
const data_themes = ref()
const plusieur_question =ref( false)
const image_question =ref (false)

onMounted(() => {
  getData_themes()
})
function addquestion() {
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
  axios.post('http://apiplateform.karibsen.fr/api/questions', {
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
        emit('update:showform', false);
      })
    question.value = ''
    question_en.value = ''
    reponse_1.value = ''
    reponse_1_en.value = ''
    reponse_2.value = ''
    reponse_2_en.value = ''
    reponse_3.value = ''
    reponse_3_en.value = ''
    reponse_4.value = ''
    reponse_4_en.value = ''
    bonne_reponse.value = ''
    good_reponse.value = ''
    theme.value = ''
    imageData.value = ''
    props.showform = !props.showform
}
const getData_themes = () => {
  axios.get('http://apiplateform.karibsen.fr/api/themes')
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
</script>

<template>
  <div v-if="showform">
    <div id="formulaire_question">
            <div class="form-box">
              <form class="form">
                <button @click="showform = !showform" class="button_close">
                  <span class="X"></span>
                  <span class="Y"></span>
                </button>
                <span class="title">Ajouter une Question</span>
                <span class="subtitle">Veuillez remplir le formulaire pour ajouter une question.</span>
                <div class="form-container">
                  <input class="form_input" type="text" v-model="question" placeholder="Question" name="question" required>
                  <input class="form_input" type="text" v-model="question_en" placeholder="Question en anglais"
                    name="question_en" required>
                  <input class="form_input" type="text" v-model="reponse_1" placeholder="Réponse 1" name="reponse1" required>
                  <input class="form_input" type="text" v-model="reponse_1_en" placeholder="Réponse 1 en anglais"
                    name="reponse1_en" required>
                  <div class="conteneur_checkbox">
                    <div>
                      <input type="checkbox" v-model="plusieur_question" name="plusieur_question" value="plusieur_question">
                      <label for="plusieur_question">Plusieurs réponses</label>
                    </div>
                    <div> 
                      <input type="checkbox" v-model="image_question" name="image_question" value="image_question">
                      <label for="image_question">Image</label>
                  </div>
                  </div>
                  <div v-if="plusieur_question">
                  <input class="form_input" type="text" v-model="reponse_2" placeholder="Réponse 2" name="reponse2"required>
                  <input class="form_input" type="text" v-model="reponse_2_en" placeholder="Réponse 2 en anglais" name="reponse2_en" required>
                  <input class="form_input" type="text" v-model="reponse_3" placeholder="Réponse 3" name="reponse3" required>
                  <input class="form_input" type="text" v-model="reponse_3_en" placeholder="Réponse 3 en anglais" name="reponse3_en" required>
                  <input class="form_input" type="text" v-model="reponse_4" placeholder="Réponse 4" name="reponse4" required>
                  <input class="form_input" type="text" v-model="reponse_4_en" placeholder="Réponse 4 en anglais" name="reponse4_en"required>
                  <input class="form_input" type="text" v-model="bonne_reponse" placeholder="bonne reponse" name="bonne_reponse"required>
                  <input class="form_input" type="text" v-model="good_reponse" placeholder="bonne reponse en anglais" name="good_reponse"required>
                  </div>
                  <div v-if="image_question">
                    <input class="form_input" type="file" accept="image/png" @change="handleImageUpload" name="image" required>
                  </div>
                  <select name="theme" id="theme" v-model="theme" required>
                    <option value="">Sélectionner un thème</option>
                    <template v-for="theme in data_themes">
                      <option v-if="theme.nomThemes" :value="theme['@id']" >{{ theme.nomThemes }}</option>
                    </template>
                  </select>
                </div>
                <button type="submit" class="button_add" @click="addquestion">
                  <span class="button__text">Ajouter</span>
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
</style>