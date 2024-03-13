<script setup>
import { ref } from 'vue';
import socket from '@/socket';
import router from "@/router/index.js";
import {useI18n} from "vue-i18n";
import Trans from "@/i18n/translation.js";
const { t, locale } = useI18n();

/*Variables*/
let roomName = ref('')
let privacy = ref(false);
let createorjoin = ref(true);
let roomID = ref('')
let error = ref('')


const user = JSON.parse(localStorage.getItem('user'))
let username = ref(user.name)

/*Fonctions*/
function createRoom() {
  let room = {
    name: roomName.value,
    creator: {name:user.name, token: user.token},
    privacy: privacy.value
  }

  if (room.name.value === '' || room.creator === undefined) {
    console.log('erreur', user)
  } else {
    socket.emit('create-room', room, (res) => {
      if(res.type === 'message'){
        router.push(Trans.i18nRoute({name: 'room', params: {id: res.room.id}}))
      }

      if(res.type === 'error'){
        error.value = res.error
      }
    })
  }
}

function joinRoom() {

  let room = {
    id: roomID.value,
    username: username.value,
    token: user.token
  }

  socket.emit('join-room', room, (res) => {
    if(res.type === 'message'){
      router.push(Trans.i18nRoute({name: 'room', params: {id: res.room.id}}))
    }

    if(res.type === 'error'){
      error.value = res.error
    }
  })
}
</script>


<template>
  <div class="room_container">
    <div class="room_area">

      <div class="room_area_first">
        <div class="room_area_select">
          <p :class="{room_selected: createorjoin}" @click="createorjoin = true;">{{ t('components.RoomArea.create') }}</p>
          <p @click="createorjoin = false;" :class="{room_selected: !createorjoin}">{{ t('components.RoomArea.join') }}</p>
        </div>

        <form @submit.prevent="createRoom" v-if="createorjoin">
          <div class="room_area_input_container">
            <label for="roomName">{{ t('components.RoomArea.name') }}</label>
            <input v-model="roomName" :placeholder="t('components.RoomArea.namePlaceholder')" />
            <span class="error-message">{{ error }}</span>
          </div>

          <div class="room_area_input_container">
            <div class="toogle_container">
              <input v-model="privacy" type="checkbox" id="toggle" class="toggleCheckbox" />
              <label for="toggle" class='toggleContainer'>
                <div :class="{room_selected: !privacy}">{{ t('components.RoomArea.public') }}</div>
                <div :class="{room_selected: privacy}">{{ t('components.RoomArea.private') }}</div>
              </label>

            </div>
          </div>



          <button class="create_room">{{ t('components.RoomArea.create') }}</button>
        </form>

        <form @submit.prevent="joinRoom" v-else>
          <span class="error-message">{{ error }}</span>
          <div class="room_area_input_container">
            <label for="inviteCode">{{ t('components.RoomArea.inviteCode') }}</label>
            <input v-model="roomID" maxlength="9" placeholder="Ex: 123456" />
          </div>
          <div class="room_area_input_container">
            <label for="username">{{ t('components.RoomArea.username') }}</label>
            <input v-model="username" placeholder="Ex: John Doe" />
          </div>
          <button class="create_room join_room">{{ t('components.RoomArea.join') }}</button>
        </form>


      </div>
      <div class="room_area_second">
        <img src="@/assets/image/planet.png" alt="planet" />
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
  box-shadow: -1px 13px 20px 0px #bababa;
  border-radius: 10px;
  padding: 40px;
  gap: 60px;
  margin-top: -100px;
  margin-bottom: 40px;
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

.error-message {
  color: red;
  font-family: Raleway, sans-serif;
}
</style>