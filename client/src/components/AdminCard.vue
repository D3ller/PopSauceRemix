<script setup>
defineProps({
    cards: Object
    
})

</script>
<template>
    <div class="card">
        <p>ID : {{ cards.id }}</p>
        <p>Question : {{ cards.question }}</p>
        
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
            <p>Image : {{ cards.image }}</p>
        </div>
        <div id="conteneur_button">
          
        </div>
       
    </div>
</template>
<style>
.card {
    box-sizing: border-box;
    width: 500px;
    height: 204px;
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
}

.card:hover {
    border: 1px solid black;
    transform: scale(1.05);
}

.card:active {
    transform: scale(0.95) rotateZ(1.7deg);
}


#conteneur_button{
    display: flex;
    justify-content: center;
}
</style>
