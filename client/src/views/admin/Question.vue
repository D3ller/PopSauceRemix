<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { onMounted, ref, computed } from 'vue';
import AdminCard from "@/components/AdminCard.vue";
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
let id= ref('');
const showquestion = ref(false);

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
  data.value = responseData['hydra:member'];
  originalData.value = data.value;
  filteredData.value = data.value;
}
function updateFilter() {
  filteredData.value = originalData.value.filter(question => question.question.toLowerCase().includes(reponse.value.toLowerCase()));
  console.log('Filtered data:', filteredData.value);
  return filteredData.value;
}


async function ajouterquestion() {
  const response = await fetch('http://symfony.mmi-troyes.fr:8313/api/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: question.value,
      questionEN: question_en.value,
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
}


function deletconfirm(id) {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
        // Si l'utilisateur clique sur OK dans la boîte de dialogue
        // Vous pouvez appeler une méthode pour effectuer la suppression
        this.supprimerquestion(id); // Par exemple
      } else {}
    }
    async function supprimerquestion(id) {
  await fetch(`http://symfony.mmi-troyes.fr:8313/api/questions/${id}` , {
    method: 'DELETE',
  });

  
  await fetchquestion(); // Mettre à jour la liste des questions après la suppression
}

function showform() {
  showquestion.value = !showquestion.value;
}
</script>

<template>
  <div id="block">
    <header>
    <NavbarAdmin></NavbarAdmin>
  </header>
  <main>
   <h2>Question</h2>
   <div id="main_button">
    <div class="input-wrapper">
      <input v-model="reponse"  placeholder="Type here..."  class="input" @input="updateFilter">
    </div>
  
   <button type="button" class="button_add" @click="showform">
  <span class="button__text">Add Item</span>
  <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
</button>
   
  </div>
  
  </main>
  <div id="dashbord">
    <Transition>
      <div v-if="showquestion">
    <div id="formulaire_question">
      <div class="form-box">
<form class="form">
    <span class="title">Question</span>
    <span class="subtitle">Veuillez remplir le formulaire pour ajouter une question.</span>
    <div class="form-container">
      <input class="form_input"type="text" v-model="question" placeholder="Question" name="question">
          <input class="form_input" type="text" v-model="question_en" placeholder="Question en anglais" name="question_en">
          <input class="form_input" type="text" v-model="reponse_1 "placeholder="Réponse 1" name="reponse1">
          <input class="form_input" type="text" v-model="reponse_1_en" placeholder="Réponse 1 en anglais" name="reponse1_en">
          <input class="form_input" type="text" v-model="reponse_2" placeholder="Réponse 2" name="reponse2">
          <input class="form_input" type="text" v-model="reponse_3" placeholder="Réponse 3" name="reponse3">
          <input class="form_input" type="text" v-model="reponse_4" placeholder="Réponse 4" name="reponse4">
          <input class="form_input" type="text" v-model="image" placeholder="Image" name="image">
          <select name="theme" id="theme" v-model="theme">
          <option value="">Sélectionner un thème</option>
           <template v-for="theme in themes">
            <option v-if="theme.nomThemes" :value="theme['@id']"  >{{ theme.nomThemes }}</option>
            </template>
            </select>
    </div>
    <button type="button" class="button_add" @click="ajouterquestion">
  <span class="button__text">Add Item</span>
  <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
</button>
  </form>
  </div>
    </div>
    </div> 
    </Transition>
    <div id="conteneur_card">
      <div v-for="question in filteredData" :key="question.id">
       <AdminCard :cards="question" />
       <button @click="deletconfirm(question.id)" class="button_delet"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
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

#conteneur_card{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}
#main_button{
  display: flex;
}

form{
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
</style>
```