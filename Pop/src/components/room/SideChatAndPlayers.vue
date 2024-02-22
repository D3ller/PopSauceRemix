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
            <p>Score: 40</p>
          </div>
        </div>
  </div>
    </div>

    <div class="side_chat">
      <h3>Chat</h3>
      <div class="chat_container">
        <div class="chat_message">
        <p>{{ props.player[0].username }}</p>
      </div>
      <div class="chat_input">
        <input class="input" type="text" placeholder="Ecrire un message" />
        <button><img src="@/assets/images/avion-en-papier.png" alt="icone d'avion en papier"> Envoyer</button>
      </div>
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
  color: #D9D9D9;
  font-family: Raleway, sans-serif;
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
  color: #222222;
}

#player_contener_name_player{
 margin: 25px;
}
#player_contener_picture_player{
  width: 15%;
  margin: 10px;
}
.side_chat{
 display: flex;
 flex-direction: column;
    justify-content: space-between;
}
.side_chat h3 {
  margin-left: 15px;
}
.chat_container{
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  height: 100%;
  margin-bottom: 10px;
}
.chat_input{
  display: flex;
}
.input {
  width: 100%;
  max-width: 180px;
  height: 40px;
  padding: 6px;
 
  border: 1.5px solid lightgrey;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 0px 20px -18px;
}

.input:hover {
  border: 2px solid lightgrey;
  box-shadow: 0px 0px 20px -17px;
}

.input:active {
  transform: scale(0.95);
}

.input:focus {
  border: 2px solid grey;
}
button {
  font-family: inherit;
    font-size: 12px;
    background: royalblue;
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    border: none;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
}
button img{
  width: 20px;
  margin-right: 5px;
}
</style>