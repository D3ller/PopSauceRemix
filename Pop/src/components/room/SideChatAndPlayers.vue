<script setup>
const props = defineProps({
  player: Array
});

console.log(props)
</script>

<template>

  <div class="side">
    <div class="side_players">
    <h3>Tableaux des scores</h3>
      <div class="players_container">
        <div class="player" v-for="player in props.player">
          <div id="player_contener">
            <img id="player_contener_picture_player" src="@/assets/images/cirlce_user.png" alt="image_du_player">
            <p id="player_contener_name_player">{{ player.username }}</p>
          </div>
        </div>
  </div>
    </div>

    <div class="side_chat">
      <h3>Chat</h3>
      <div class="chat_container">
        <div class="chat_message">
          <p>Username</p>
          <p>Message</p>
        </div>
      </div>
      <div class="chat_input">
        <input type="text" placeholder="Ecrire un message" />
        <button>Envoyer</button>
      </div>
    </div>

  </div>

</template>

<style scoped>
.side {
  width: 360px;
  background: #222222;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.side_players h3 {
  margin-top: 20px;
  font-family: Raleway, sans-serif;
  font-weight: 400;
  font-size: 22px;
  color: white;
  text-align: center;
}
#player_contener{
  background-color: #D9D9D9;
  width: 95%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin: 10px;
  height: 50px;
}
#player_contener_name_player{
 font-family: 'Courier New', Courier, monospace;
 margin: 25px;
}
#player_contener_picture_player{
  width: 15%;
  margin: 10px;
}
</style>