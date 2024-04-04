<script setup>
import { onMounted, ref, computed } from 'vue';


let themes = ref('');
let question = ref('');
let question_en = ref('');
let reponse_1 = ref('');
let reponse_1_en = ref('');
let reponse_2 = ref('');
let reponse_2_en = ref('');
let reponse_3 = ref('');
let reponse_3_en = ref('');
let reponse_4 = ref('');
let reponse_4_en = ref('');
let image = ref('');
let theme = ref('');

onMounted(async () => {
  const response = await fetch('http://localhost:8080/api/themes');
  const responseData = await response.json();
  themes.value = responseData['hydra:member'];
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Vérifier la taille de l'image
  if (file.size > 500 * 1024) {
    alert("L'image ne doit pas dépasser 500ko.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    image.value = e.target.result; // Stocker les données de l'image téléchargée dans la variable image
  };
  reader.readAsDataURL(file);
};


const validateAndAddQuestion = () => {
  if (!question.value || !question_en.value || !reponse_1.value || !reponse_1_en.value || !theme.value) {
    console.log('Veuillez remplir tous les champs obligatoires.');
  } else {
    ajouterQuestion(); // Ajouter la question si le formulaire est valide
    clearForm(); // Effacer le formulaire après l'ajout de la question
  }
};


const ajouterQuestion = async () => {
  const formData = {
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
    image: image.value,
    theme: theme.value
  };

  const response = await fetch('http://localhost:8080/api/valid_questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  if (response.ok) {
    // Gérer le cas où l'ajout de la question réussit
    console.log('Question ajoutée avec succès !');
  } else {
    // Gérer le cas où il y a une erreur lors de l'ajout de la question
    console.error('Erreur lors de l\'ajout de la question.');
  }
};
const clearForm = () => {
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
  image.value = '';
  theme.value = '';
};





</script>
<template>
    <div id="formulaire_question">
      <div class="form-box">
        <form class="forms" @submit.prevent="validateAndAddQuestion">
          <button @click="showform" class="button_close">
            <span class="X"></span>
            <span class="Y"></span>
          </button>
          <span class="title">Proposition de question</span>
          <span class="subtitle">Veuillez remplir le formulaire pour proposer une question <span class="required">*</span></span>
          <div class="form-container">
            <input class="form_input" type="text" v-model="question" placeholder="* Question" name="question" required>
            <input class="form_input" type="text" v-model="question_en" placeholder="* Question en anglais" name="question_en" required>
            <input class="form_input required" type="text" v-model="reponse_1" placeholder="* Réponse 1" name="reponse1" required>
            <input class="form_input required" type="text" v-model="reponse_1_en" placeholder="* Réponse 1 en anglais" name="reponse1_en" required>
            <input class="form_input" type="text" v-model="reponse_2" placeholder="Réponse 2" name="reponse2">
            <input class="form_input" type="text" v-model="reponse_2_en" placeholder="Réponse 2 en anglais" name="reponse2_en">
            <input class="form_input" type="text" v-model="reponse_3" placeholder="Réponse 3" name="reponse3">
            <input class="form_input" type="text" v-model="reponse_4" placeholder="Réponse 4" name="reponse4">
            <input class="form_input" type="file"  @change="handleImageUpload" accept="image/png" name="image">
            <select name="theme" id="theme" v-model="theme" required>
              <option value="">Sélectionner un thème</option>
              <template v-for="theme in themes" :key="theme['@id']">
                <option v-if="theme.nomThemes" :value="theme['@id']">{{ theme.nomThemes }}</option>
              </template>
            </select>
          </div>
          <button type="submit" class="button_add">
            <span class="button__text">Proposer</span>
            <span class="button__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24"
                  stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24"
                  fill="none" class="svg">
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  </template>
  
  
  

<style scoped>

.input-wrapper {
input {
  background-color: #eee;
  border: none;
  padding: 8px;
  font-size: 1rem;
  width: 150px;
  border-radius: 5px;
  box-shadow: 2px 2px 12px 1px #c1bcbc;
  cursor: pointer;
  height: 30px;
  margin-top: 100px;
}
  }
  
  .input-wrapper input:focus {
    outline-color: #2222;
  }
  
  #formulaire_question {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form-box {
    max-width: 400px;
    background: rgba(217, 217, 217, 0.58);
    overflow: hidden;
    border-radius: 10px;
    color: #010101;
    display: flex;
    font-family: sans-serif; /* Replace $base-font with the desired font stack */
    box-shadow: rgba(0, 0, 0, 0.43) 1px 1px 8px 1px;
    justify-content: center;
    margin-top: 100px;
  }
  
  .form-box .forms {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 350px;
  }
  
  .form-box .forms .title {
    font-weight: bold;
    font-size: 1.6rem;
  }
  
  .form-box .forms .subtitle {
    font-size: 1rem;
    color: #666;
  }
  
  .form-box .form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 1rem 0 0.5rem;
    width: 300px;
  }
  
  .form-box .form-container .form_input {
    background: none;
    border: 0;
    outline: 0;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    padding: 8px 15px;
  }
  
  .form-box .form-container select {
    background: none;
    border: 0;
    outline: 0;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    padding: 8px 15px;
  }
  
  .form-box .form-section {
    padding: 16px;
    font-size: 0.85rem;
    background-color: #e0ecfb;
    box-shadow: rgba(0, 0, 0, 0.08) 0 -1px;
  }
  
  .form-box .form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: color 0.3s ease;
  }
  
  .form-box .form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
  }
  
  #form_button {
    background-color: #0066ff;
    color: #fff;
    border: 0;
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  #form_button:hover {
    background-color: #005ce6;
  }
  
  .button_close {
    position: relative;
    width: 30px;
    height: 30px;
    border: none;
    background: rgba(180, 83, 107, 0.11);
    border-radius: 5px;
    transition: background 0.5s;
    left: 45%;
    top: 1%;
  }
  
  .button_close:hover {
    background-color: rgb(211, 21, 21);
  }
  
  .button_close:active {
    background-color: #951414;
  }
  
  .button_close > .close {
    position: absolute;
    display: flex;
    padding: 0.8rem 1.5rem;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    top: -70%;
    left: 50%;
    width: 3em;
    height: 1.7em;
    font-size: 12px;
    background-color: rgb(19, 22, 24);
    color: rgb(187, 229, 236);
    border: none;
    border-radius: 3px;
    pointer-events: none;
    opacity: 0;
    animation: close 0.2s forwards 0.25s;
  }
  
  .button_close:hover > .close {
    animation: close 0.2s forwards 0.25s;
  }
  
  .X, .Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 1.5px;
    background-color: #fff;
    transform: translateX(-50%);
  }
  
  .X {
    transform: translateX(-50%) rotate(45deg);
  }
  
  .Y {
    transform: translateX(-50%) rotate(-45deg);
  }
  
  @keyframes close {
    100% {
      opacity: 1;
    }
  }
  

</style>