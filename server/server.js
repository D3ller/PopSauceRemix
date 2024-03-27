const express = require('express');
const http = require('http');
const cors = require('cors');
const { error } = require('console');
const { Game } = require('./utils');


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
    socket.emit('public-room',game.getPublicRooms())

    socket.on('first-connexion', (callback) => {
        const user = game.createUser()
        console.log(user)
        callback(user)
    })

    //deconnexion
    socket.on('disconnect', (user) => {
        console.log(socket.id + ' disconnected');
    });

    socket.on('choose-theme', (theme, roomId, callback) => {
        const res = game.chooseTheme(theme, roomId)
        callback(res)

    })

    socket.on('create-room', (room, callback) => {
        const res = game.createRoom(room.name, room.creator, room.privacy)
        callback(res)
        socket.emit('owner', true)
        if(res.type === "message") {
            io.emit('public-room', game.getPublicRooms())

        }
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
            socket.leave(roomID)
        } else {
            console.log(user.name + " a quitté la room " + roomID)
            const res = game.removePlayer(user, roomID)
            socket.leave(roomID)


            if (res === true) {
                io.to(roomID).emit('get-players', game.getScore(roomID))
            }
        }

    })

    socket.on('join-room', (room, callback) => {
        const res = game.joinRoom(room, socket.id)
        callback(res)
    })

    socket.on('send_message', (message, roomID, name, callback) => {
        io.to(roomID).emit('message', { message: message, user: name });
    })


    socket.on('start-game', (roomID, callback) => {
        let timeInterval;
        let sendNewQuestionTimeout;

        const clearIntervals = () => {
            clearInterval(timeInterval);
            clearTimeout(sendNewQuestionTimeout);
        };

        const sendNewQuestion = () => {
            const question = game.chooseQuestion(roomID);
            io.to(roomID).emit('question', question);
            let timeLeft = 20;
            timeInterval = setInterval(() => {
                io.to(roomID).emit('time-left', timeLeft);
                timeLeft--;
                if (timeLeft === 0) {
                    clearInterval(timeInterval);
                    io.to(roomID).emit('answer', game.getAnswer(roomID));
                    sendNewQuestionTimeout = setTimeout(sendNewQuestion, 5000);
                }
            }, 1000);
        };

        sendNewQuestion();

        let checkEndGameInterval = setInterval(() => {
            const winner = game.checkGameEnd(roomID);

            if (winner) {
                clearInterval(checkEndGameInterval);
                clearIntervals();
                console.log("winner", winner);
                io.to(roomID).emit('game-over', { winner: winner });
            }
        }, 25000);
    });





    socket.on('reponse', (reponse, roomID, user, callback) => {
        const res = game.checkReponse(reponse, roomID, user);
        if (res.message) {
            io.to(roomID).emit('get-points', game.getScore(roomID))
        }
        callback(res)
    });

    socket.on('get-rooms-info', (roomID, callback) => {
      const res = game.getRoomInfo(roomID)
        callback(res)
    })


});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));