<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { onMounted, ref, computed } from 'vue';
import AdminCard from "@/components/AdminCard.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
let data = ref('');
let themes = ref('');
let originalData = ref('');
let filteredData = ref('');
const reponse = ref('');
const question = ref('');
const reponse_1 = ref('');
const reponse_2 = ref('');
const reponse_3 = ref('');
const reponse_4 = ref('');
const image = ref('');
const theme = ref('');
const question_en = ref('');
const reponse_1_en = ref('');
const questionId = ref('');
let id = ref('');
const showquestion = ref(false);
const showedit = ref(false);
let questionNumber = ref(0);
let icone = ref('');
onMounted(async () => {
  await fetchquestion();
});



onMounted(async () => {
  const response = await fetch('http://symfony.mmi-troyes.fr:8313/api/themes');
  const responseData = await response.json();
  themes.value = responseData['hydra:member'];
});

const isQuestionPage = computed(() => {
  return window.location.pathname === '/en/admin/question';
});

const fetchquestion = async () => {
  const response = await fetch('http://symfony.mmi-troyes.fr:8313/api/questions');
  const responseData = await response.json();
  data.value = responseData['hydra:member'].map((question, index) => ({
    ...question,
    originalIndex: index
  }));
  originalData.value = data.value;
  filteredData.value = data.value;
}
function updateFilter() {
  filteredData.value = originalData.value.filter(question => {
    // Vérifie si le texte de recherche correspond à la question ou à son numéro
    return question.question.toLowerCase().includes(reponse.value.toLowerCase()) ||
           question.id.toString().toLowerCase().includes(reponse.value.toLowerCase());
  }).map((question, index) => ({ ...question, numQuestion: index + 1 }));
}




async function ajouterquestion() {
  const response = await fetch('http://symfony.mmi-troyes.fr:8313/api/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: question.value,
      questionEn: question_en.value,
      reponse1: reponse_1.value,
      reponse1En: reponse_1_en.value,
      reponse2: reponse_2.value,
      reponse3: reponse_3.value,
      reponse4: reponse_4.value,
      image: image.value,
      themes: theme.value
    })
  });

  await fetchquestion(); // Mettre à jour la liste des questions après l'ajout

  question.value = '';
  question_en.value = '';
  reponse_1.value = '';
  reponse_1_en.value = '';
  reponse_2.value = '';
  reponse_3.value = '';
  reponse_4.value = '';
  image.value = '';
  theme.value = '';

  showquestion.value = false;
}


function deletconfirm(id) {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
    // Si l'utilisateur clique sur OK dans la boîte de dialogue
    // Vous pouvez appeler une méthode pour effectuer la suppression
    this.supprimerquestion(id); // Par exemple
  } else { }
}
async function supprimerquestion(id) {
  await fetch(`http://symfony.mmi-troyes.fr:8313/api/questions/${id}`, {
    method: 'DELETE',
  });


  await fetchquestion(); // Mettre à jour la liste des questions après la suppression
}

function showform() {
  showquestion.value = !showquestion.value;
  showedit.value = false;
}
function filterTheme() {
  console.log('Theme:', theme.value);
  if (theme.value) {

    filteredData.value = originalData.value.filter(question => question.themes === theme.value);
    return filteredData.value;

  }
  else {
    filteredData.value = originalData.value;
    return filteredData.value;
  }

}
async function editquestion(id) {

  const questionToEdit = originalData.value.find(question => question.id === id);
  if (!questionToEdit) {
    console.error('Question not found for editing');
    return;
  }
  console.log(originalData.value);
  console.log('questionToEdit', questionToEdit);
  // Pré-remplir les champs du formulaire d'édition avec les détails de la question
  questionId.value = questionToEdit.id;
  question.value = questionToEdit.question;
  question_en.value = questionToEdit.questionEn;
  reponse_1.value = questionToEdit.reponse1;
  reponse_1_en.value = questionToEdit.reponse1En;
  reponse_2.value = questionToEdit.reponse2;
  reponse_3.value = questionToEdit.reponse3;
  reponse_4.value = questionToEdit.reponse4;
  image.value = questionToEdit.image;
  theme.value = questionToEdit.themes;
  console.log('anglais', questionToEdit.question_en);
  // Afficher le formulaire d'édition
  showedit.value = true;
  window.scrollTo(0, 0);
  console.log('id', questionId.value);
}
async function updateQuestion(id) {
  // Récupérer les valeurs mises à jour des champs du formulaire
  const uptadtequestionId = questionId.value;
  const updatedQuestion = question.value;
  const updatedQuestionEN = question_en.value;
  const updatedReponse1 = reponse_1.value;
  const updatedReponse1En = reponse_1_en.value;
  const updatedReponse2 = reponse_2.value;
  const updatedReponse3 = reponse_3.value;
  const updatedReponse4 = reponse_4.value;
  const updatedImage = image.value;
  const updatedTheme = theme.value;



  const response = await fetch(`http://symfony.mmi-troyes.fr:8313/api/questions/${uptadtequestionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: updatedQuestion,
      questionEN: updatedQuestionEN,
      reponse1: updatedReponse1,
      reponse1En: updatedReponse1En,
      reponse2: updatedReponse2,
      reponse3: updatedReponse3,
      reponse4: updatedReponse4,
      image: updatedImage,
      themes: updatedTheme
    })
  });

  // Mettre à jour la liste des questions après la modification
  await fetchquestion();

  // Réinitialiser les champs du formulaire après la modification
  question.value = '';
  question_en.value = '';
  reponse_1.value = '';
  reponse_1_en.value = '';
  reponse_2.value = '';
  reponse_3.value = '';
  reponse_4.value = '';
  image.value = '';
  theme.value = '';

  // Cacher le formulaire d'édition après la modification
  showedit.value = false;
}
    function findImage(themeName) {
      console.log('themeName:', themeName);
    if (themeName === 'Biodiversité ') {
        return ('/src/assets/image/ours-polaire.png');
    } else if (themeName === 'Energie-renouvelable ') {
        return ('/src/assets/image/eolienne.png');
    }
    else if (themeName === 'Eco-transport ') {
        return ('/src/assets/image/bus.png');
    }
    else if (themeName === 'Eco-geste') {
        return ('/src/assets/image/recyclage.png');
    }
    else if (themeName === 'Commun ') {
        return ('/src/assets/image/commun.png');
    }
  }
 
</script>

<template>
  <div id="block">
    <header class="header_admin">
      <NavbarAdmin :lien="route.name"></NavbarAdmin>
    </header>
    <main class="main_admin">
      <h2 class="h2_admin">Question</h2>
      <div id="main_button">
        <div class="input-wrapper">
          <input v-model="reponse" placeholder="Type here..." class="input" @input="updateFilter">
        </div>
        <select class="select_theme_filter" name="theme" id="theme" v-model="theme" @click="filterTheme">
          <option value="">Sélectionner un thème</option>
          <template v-for="theme in themes">
            <option v-if="theme.nomThemes" :value="theme['@id']">{{ theme.nomThemes }}</option>
          </template>
        </select>
        <button type="button" class="button_add" @click="showform">
          <span class="button__text">Add Item</span>
          <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24"
              stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24"
              fill="none" class="svg">
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg></span>
        </button>

      </div>

    </main>
    <div id="dashbord">
      <Transition>
        <div v-if="showedit">
          <div id="formulaire_question">
            <div class="form-box">
              <form class="form">
                <button @click="showform" class="button_close">
                  <span class="X"></span>
                  <span class="Y"></span>
                </button>
                <span class="title">Modifier une Question</span>
                <span class="subtitle">Veuillez modifier le formulaire pour modifier la question.</span>
                <div class="form-container">
                  <input id="input_id" class="form_input" type="number" v-model="questionId" name="id" readonly>
                  <input class="form_input" type="text" v-model="question" placeholder="Question" name="question">
                  <input class="form_input" type="text" v-model="question_en" placeholder="Question en anglais"
                    name="question_en">
                  <input class="form_input" type="text" v-model="reponse_1" placeholder="Réponse 1" name="reponse1">
                  <input class="form_input" type="text" v-model="reponse_1_en" placeholder="Réponse 1 en anglais"
                    name="reponse1_en">
                  <input class="form_input" type="text" v-model="reponse_2" placeholder="Réponse 2" name="reponse2">
                  <input class="form_input" type="text" v-model="reponse_3" placeholder="Réponse 3" name="reponse3">
                  <input class="form_input" type="text" v-model="reponse_4" placeholder="Réponse 4" name="reponse4">
                  <input class="form_input" type="text" v-model="image" placeholder="Image" name="image">
                  <select name="theme" id="theme" v-model="theme">
                    <option value="">Sélectionner un thème</option>
                    <template v-for="theme in themes">
                      <option v-if="theme.nomThemes" :value="theme['@id']">{{ theme.nomThemes }}</option>
                    </template>
                  </select>
                </div>
                <button @click="updateQuestion(question.id)" class="Button_edit">Edit
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
      </Transition>
      <Transition>
        <div v-if="showquestion">
          <div id="formulaire_question">
            <div class="form-box">
              <form class="form">
                <button @click="showform" class="button_close">
                  <span class="X"></span>
                  <span class="Y"></span>
                </button>
                <span class="title">Ajouter une Question</span>
                <span class="subtitle">Veuillez remplir le formulaire pour ajouter une question.</span>
                <div class="form-container">
                  <input class="form_input" type="text" v-model="question" placeholder="Question" name="question">
                  <input class="form_input" type="text" v-model="question_en" placeholder="Question en anglais"
                    name="question_en">
                  <input class="form_input" type="text" v-model="reponse_1" placeholder="Réponse 1" name="reponse1">
                  <input class="form_input" type="text" v-model="reponse_1_en" placeholder="Réponse 1 en anglais"
                    name="reponse1_en">
                  <input class="form_input" type="text" v-model="reponse_2" placeholder="Réponse 2" name="reponse2">
                  <input class="form_input" type="text" v-model="reponse_3" placeholder="Réponse 3" name="reponse3">
                  <input class="form_input" type="text" v-model="reponse_4" placeholder="Réponse 4" name="reponse4">
                  <input class="form_input" type="text" v-model="image" placeholder="Image" name="image">
                  <select name="theme" id="theme" v-model="theme">
                    <option value="">Sélectionner un thème</option>
                    <template v-for="theme in themes">
                      <option v-if="theme.nomThemes" :value="theme['@id']">{{ theme.nomThemes }}</option>
                    </template>
                  </select>
                </div>
                <button type="button" class="button_add" @click="ajouterquestion">
                  <span class="button__text">Add Item</span>
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
      </Transition>
      <div id="conteneur_card">
        <div v-for="(question, index) in filteredData" :key="question.id">
          <div v-for="theme in themes" :key="theme.id">
            <div class="img_conteneur" v-if="question.themes === theme['@id']">
              <img class="img_incone_theme" :src="findImage(theme.nomThemes)" alt="Icone du thème">
          <AdminCard :cards="question" :numero="questionNumber + question.originalIndex + 1" :lien="route.name" :theme="theme"   />
          <div id="conteneur_card_buttons">
            <button @click="deletconfirm(question.id)" class="button_delet"><span class="text">Delete</span><span
                class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                  </path>
                </svg></span></button>
            <button @click="editquestion(question.id)" class="Button_edit">Edit
              <svg class="svg" viewBox="0 0 512 512">
                <path
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                </path>
              </svg>
            </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- <h2>Page des questions</h2>
        <form action="">
          <input v-model="reponse" placeholder="Rechercher une question" @input="updateFilter">
        </form>
        <form>
          <input type="text" v-model="question" placeholder="Question" name="question">
          <input type="text" v-model="question_en" placeholder="Question en anglais" name="question_en">
          <input type="text" v-model="reponse_1 "placeholder="Réponse 1" name="reponse1">
          <input type="text" v-model="reponse_1_en" placeholder="Réponse 1 en anglais" name="reponse1_en">
          <input type="text" v-model="reponse_2" placeholder="Réponse 2" name="reponse2">
          <input type="text" v-model="reponse_3" placeholder="Réponse 3" name="reponse3">
          <input type="text" v-model="reponse_4" placeholder="Réponse 4" name="reponse4">
          <input type="text" v-model="image" placeholder="Image" name="image">
          <select name="theme" id="theme" v-model="theme">
          <option value="">Sélectionner un thème</option>
           <template v-for="theme in themes">
            <option v-if="theme.nomThemes" :value="theme['@id']"  >{{ theme.nomThemes }}</option>
            </template>
            </select>
        </form>
       
        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Réponse</th>
              <th>Réponse 2</th>
              <th>Réponse 3</th>
              <th>Réponse 4</th>
              <th>Image</th>
              <th>Thème</th>
            </tr>
          </thead>
          <tbody>
            <div v-if="isQuestionPage">
              <tr v-for="question in data" :key="question.id">
              <td>{{ question.id }}</td>
              <td>{{ question.question_en }}</td>
              <td>{{ question.reponse1En }}</td>
              <td>{{ question.reponse2En }}</td>
              <td>{{ question.reponse3En }}</td>
              <td>{{ question.reponse4En }}</td>
              <td>{{ question.image }}</td>
              <div v-for="theme in themes" :key="theme.id">
            <td v-if="question.themes === theme['@id']">{{ theme.nomThemes }}</td>
          </div>
          </tr>
          </div>
          <div v-else> 
            <tr v-for="question in filteredData" :key="question.id">
              <td>{{ question.id }}</td>
              <td>{{ question.question }}</td>
              <td>{{ question.reponse1 }}</td>
              <td>{{ question.reponse2 }}</td>
              <td>{{ question.reponse3 }}</td>
              <td>{{ question.reponse4 }}</td>
              <td>{{ question.image }}</td>
              <div v-for="theme in themes" :key="theme.id">
            <td v-if="question.themes === theme['@id']">{{ theme.nomThemes }}</td>
          </div>
              <td><button @click="supprimerquestion(question.id)">Supprimer</button></td>
            </tr>
          </tbody>
        </table>-->

</template>
<style>
@import "@/assets/scss/admin.scss";

#conteneur_card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

#main_button {
  display: flex;
}

form {
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
```