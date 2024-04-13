<script setup>
import Tr from "@/i18n/translation.js";
import {useI18n} from "vue-i18n";
import BlueButton from "@/components/Button/BlueButton.vue";

const { roomName, players, types, roomId, themes } = defineProps(['roomName', 'players', 'types', 'roomId', 'themes']);
const { t, locale } = useI18n();

console.log(themes)

</script>

<template>
    <div class="card_wrapper">

      <img class="images" :src="t('theme.bio.image')" alt="room image" v-if="themes === String(1)">
      <img class="images" :src="t('theme.eco-geste.image')" alt="room image" v-if="themes === String(2)">
      <img class="images" :src="t('theme.renewable.image')" alt="room image" v-if="themes === String(3)">
      <img class="images" :src="t('theme.transport.image')" alt="room image" v-if="themes === String(4)">

        <div class="card_left">
            <h2>{{ roomName }}</h2>

          <div class="flex">

            <div class="flex">
  <span v-if="themes === String(1)">{{ t('theme.bio.title')}}</span>
  <span v-if="themes === String(2)">{{ t('theme.eco-geste.title')}}</span>
  <span v-if="themes === String(3)">{{ t('theme.renewable.title')}}</span>
  <span v-if="themes === String(4)">{{ t('theme.transport.title')}}</span>
</div>
          </div>
        </div>
      <h3 class="players">            {{players}} joueurs
      </h3>
        <div class="card_right">
            <div>
                <router-link :to="Tr.i18nRoute({ name: 'room', params: {id:roomId} })"><BlueButton style="width: 100%">{{ t('components.RoomCard.join') }}</BlueButton>
                    </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300,400,500,600,700&display=swap');

.card_wrapper {
    width: 400px;
    border-radius: 10px;
    padding: 15px;
  background: #ffffff;
  border: 1px rgba(108, 132, 157, 0.46) solid;
  font-family: Poppins, sans-serif;
  overflow: hidden;

}

.players {
  margin-bottom: 10px;
  font-size: 16px;
}

.images {
  width: 100%; height: 100px; object-fit: cover; border-radius: 10px;
}

.flex {
  display: flex;
  flex-direction: row;
  gap: 0.375rem;
  width: max-content;
  overflow: auto;
}

.card_left h3 {
    text-transform: capitalize;
    color: #000000;
    font-weight: 600;
  font-size: 18px;
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
  width: 100%;
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
