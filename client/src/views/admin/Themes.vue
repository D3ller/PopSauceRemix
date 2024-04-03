<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import { onMounted, ref, computed } from 'vue';
import AdminCards from "@/components/AdminCard.vue";
import { useRoute } from 'vue-router';
const route = useRoute();
let data = ref('');
let themes = ref('');
let id = ref('');
let originalData = ref('');
let filteredData = ref('');
const reponse = ref('');
const theme = ref('');
const theme_an = ref('');
const showtheme = ref(false);
const themeId = ref('');
const showedit = ref(false);

onMounted(async () => {
  await fetchthemes();
});
const fetchthemes = async () => {
  const response = await fetch(`http://localhost:8080/api/themes`);
  const responseData = await response.json();
  data.value = responseData['hydra:member'].map((question, index) => ({
    ...question,
    originalIndex: index
  }));
  originalData.value = data.value;
  filteredData.value = data.value;
}
console.log(filteredData);

function themefilter() {
  filteredData.value = originalData.value.filter((theme) => {
    const index = theme.originalIndex + 1;
    return (
      theme.nomThemes.toLowerCase().includes(reponse.value.toLowerCase()) ||
      index.toString().toLowerCase().includes(reponse.value.toLowerCase())
    );
  });
}

async function addtheme() {
  await fetch('http://symfony.mmi-troyes.fr:8313/api/themes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nomThemes: theme.value,
      themeEn: theme_an.value // Correction ici
    })
  });

  // Réinitialiser les valeurs des champs à une chaîne vide
  theme.value = '';
  theme_an.value = '';

  // Optionnel : effectuer une nouvelle requête pour récupérer les thèmes mis à jour
  await fetchthemes(); // Assurez-vous que cette fonction est correctement définie
}

function deletconfirm(id) {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
    this.supprimerquestion(id);
  } else { }
}
async function supprimerquestion(id) {
  await fetch(`http://symfony.mmi-troyes.fr:8313/api/themes/${id}`, {
    method: 'DELETE',
  });
  await fetchthemes();
}
function showform() {
  showtheme.value = !showtheme.value;
  showedit.value = false;
}
async function edittheme(id) {

  const themeToEdit = originalData.value.find(theme => theme.id === id);
  if (!themeToEdit) {
    console.error('Question not found for editing');
    return;
  }
  // Pré-remplir les champs du formulaire d'édition avec les détails de la question
  themeId.value = themeToEdit.id;
  theme.value = themeToEdit.nomThemes;
  theme_an.value = themeToEdit.themeEn;
  // Afficher le formulaire d'édition
  showedit.value = true;
  window.scrollTo(0, 0);

}
async function updatetheme(id) {
  const updatethemeId = themeId.value;
  const updatedtheme = theme.value;
  const updatedthemeEn = theme_an.value;
  console.log(updatethemeId, updatedtheme, updatedthemeEn);
    const response = await fetch(`http://symfony.mmi-troyes.fr:8313/api/themes/${updatethemeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nomThemes: theme.value,
      themeEn: theme_an.value
    })
  });
await fetchthemes();
  showedit.value = false;
  theme.value = '';
  theme_an.value = '';
  themeId.value = '';
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
      <h2 class="h2_admin">Thèmes</h2>
      <div id="main_button">
        <div class="input-wrapper">
          <input v-model="reponse" placeholder="Type here..." class="input" @input="themefilter">
        </div>
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
        <div v-if="showtheme">
          <div id="formulaire_question">
            <div class="form-box">
              <form class="form">
                <button @click="showform" class="button_close_themes">
                  <span class="X"></span>
                  <span class="Y"></span>
                </button>
                <span class="title">Ajouter un themes</span>
                <span class="subtitle">Veuillez remplir le formulaire pour ajouter un theme.</span>
                <div class="form-container">
                  <input class="form_input" type="text" v-model="theme" placeholder="Thème" name="theme">
                  <input class="form_input" type="text" v-model="theme_an" placeholder="Thème en anglais"
                    name="question_en">
                </div>
                <button type="button" class="button_add" @click="addtheme">
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
      <Transition>
        <div v-if="showedit">
          <div id="formulaire_question">
            <div class="form-box">
              <form class="form">
                <button @click="showform" class="button_close_themes">
                  <span class="X"></span>
                  <span class="Y"></span>
                </button>
                <span class="title">Modifier un themes</span>
                <span class="subtitle">Veuillez remplir le formulaire pour modifier un theme.</span>
                <div class="form-container">
                  <input id="input_id" class="form_input" type="number" v-model="themeId" name="id" readonly>
                  <input class="form_input" type="text" v-model="theme" placeholder="Thème" name="theme">
                  <input class="form_input" type="text" v-model="theme_an" placeholder="Thème en anglais"
                    name="theme_en">
                </div>
                <button @click="updatetheme(theme.id)" class="Button_edit">Edit
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
      <div id="conteneur_card">
        <div class="img_conteneur" v-for="theme in filteredData" :key="theme.id">
          <img class="img_incone_theme" :src="findImage(theme.nomThemes)" alt="Icone du thème">
          <AdminCards :cards="theme" :lien="route.name"></AdminCards>
          <div id="conteneur_card_buttons">
            <button @click="deletconfirm(theme.id)" class="button_delet"><span class="text">Delete</span><span
                class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                  </path>
                </svg></span></button>
            <button @click="edittheme(theme.id)" class="Button_edit">Edit
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
</template>
<style>
@import "@/assets/scss/admin.scss";

#conteneur_card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 30px;
}

#main_button {
  display: flex;
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
```