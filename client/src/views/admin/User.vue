<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import AddItem from "@/components/Admin/AddItem.vue";
import ThemesCard from "@/components/Admin/ThemesCard.vue";
import Footer from "@/components/Footer.vue";
import UserCard from "@/components/Admin/UserCard.vue";

const route = useRoute()
const data = ref()
const showform = ref(false)
const reponse = ref('')
const originalData = ref()
const filteredData = ref()
// const showformUpdate = ref(false)

// const theme = ref('')
// const theme_en =ref()

onMounted(() => {
  getData()
})

function handleDelete(id) {
  const result = confirm("Es-tu sûr de vouloir supprimer ?");
  if (result) {
    axios.delete(`http://apiplateform.karibsen.fr/api/users/${id}`)
        .then(() => {
          getData();
        })
        .catch(error => {
          console.error("Erreur lors de la suppression :", error);
        });
  }
}

const getData = () => {
  axios.get('http://apiplateform.karibsen.fr/api/users')
      .then(res => {
        data.value = res.data["hydra:member"]
        originalData.value = data.value;
        filteredData.value = data.value;
      })
    console.log(data)
}
console.log(route)
const updateFilter = () => {
  filteredData.value = originalData.value.filter(user => {
    return (
      user.username.toLowerCase().includes(reponse.value.toLowerCase()) ||
      user.id.toString().toLowerCase().includes(reponse.value.toLowerCase())
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
        <h2 class="h2_admin">User</h2>
        <div id="main_button">
          <div class="input-wrapper">
            <input v-model="reponse" placeholder="Rechercher" class="input" @input="updateFilter">
          </div>
        </div>
      </main>
      <div id="dashbord">
        <div class="grid_cards">
        <UserCard v-for="user in filteredData" :key="user.id" :data="user" @delete="handleDelete"></UserCard>
        </div>
      </div>
      <Footer></Footer>
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