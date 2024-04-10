<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import AdminCard from "@/components/AdminCard.vue";
const route = useRoute();
const data = ref(null);
const user = ref('');
const reponse = ref('');
let originalData = ref('');
let filteredData = ref('');
onMounted(async () => {
  const response = await fetch(`http://localhost:8080/api/users`);
  const responseData = await response.json();
  data.value = responseData['hydra:member']
  originalData.value = data.value;
  filteredData.value = data.value;
console.log(data.value)
})
const calculateDefeats = (user) => {
  return user.nb_parties - user.nb_gagne;
}

 async function deleteUser(id) {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
     await fetch(`http://localhost:8080/api/users/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  window.location.reload();
  } else {
    console.log('Annulation de la suppression');
   }
 
}
function userfilter() {
  filteredData.value = originalData.value.filter((user) => {
    const index = user.originalIndex + 1;
    return (
      user.username.toLowerCase().includes(reponse.value.toLowerCase()) ||
      index.toString().toLowerCase().includes(reponse.value.toLowerCase())
    );
  });
}
</script>
<template>
 <div id="block">
    <header class="header_admin">
      <NavbarAdmin :lien="route.name"></NavbarAdmin>
    </header>
    <main class="main_admin">
      <h2 class="h2_admin">Utilisateur</h2>
      <div class="input-wrapper">
          <input v-model="reponse" placeholder="Type here..." class="input" @input="userfilter">
        </div>
      </main>
      <div id="dashbord">
        <div class="card_container">
            <div v-for="(user, index) in filteredData" :key="index">
            <AdminCard :cards="user" :numero="index + 1" lien="user" :nb_defaite="calculateDefeats(user)"></AdminCard>
            <div class="conteneur_card_buttons">
            <button @click="deleteUser(user.id)" class="button_delet"><span class="text">Delete</span><span
                class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                  </path>
                </svg></span></button>
              </div>  
          </div>
        </div>
    </div>
 </div>
</template>
<style lang="scss">
@import "@/assets/scss/admin.scss";

.card_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 30px;
}
</style>