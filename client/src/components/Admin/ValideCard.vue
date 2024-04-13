<script setup>
const emit = defineEmits(['delete']);
defineProps({
    cards: Object,
    numero: Number,
    theme: Object,
    icone: String,

})

  function  capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function handleDelete(id) {
  emit('delete', id);
}

</script>
<template>
  
    <div class="card">
        <p class="card_top">{{ capitalizeFirstLetter(cards.question) }}</p>
        <div id="card_reponse_image">
        <div v-if="cards.reponse2 ">
            <div class="block_reponse">
            <div>
            <p>Reponse 1 : {{ cards.reponse1 }}</p>
            <p>Reponse 2 : {{ cards.reponse2 }}</p>
            <p>Reponse 3 : {{ cards.reponse3 }}</p>
            <p>Reponse 4 : {{ cards.reponse4 }}</p>
            </div>
            <div class="bonne_reponse">
            <p class="bonne_reponse_texte">Bonne réponse: {{ cards.bonne_reponse }}</p>
            </div>
            </div>
            
           
        </div>
        <div v-else>
            <p>Reponse 1 : {{ cards.reponse1 }}</p>
        </div>
        <div v-if="cards.image">
            <p class="texte_image">Image:</p>
            <p>{{ cards.reponse1 }}.png </p>
        </div>
    </div>
    <hr class="card_hr">
    <div class="card_bottom">
        <p class="numero_question">n° {{ cards.id }}</p>
    </div>   
    <div class="conteneur_card_buttons">
      <button @click="handleDelete(cards.id)" class="button_delet">
        <span class="text">Supprimer</span>
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
          </svg>
        </span>
      </button>
      <button @click="$router.push('question/'+cards.id)" class="Button_edit">Modifier
        <svg class="svg" viewBox="0 0 512 512">
          <path
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
          </path>
        </svg>
      </button>
    </div>
    </div>
</template>
<style lang="scss">
@import "@/assets/scss/var";
.card {
    box-sizing: border-box;
    width: 470px;
    height: 315px;
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
    position: relative;
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
    width: 400px;
}
#card_reponse_image {
    display: flex;
    justify-content: space-between;
    margin-right: 30px;
    margin-left: 10px;
    font-family: $base-font;
    margin-top: 25px;
    text-align: start;
    width: 90%;
}
#card_image {
    margin-left: 70px;
}
.card_hr {
    width: 70%;
   margin: 0 auto;
   margin-top: 20px;
    margin-bottom: 20px;
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
        margin-top: 10px;
    
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
.block_reponse{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}
.icone{
    width: 40px;
    height: 40px;
    position: absolute;
    top: 3%;
    right: 1%;
}
.numero_question{
    margin-left: 160px;
}   
.bonne_reponse_texte{
        width: 150px;
}
.bonne_reponse{
    margin-left: 30px;
}
.image_question{
    width: 80px;
    height: 80px;
    margin-left: 30px;
}
.texte_image{
    margin-left: 30px;
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
