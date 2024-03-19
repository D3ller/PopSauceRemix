<script setup>
import Tr from "@/i18n/translation.js";
import {useI18n} from "vue-i18n";

const { roomName, players, types, roomId, themes } = defineProps(['roomName', 'players', 'types', 'roomId', 'themes']);
const { t, locale } = useI18n();

let theme = ['Nature', 'Natural', "Test"]

</script>

<template>
    <div class="card_wrapper">
        <div class="card_left">
            <h3>{{ roomName }}</h3>
<div v-for="t in theme">
  <span>{{ t }} players</span>

</div>
        </div>
        <div class="card_right">
            <div class="card_btn">
                <router-link :to="Tr.i18nRoute({ name: 'room', params: {id:roomId} })">{{ t('components.RoomCard.join') }}</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300,400,500,600,700&display=swap');

.card_wrapper {
    display: grid;
    width: 400px;
    height: 220px;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 10px;
    padding: 15px;
  background: #ffffff;
  border: 1px rgba(108, 132, 157, 0.46) solid;
  font-family: Poppins, sans-serif;

}

.card_left h3 {
    text-transform: capitalize;
    color: #000000;
    font-weight: 600;
}

.card_left p {
    color: #000000;
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
    background-color: #305eff;
    padding: 15px 20px;
    border-radius: 10px;
  color: white;
  text-decoration: none;
  width: auto;
}

.card_left div span {
  display: block;
    color: #000000;
    font-weight: 300;
    font-size: 14px;
    margin: 10px 0;
  background-color: #dbdbdc;
  padding: 5px 10px;
  border-radius: 9999px;
  width: fit-content;
}

</style>
