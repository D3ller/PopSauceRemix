<script setup>
import { ref } from 'vue';
import {useRoomStore} from "@/stores/counter.js";
const roomStore = useRoomStore();

let roomName = ref('');
let privacy = ref(false);
let inviteCode = ref('');
let username = ref(localStorage.getItem('username'));
let createorjoin = ref(true);

// gestion de l'erreur differente 

function createRoom() {
  console.log(roomName.value.length)
  if(roomName.value.length <= 3) {
    alert('Le nom du salon est trop court');
  } else {
    roomStore.createRoom(roomName.value, privacy.value, 'zozi')
  }
  

}

function joinRoom() {
  console.log(inviteCode.value, username.value);
  roomStore.joinRoom(inviteCode.value, username.value)
}


</script>


<template>
  <div class="room_container">
<div class="room_area">

<div class="room_area_first">
<div class="room_area_select">
  <p :class="{room_selected: createorjoin}" @click="createorjoin = true">Créer un salon</p>
  <p @click="createorjoin = false" :class="{room_selected: !createorjoin}">Rejoindre un salon</p>
</div>

  <form @submit.prevent="createRoom" v-if="createorjoin">
    <div class="room_area_input_container">
    <label for="roomName">Nom du salon</label>
    <input v-model="roomName" placeholder="Ex: Salon de jeux" />
    </div>

    <div class="room_area_input_container">
      <div class="toogle_container">
        <input v-model="privacy" type="checkbox" id="toggle" class="toggleCheckbox" />
        <label for="toggle" class='toggleContainer'>
          <div :class="{room_selected: !privacy}">Public</div>
          <div :class="{room_selected: privacy}">Privée</div>
        </label>

      </div>
    </div>



    <button class="create_room">Créer un salon</button>
  </form>

  <form @submit.prevent="joinRoom" v-else>
    <div class="room_area_input_container">
    <label for="inviteCode">Code d'invitation</label>
    <input v-model="inviteCode" maxlength="9" placeholder="Ex: 123456" />
    </div>
    <div class="room_area_input_container">
      <label for="username">Nom d'utilisateur</label>
      <input v-model="username" placeholder="Ex: John Doe" />
    </div>
    <button class="create_room join_room">Rejoindre un salon</button>
  </form>


</div>
  <div class="room_area_second">
    <img src="@/assets/images/planet.png" alt="planet" />
  </div>
</div>
  </div>
</template>

<style scoped>
.room_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.room_area_first {
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.room_area {
background-color: #ffffff;
  display: flex;
  box-shadow: -1px 13px 20px 0px #d9d9d9;
  border-radius: 10px;
  padding: 40px;
  gap: 60px;
}

.room_area_select {
  display: flex;
  justify-content: left;
  padding: 10px;
  gap: 40px;
  margin-bottom: 20px;
}

.room_area_select p {
  color: #8f8f8f;
  font-size: 20px;
  cursor: pointer;
  font-family: Raleway, sans-serif;
  font-weight: 500;
}

.room_area_select p.room_selected {
  text-decoration: underline;
  font-weight: 700;
  color: black;
}

.room_area_input_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  height:96px;
}

.room_area_input_container label {
  font-size: 16px;
  color: #000000;
  font-family: Inter, sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
}

.room_area_input_container input {
  padding: 15px;
  border: 1px solid #D7D7D9;
  border-radius: 5px;
  font-size: 14px;
  background-color: #F5F5F7;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  margin-bottom: 20px;
}

.room_area_input_container input:focus {
  outline: none;
}

.room_area_input_container input::placeholder {
  color: #8F8F8F;
}

.toggleContainer {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: fit-content;
  border: 3px solid #343434;
  border-radius: 50px;
  background: #343434;
  font-weight: bold;
  color: #343434;
  cursor: pointer;
}

.toggleContainer .room_selected {
  font-weight: bold;
  transition: font-weight 0.3s;
}

.toggleContainer::before {
  content: '';
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0%;
  border-radius:20px;
  background: white;
  transition: all 0.3s;
}
.toggleCheckbox:checked + .toggleContainer::before {
  left: 50%;
}
.toggleContainer div {
  padding: 10px 20px;
  text-align: center;
  z-index: 1;
}
.toggleCheckbox {
  display: none;
}
.toggleCheckbox:checked + .toggleContainer div:first-child{
  color: white;
  transition: color 0.3s;
}
.toggleCheckbox:checked + .toggleContainer div:last-child{
  color: #343434;
  transition: color 0.3s;
}
.toggleCheckbox + .toggleContainer div:first-child{
  color: #343434;
  transition: color 0.3s;
}
.toggleCheckbox + .toggleContainer div:last-child{
  color: white;
  transition: color 0.3s;
}

.toogle_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.create_room {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background: linear-gradient(180deg, #1B8DDF 0%, #4D3EFF 100%);
  color: white;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}



.room_area_second {
  display: flex;
  justify-content: center;
  align-items: center;
}

.room_area_second img {
width: 00px;
}
</style>