<script setup>
const { roomName, creatorName, types } = defineProps(['roomName', 'creatorName', 'types']);
</script>

<template>
    <div class="card_wrapper">
        <div class="card_left">
            <h3>{{ roomName }}</h3>
            <p>Créer par <b>{{ creatorName }}</b></p>
            <ul class="card_list">
                <li>
                    <div class="type">{{ types }}</div>
                </li>
                <li>
                    <div class="type">{{ types }}</div>
                </li>
            </ul>
        </div>
        <div class="card_right">
            <div class="card_btn">
                <router-link to="/home">Rejoindre</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card_wrapper {
    display: grid;
    width: 400px;
    height: 220px;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 10px;
    padding: 15px;
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(46,44,61,0) 100%), url('../assets/images/feuilles.png');
}

.card_left h3 {
    text-transform: capitalize;
    color: white;
}

.card_left p {
    color: white;
}

.card_list {
    display: flex;
    padding-inline-start: 0px;
}

.card_list li{
    list-style: none;
    width: max-content;
    background: white;
    margin: 10px 5px;
    padding: 5px 10px;
    border-radius: 20px;
}

.card_right {
    align-self: flex-end;
    width: 100%;
}

.card_btn a{
    display: flex;
    background-color: blueviolet;
    padding: 5px;
    border-radius: 10px;
    height: 50px;
    align-items: center;
    justify-content: center;
}

</style>
