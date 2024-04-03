<script setup>

defineProps({
    cards: Object,
    numero: Number,
    lien: String,
    theme: Object,
    icone: String,
    
})

  function  capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
   

</script>
<template>
  
    <div class="card">
        <div v-if="lien === 'question'">
        <p class="card_top">{{ capitalizeFirstLetter(cards.question) }}</p>
        <div id="card_reponse_image">
        <div v-if="cards.reponse2 ">
            <p>Reponse 1 : {{ cards.reponse1 }}</p>
            <p>Reponse 2 : {{ cards.reponse2 }}</p>
            <p>Reponse 3 : {{ cards.reponse3 }}</p>
            <p>Reponse 4 : {{ cards.reponse4 }}</p>
        </div>
        <div v-else>
            <p>Reponse 1 : {{ cards.reponse1 }}</p>
        </div>
        <div v-if="cards.image">
            <p id="card_image">Image : {{ cards.image }}</p>
        </div>
    </div>
    <hr class="card_hr">
    <div class="card_bottom">
        <p>n° {{ numero }}</p>
        <p>Thème : {{  capitalizeFirstLetter(theme.nomThemes) }}</p>
    </div>
       
    </div>
    <div v-else-if="lien === 'themes'">
        <p class="card_top">Thème : {{capitalizeFirstLetter(cards.nomThemes) }}</p>
        <hr class="card_hr">
        <div class="card_bottom_theme">
            <p>n°{{ cards.originalIndex + 1 }}</p>
        <p>Nombre de questions : {{ cards.questions.length }}</p>
        </div>
       
    </div>
    </div>
</template>
<style lang="scss">
@import "@/assets/scss/_var.scss";
.card {
    box-sizing: border-box;
    width: 470px;
    height: 250px;
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

</style>
