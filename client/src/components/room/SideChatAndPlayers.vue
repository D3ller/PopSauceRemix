<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import socket from "@/socket.js";
let myMessage = ref('');
let message = ref([]);

const props = defineProps({
  player: Object,
  rooms: String,
});

console.log(props);

// Cette fonction simule une opération asynchrone qui attend que 'currentToken' soit non nul ou non vide.
async function waitForToken() {
  let currentToken = localStorage.getItem('user');
  // Boucle jusqu'à ce que currentToken soit non vide
  while (!currentToken) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde avant de vérifier à nouveau
    currentToken = localStorage.getItem('user');
  }
  return JSON.parse(currentToken);
}

async function sendMessage(event) {
  if (event.target.value.length > 0) {
    event.target.value = '';

    const currentToken = await waitForToken();

    const playerExists = props.player.some(player => player.token === currentToken.token); // Supposons que vous vouliez comparer les tokens
console.log(playerExists)

    if(playerExists) {
      socket.emit('send_message', myMessage.value, props.rooms, currentToken.name, (message) => {
        console.log(message);
      });
    }
  }
}


socket.on('message', (msg) => {
  message.value.push(msg);
  const chat = document.querySelector('.message_container');
  chat.scrollTop = chat.scrollHeight-100000
  chat.style.transition = 'all 0.5s';
})

console.log(props)
const { t, locale } = useI18n();

</script>

<template>

  <div class="side">
    <div class="side_players">
      <h3>{{ t('components.SideChatAndPlayers.scoreboard') }}</h3>
      <div class="players_container">
        <div class="player" v-for="player in props.player">
          <div class="player_data">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARgSURBVHgBtVfNTltHFP5mbBMobmuClEoExTYlNiZdQFOxQY3gDZonSPIESXbdFTZVVxV9gpoHqEm7QIGilmVTFmYB2IDVexHGAgLqRYT49870zBi7prVh3IZPGu71MDPnm3O+OWcuQ5tIWVYIZUyAIeThnmC1VzquECdcYFVQi8XCdhtL0lIGSCatgP8D71MhxWP6GbpqPANbdgVmY5E7cRiAGRmHeAaJANoFgy1cNn0VmZYktrasEenhc2Q8hP8LSWGqiIetwsSbdWas7CPJefKdEFBgGOEd/NdUivTU9N9NCLiuG8f1wCkLMflJJLyKViQUU+7jFq4TSiclMdkYmno4lAiVy3DdoBB7fJ7vG7vqJNQpMNWAmsSkBGdMP7U76WnOQ05sblpf1H7r+e2GQZDBtbU12LaFYrGIrq73cG94GAMDAxCUrRgzSD8UlujHwbB69aL69zEMkc/nMb+4iNdHR1WDqvNPB3u5HIaHhvD5gwdmXiGvp7atidjd8LIOB+f8EQygdphMJnF0eAwpKBTwUG+1KbOpzTRS6RRMwblH2+UqKZlq4fj4GOvr62i1T0ke+P3VKxQKBRhBSq0LLrlhQiLL2d1dCCUrtHZ3gTSyv7+vCRkg8EcuF+RCYsRkNOOMdPAaJksr3RiJk1B8U5zkpqGQJMIbHTeMyq7P50M74MYjaWeBnh7KC9DtMnR1dsF8XYS8aAN9fX3VWLdwhwpBd3c3bn10C8aQsDnjcEzH9/b2IhqNkjGVJQW50a03lTklCexebBher/neaJrDJV3HTCeo5DQ+Po6hoQjNdvU2dGNKB158OjqKsbExY1HqNSlzsv9UOemklEol7Ozs6Kff78ftvtvwejxoE050MNijKW9mqAiAhUxnMq0LpguYPN+1rKVwgjBdCCweHbzzRAePCtIsLfiVybSDgwNsZbZxeHiI09NTVIQLX0cHPvS/j/7+fipiYdwM3DRZCnR5+lFTUX8sywqUBIWkxWW24lbI4Bv8Rik5u5eFK6SeKklQsrb982PbQaKM3h3E/fuf0VHtvEwfNoVCV1GdJ8LhsEOi+67ZSJUps7tZzL2Yg71r651LyXRThYvJ84ZqK1cENlIpJOYSeJt/24oAiZxN197ryarTixnF7p+Dc3s5LC0toVwuw/AzRePs7AyJREI/m2wt3vgZUCehvMGEeEh2dN5QhVot8HJxobp7RYB2rNulZMhLurR7cJYv4uXCAkqVcuMAW5Td6caOC2k7Qrdg4Yrn6l1VypWVFX0E/44rg4k3pCZSHaeKXjqdbiBw8ZL7LxIKsUg4Tvp44hC2M5kGw+Zl5oIBzrGxsaFOdFMCTUnUiPzy8/yokK4tyK1Cu9dcD41QtcY5OVn+4af5yVZfYFeu/OzLqSlaSV3DQmgTVF8cxtzn337zdfzycQYgIiF6TFBWe6o+6QymLJP/Z1HAi5mZqSsLZNs+1oSEIiKqZBgLkqd26MWhPL5KhldNDDfiL0H1+972vrXcAAAAAElFTkSuQmCC" alt="image_du_player">
            <p class="player_username">{{ player.name }}</p>
          </div>
          <div class="player_data rounded">
          <p>{{player.points > 100 ? 100 : player.points}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="side_chat">
      <div class="chat_message">
        <TransitionGroup name="fade" tag="div" class="message_container">
          <div class="message" v-for="msg in message">{{msg.user}} : {{ msg.message }}</div>
        </TransitionGroup>
      </div>
      <div class="chat_container">

        <div class="chat_input">
          <input @keyup.enter="sendMessage($event)" v-model="myMessage" :min="1" max="40" class="input" type="text" :placeholder="t('components.SideChatAndPlayers.writechat')" />
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
@import "@/assets/scss/_var.scss";

.side {
  width: 360px;
  background: $dark-bg;
  height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr;
  color: #D9D9D9;
  font-family: Raleway, sans-serif;
  padding: 20px;

}

.side_players, .side_chat {
  height: 100%;
  overflow: hidden;
}

.side_players {
  border-bottom: 1px solid #282828;
}

.side_players h3, .side_chat h3 {
  margin: 20px 0;
  font-family: $base-font;
  font-weight: 400;
  font-size: 22px;
  color: white;
  text-align: center;
}

.players_container {
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.player {
  background-color: #f5f5f7;
  width: 95%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 50px;
  color: #222222;
  margin: 0 auto;
}

.player_data {
  display: flex;
  align-items: center;
}

.player_data.rounded {
  background-color: #222222;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  height: 30px;
  text-align: center;
}

.player img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.player_username {
  font-weight: 500;
  font-size: 14px;
  margin-right: 10px;
}


.side_chat{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat_container{
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  height: 100%;
  margin-bottom: 10px;
}
.chat_input{
  width: 100%;
  height: 30px;
}

.message_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 286px;
  overflow: auto;
  .message {
    background: lighten($dark-bg, 5%);
    padding: 10px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: darken($dark-bg, 10%);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: lighten($dark-bg, 5%);
  }
}

.input {
  width: 100%;
  height: 100%;
  text-indent: 6px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 0px 20px -18px;
  border-radius: 10px;
  background: darken($dark-bg, 25%);
  font-family: $base-font;
  border: 1px solid rgba(117, 117, 117, 0.31);
  color: white;
  &:hover {
    box-shadow: 0px 0px 20px -17px;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: white;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}


</style>
