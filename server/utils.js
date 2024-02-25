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
            creator: {name: username.name, token: username.token},
            players: [],
            privacy: privacy
        }

        if (this.rooms.find(y => y.creator.token === username.token)) {
            return {type: 'error', error: 'you already have a room'}
        } else {
            this.rooms.push(room);
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

        let room = this.rooms.find(x => x.id === roomID)

        let isExist = room.players.find(y => y.token === player.token)

        if(!isExist) {
            room.players.push(player)
        } else {
            return {type: 'error', error: 'you are already in the room'}
        }
        return {type: 'message', message: 'congrat, you are in the room', room: room}
    }

    joinRoom(room) {
        let roomID = room.id;
        let roomExist = this.rooms.find(x => x.id === roomID)

        if (roomExist) {
            let player = this.players.find(x => x.token === room.token)
            if (player) {
                return {type: 'error', error: 'you are already in a room'}
            } else {
                return {type: 'message', message: 'congrat, you are in the room', room: roomExist}
            }
        } else {
            return {type: 'error', error: 'room does not exist'}
        }
    }

    getPlayers(roomID) {
        let room = this.rooms.find(x => x.id === roomID)
        return room.players;
    }

    getRoom(roomID) {
        return this.rooms.find(x => x.id === roomID);
    }


}

module.exports = { Game }