const express = require('express');
const http = require('http');
const cors = require('cors');
const { error } = require('console');
const { Game } = require('./utils');
const path = require('path');


const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "https://popsauce.karibsen.fr",
        methods: ["GET", "POST"]
    }
});

const corsOptions = {
    origin: ['https://popsauce.karibsen.fr'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use('/output/', (req, res, next) => {
    console.log('Accessing static path: ', req.path);
    next();
});
app.use('/output/', express.static(path.join(__dirname, 'output')));

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

            if(res === false) {
                delete game.rooms[roomID]
                console.log("room deleted")
                io.emit('public-room', game.getPublicRooms())
            }
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


    socket.on('start-game', async (roomID, selected, callback) => {
        console.log("start game", roomID, selected)
        const all = game.getAllQuestions(roomID, selected);
        await all
        let timeInterval;
        let sendNewQuestionTimeout;

        const clearIntervals = () => {
            clearInterval(timeInterval);
            clearTimeout(sendNewQuestionTimeout);
        };


        async function sendNewQuestion() {
            const question = await game.chooseQuestion(roomID);
            if(question.type === "no-questions") {
                io.to(roomID).emit('game-over', { winner: 'no-question' });
                return;
            }
            if(question.type === "error") {
                socket.leave(roomID)
                io.emit('public-room', game.getPublicRooms())
                return

            }
            console.log("question", question)
            io.to(roomID).emit('question', question);
            let timeLeft = 20;
            io.to(roomID).emit('time-left', timeLeft);
            timeInterval = setInterval(() => {
                timeLeft--;
                io.to(roomID).emit('time-left', timeLeft);
                if (timeLeft === 0) {
                    clearInterval(timeInterval);
                    io.to(roomID).emit('answer', game.getAnswer(roomID));
                    sendNewQuestionTimeout = setTimeout(sendNewQuestion, 3000);
                }
            }, 1000);
        }


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





    socket.on('reponse', (reponse, roomID, user, lang, callback) => {
        const res = game.checkReponse(reponse, roomID, user, lang);
        if (res.message) {
            io.to(roomID).emit('get-points', game.getScore(roomID))
        }
        callback(res)
    });

    socket.on('get-rooms-info', (roomID, callback) => {
        const res = game.getRoomInfo(roomID)
        callback(res)
    })

    socket.on('send-end', (roomID, user) => {
        io.to(roomID).emit('game-over', { winner: user });
    })

    socket.on('get-public-room', (callback) => {
        callback(game.getPublicRooms())
    })

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));


