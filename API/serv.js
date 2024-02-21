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

    socket.on('getPublicRooms', () => {
        let publicRooms = Object.keys(rooms).filter(room => rooms[room].privacy === false);
        io.emit('publicRooms', rooms[publicRooms]);
    })

    socket.on('disconnect', () => {
        console.log('Un client s\'est déconnecté', socket.id);

        // Trouver si le client déconnecté est le créateur d'une room

        let createdRoom = Object.keys(rooms).find(roomKey => String(rooms[roomKey].creator) === String(socket.id));
        console.log('createdRoom:', createdRoom)
        if (createdRoom) {
            console.log('La room:', createdRoom, 'a été fermée')
            let roomPlayers = rooms[createdRoom].players;
            for (let i = 0; i < roomPlayers.length; i++) {
                io.to(roomPlayers[i].id).emit('roomClosed', createdRoom);
            }
            delete rooms[createdRoom];
            io.emit('publicRooms', rooms);

        } else {
            console.log('Je me supprime de toutes les rooms où je suis')
            let findRoom = Object.keys(rooms).find(roomKey => rooms[roomKey].players.find(player => player.id === socket.id));
            if (findRoom) {
                rooms[findRoom].players = rooms[findRoom].players.filter(player => player.id !== socket.id);
                // Si après le départ il n'y a plus de joueur dans la room, supprimer la room
                if (rooms[findRoom].players.length === 0) {
                    io.to(createdRoom).emit('roomClosed', createdRoom);
                    delete rooms[findRoom];
                } else {
                    // Sinon, informer les autres membres de la room que la liste des joueurs a été mise à jour
                    io.to(findRoom).emit('roomUpdated', rooms[findRoom].players);
                }
            }
        }
    });


    //Lorsqu'un client envoie un message
    socket.on('message', (message, room) => {
        console.log('Un client a envoyé un message', message);
        socket.to(room).emit('message', message);
    });

    //Lorsqu'un client crée une room
    socket.on('createRoom', (room, privacy, username, token) => {
        console.log(room);
        console.log('Le client:', socket.id, 'a créé la room:', room);

        if(room === '') {
            //Le nom de la room est vide
            socket.emit('roomNameEmpty');
            return;
        }

        let findRooms = Object.keys(rooms).find(room => rooms[room].players.find(player => player.token === token));
        if (findRooms) {

            socket.emit('cantCreateRoom', findRooms);
            return;
        }

        if(room.length < 3) {
            //Le nom de la room est trop court
            console.log('Le nom de la room est trop court');
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
            name: room,
            id: Math.random().toString(36).substr(2, 9),
            players: [],
            creator: socket.id,
            privacy: privacy
        };

        let you = {id: socket.id, username: username, token: token};
        socket.join(room);

        rooms[room].players.push(you);

        console.log(`Room status:`, rooms);
        console.log(rooms[room].players);

        socket.emit('roomCreated', room, rooms[room].id, socket.id);
        socket.emit('roomUpdated', rooms[room].players);

        if(privacy) {

        } else {
            let publicRooms = Object.keys(rooms).filter(room => rooms[room].privacy === false);
            io.emit('publicRooms', rooms[publicRooms]);
            console.log('publicRooms:', rooms[publicRooms]);
        }
    });

    socket.on('getSocketId', () => {
        //Envoyer le socketId au client
        socket.emit('socketId', socket.id);
    })

    socket.on('getRoomInfo', (inviteCode) => {
        console.log('getRoomInfo:', inviteCode);

        let foundRoomKey = Object.keys(rooms).find(roomKey => rooms[roomKey].id === inviteCode);

        if (foundRoomKey) {
            console.log('Room found:', rooms[foundRoomKey]);
            socket.emit('roomInfo', rooms[foundRoomKey]);
        } else {
            socket.emit('roomNotFound', inviteCode);
        }
    });

    socket.on('joinRoom', (inviteCode, username, token) => {
        console.log('inviteCode:', inviteCode);

        let foundRoom = Object.keys(rooms).find(room => rooms[room].id === inviteCode);
        console.log('Le client:', socket.id, 'a demandé à rejoindre la room:', inviteCode);

        if (foundRoom) {

            //voir si le client est déjà dans une room grace a son token
            let findRoom = Object.keys(rooms).find(room => rooms[room].players.find(player => player.token === token));
            if (findRoom) {
                socket.emit('alreadyInRoom', findRoom);
                return;
            }

            if (!rooms[foundRoom].players.find(player => player.id === socket.id)) {
                let you = {id: socket.id, username: username, token: token};
                console.log(you)
                rooms[foundRoom].players.push(you);
                socket.join(foundRoom);
                console.log(`Le client: ${socket.id} a rejoint la room: ${foundRoom} avec le code: ${inviteCode}`);
                console.log(`Room status:`, rooms);
                //Envoyer un message au client pour lui dire qu'il a rejoint la room
                socket.emit('roomJoined', foundRoom, inviteCode, socket.id);
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
                io.emit('publicRooms', rooms[publicRooms]);
            } else {
                socket.to(findRoom).emit('roomUpdated', rooms[findRoom].players);
            }
            socket.emit('roomLeft', rooms[findRoom].players);

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