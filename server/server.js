const express = require('express');
const http = require('http');
const cors = require('cors');
const { error } = require('console');
const { Game } = require('./utils');


// partie serveur
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
};

app.use(cors(corsOptions));

const game = new Game();

//socket
io.on("connection", (socket) => {
    socket.on('first-connexion', (callback) => {
        const user = game.createUser()
        console.log(user)
        callback(user)
    })

    //deconnexion
    socket.on('disconnect', () => {
console.log(socket.id + ' disconnected');
    });

    socket.on('create-room', (room, callback) => {
        const res = game.createRoom(room.name, room.creator, room.privacy)
        callback(res)
        socket.emit('owner', true)
    })

    socket.on('add-player', (user, roomID) => {
        game.addPlayer(user, roomID)
        socket.join(roomID)
        io.to(roomID).emit('get-players', game.getPlayers(roomID))

        if (game.getRoom(roomID).creator.token === user.token) {
            socket.emit('owner', true)
        }

    })

    socket.on('join-room', (room, callback) => {
        const res = game.joinRoom(room, socket.id)
        callback(res)
    })


    socket.on('start-game', (roomID) => {
      console.log('start-game', roomID)
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));