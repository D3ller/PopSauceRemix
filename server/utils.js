class Game {
    constructor() {
        this.rooms = [];
        this.players = [];
    }

    createUser() {
        let user = {};

        function generateToken(length) {
            let token = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                token += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return token;
        }

        let name = `guest${Math.floor(Math.random() * 1000)}`;

        return user = {
            name: name,
            token: generateToken(30)
        }
    }

    createRoom(roomName, username, privacy) {
        let roomID = Math.random().toString(36).substr(2, 9)

        let room = {
            id: roomID,
            name: roomName,
            creator: username,
            players: [],
            privacy: privacy
        }

        if (this.rooms.find(y => y.creator == room.creator)) {
            return {type: 'error', error: 'you already have a room'}
        } else {
            this.rooms.push(room);
            console.log("room created", this.rooms);
            return {type: 'message', message: 'congrat, room created', room: room};
        }
    }

    addPlayer(user, roomID) {
        let player = {
            name: user.name,
            token: user.token,
            roomID: roomID
        }

        this.players.push(player)

        let room = this.rooms.find(y => y.id == roomID)

        let isExist = room.players.find(y => y.token == player.token)

        if(!isExist) {
            room.players.push(player)
        } else {
            console.log("deja dans la room")
        }

        console.log(room.players)
        return player;
    }
}

module.exports = { Game }