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
    socket.on('disconnect', (user) => {
        console.log(socket.id + ' disconnected');
    });

    socket.on('create-room', (room, callback) => {
        const res = game.createRoom(room.name, room.creator, room.privacy)
        callback(res)
        socket.emit('owner', true)
    })

    socket.on('add-player', (user, roomID, callback) => {
        var res = game.addPlayer(user, roomID)
        socket.join(roomID)
        callback(res)

        if (res.code !== 404) {
            io.to(roomID).emit('get-players', game.getScore(roomID))


            if (game.getRoom(roomID).creator.token === user.token) {
                socket.emit('owner', true)
            }
        }
    })

    socket.on('remove-player', (user, roomID) => {
        const room = game.getRoom(roomID)

        if (!room) {
            console.log("this room does not exist")
            return
        } else {
            console.log(user.name + " a quitté la room " + roomID)
            const res = game.removePlayer(user, roomID)

            if (res === true) {
                io.to(roomID).emit('get-players', game.getScore(roomID))
            }
        }

    })

    socket.on('join-room', (room, callback) => {
        const res = game.joinRoom(room, socket.id)
        callback(res)
    })


    socket.on('start-game', (roomID, callback) => {
        const res = game.chooseQuestion(roomID);
        io.to(roomID).emit('question', res);
        let timeLeft = 20;
        let timeInterval = setInterval(() => {
            timeLeft--;
            io.to(roomID).emit('time-left', timeLeft);
            if (timeLeft === 0) {
                clearInterval(timeInterval);
            }
        }, 1000);

        let interval = setInterval(() => {
            const winner = game.checkGameEnd(roomID);

            if (winner) {
                clearInterval(interval);
                console.log("winner", winner)
                io.to(roomID).emit('game-over', { winner: winner });
            } else {
                const question = game.chooseQuestion(roomID);
                io.to(roomID).emit('question', question);
                let timeLeft = 20;
                let timeInterval = setInterval(() => {
                    io.to(roomID).emit('time-left', timeLeft);
                    timeLeft--;
                    if (timeLeft === 0) {
                        clearInterval(timeInterval);
                    }
                }, 1000);
            }
        }, 20000);
    });


    socket.on('reponse', (reponse, roomID, user, callback) => {
        const res = game.checkReponse(reponse, roomID, user);
        console.log(game.getRoom(roomID))
        if (res.message) {
            io.to(roomID).emit('get-points', game.getScore(roomID))
        }
        callback(res)
    });

    socket.on('visibility', (test) => {
        console.log(test)
    })


});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));