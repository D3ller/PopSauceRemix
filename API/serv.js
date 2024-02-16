const express = require('express');
const http = require('http');
const cors = require('cors');


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
let rooms = {};

io.on('connection', (socket) => {
    console.log('Un client est connecté', socket.id);

//Récupérer les rooms publiques
    socket.on('getPublicRooms', () => {
        let publicRooms = Object.keys(rooms).filter(room => rooms[room].privacy === false);
        console.log('publicRooms:', publicRooms);
        socket.emit('publicRooms', publicRooms);

    })

    //Lorsqu'un client se déconnecte
    socket.on('disconnect', () => {
        console.log('Un client s\'est déconnecté', socket.id);

    });

    //Lorsqu'un client envoie un message
    socket.on('message', (message, room) => {
        console.log('Un client a envoyé un message', message);
        socket.to(room).emit('message', message);
    });

    //Lorsqu'un client crée une room
    socket.on('createRoom', (room, privacy, username) => {
        console.log(room);
        console.log('Le client:', socket.id, 'a créé la room:', room);

        if(room === '') {
            //Le nom de la room est vide
            socket.emit('roomNameEmpty');
            return;
        }

        if(room.length < 3) {
            //Le nom de la room est trop court
            socket.emit('roomNameTooShort');
            return;
        }

        let findRoom = Object.keys(rooms).find(room => rooms[room].players.includes(socket.id));
        if (findRoom) {
            //Le client est déjà dans une room
            socket.emit('alreadyInRoom', findRoom);
            return;
        }

        rooms[room] = {
            id: Math.random().toString(36).substr(2, 9),
            players: [],
            creator: socket.id,
            privacy: privacy
        };

        let you = {id: socket.id, username: username};
        socket.join(room);

        rooms[room].players.push(you);

        console.log(`Room status:`, rooms);
        console.log(rooms[room].players);

        //Envoyer un message au client pour lui dire que la room a été créée
        socket.emit('roomCreated', room, rooms[room].id);
        socket.emit('roomUpdated', rooms[room].players);

        if(privacy) {

        } else {
            let publicRooms = Object.keys(rooms).filter(room => rooms[room].privacy === false);
            //Envoyer un message à tous les clients pour leur dire qu'une nouvelle room a été créée
            io.emit('publicRooms', publicRooms);
            console.log('publicRooms:', publicRooms);
        }
    });

    socket.on('getSocketId', () => {
        //Envoyer le socketId au client
        socket.emit('socketId', socket.id);
    })

    socket.on('joinRoom', (inviteCode, username) => {
        console.log('inviteCode:', inviteCode);

        let foundRoom = Object.keys(rooms).find(room => rooms[room].id === inviteCode);
        console.log('Le client:', socket.id, 'a demandé à rejoindre la room:', inviteCode);

        if (foundRoom) {

            let findRoom = Object.keys(rooms).find(room => rooms[room].players.includes(socket.id));
            if (findRoom) {
                //Le client est déjà dans une room
                socket.emit('alreadyInRoom', findRoom);
                return;
            }

            if (!rooms[foundRoom].players.includes(socket.id)) {
                let you = {id: socket.id, username: username};
                rooms[foundRoom].players.push(you);
                socket.join(foundRoom);
                console.log(`Le client: ${socket.id} a rejoint la room: ${foundRoom} avec le code: ${inviteCode}`);
                console.log(`Room status:`, rooms);
                //Envoyer un message au client pour lui dire qu'il a rejoint la room
                socket.emit('roomJoined', foundRoom, inviteCode);
                console.log("rooms[foundRoom].players");
                socket.emit('roomUpdated', rooms[foundRoom].players);
                //Envoyer un message à tous les clients pour leur dire que la room a été mise à jour
                socket.to(foundRoom).emit('roomUpdated', rooms[foundRoom].players);
            } else {
                //Le client est déjà dans la room
                socket.emit('alreadyInRoom', foundRoom);
            }
        } else {
            //La room n'existe pas
            socket.emit('roomNotFound', inviteCode);
        }
    });

    socket.on('leaveRoom', (room) => {
        let findRoom = Object.keys(rooms).find(room => rooms[room].players.includes(socket.id));

        if (findRoom) {
            socket.leave(findRoom);
            rooms[findRoom].players = rooms[findRoom].players.filter(playerId => playerId !== socket.id);
            if (rooms[findRoom].players.length === 0) {
                delete rooms[findRoom];
                socket.emit('roomClosed', findRoom);
                let publicRooms = Object.keys(rooms).filter(room => rooms[room].privacy === false);
                io.emit('publicRooms', publicRooms);
            } else {
                socket.to(findRoom).emit('roomUpdated', rooms[findRoom].players);
            }
            socket.emit('roomLeft', findRoom);

        } else {
            console.log('Le client:', socket.id, 'n\'est pas dans une room')
            socket.emit('notInRoom');
        }
    });

    socket.on('chatEnter', (room) => {
        console.log(room)
        let findRoom = Object.keys(rooms).find(room => rooms[room].players.includes(socket.id));
        if (findRoom) {
            socket.emit('chatEnter', room);
            socket.to(findRoom).emit('chatEnter', room);
        } else {
            socket.emit('chatNotFound', room);
        }

    })
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));