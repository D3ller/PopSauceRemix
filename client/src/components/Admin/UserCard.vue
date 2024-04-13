<template>
  <div class="card">
    <div class="card_top">
      <h2>{{ t('user_card.pseudo_label') }} : {{ capitalizeFirstLetter(data.username) }}</h2>
      <h2>{{ t('user_card.email_label') }} : {{ capitalizeFirstLetter(data.email) }}</h2>
    </div>
    <hr class="card_hr">
    <div class="card_bottom_theme">
      <p>{{ t('user_card.user_number') }}{{ data.id }}</p>
    </div>
    <div class="conteneur_card_buttons">
      <button @click="handleDelete(data.id)" class="button_delet">
        <span class="text">{{ t('user_card.delete_button') }}</span>
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>


<script setup>
  import {useI18n} from "vue-i18n";

  const props = defineProps(["data"]);
  const emit = defineEmits(['delete']);
  const { t } = useI18n();
  
  function handleDelete(id) {
    emit('delete', id);
  }
  function  capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
  
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/scss/var";
  .theme_card {
    width: 100%;
    background: rgba(217, 217, 217, 0.58);
    border-radius: 17px;
    padding: 20px;
  }
  
  img {
    width: 40px;
      margin: 7px;
  }
  .card {
      box-sizing: border-box;
      width: 470px;
      height: 280px;
      background: rgba(217, 217, 217, 0.58);
      border: 1px solid white;
      box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
      border-radius: 17px;
      text-align: center;
      cursor: pointer;
      transition: all 0.5s;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
      user-select: none;
      font-weight: bolder;
      color: black;
      margin-bottom: 10px;
  }
  
  .card:hover {
      border: 1px solid black;
      transform: scale(1.05);
  }
  
  
  .card_top {
      font-size: 17px;
      font-weight: bold;
      text-align: start;
      font-family: $base-font;
      margin-right: 30px;
      margin-left: 10px;
      margin-top: 20px;
  }
  #card_reponse_image {
      display: flex;
      justify-content: space-between;
      margin-right: 30px;
      margin-left: 10px;
      font-family: $base-font;
      margin-top: 25px;
      text-align: start;
  }
  #card_image {
      margin-left: 70px;
  }
  .card_hr {
      width: 70%;
     margin: 0 auto;
     margin-top: 18px;
      margin-bottom: 18px;
  }
  .card_bottom_theme{
      display: flex;
      justify-content: space-between;
      margin-right: 30px;
      margin-left: 10px;
      font-family: $base-font;
      margin-top: 10px;
      text-align: start;
      flex-direction:column-reverse;
  
      p{
          margin-top: 5px;
      
      }
  }
  .card_bottom{
      display: flex;
      justify-content: space-between;
      margin-right: 30px;
      margin-left: 10px;
      font-family: $base-font;
      margin-top: 10px;
      text-align: start;
      flex-direction: row-reverse;
  }
  .conteneur_card_buttons {
    display: flex;
      justify-content: space-between;
      margin-right: 30px;
      margin-left: 6px;
      font-family: "Raleway", sans-serif;
      margin-top: 10px;
      text-align: start;
      flex-direction: row;
      margin-bottom: 10px;
  }
  </style>
  