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
        socket.emit('publicRooms', publicRooms);

    })

    socket.on('disconnect', () => {
        console.log('Un client s\'est déconnecté', socket.id);
        for (let room in rooms) {
            if (rooms[room].players.includes(socket.id)) {
                if (rooms[room].creator === socket.id) {
                    io.to(room).emit('roomClosed', room);
                    delete rooms[room];
                    let publicRooms = Object.keys(rooms).filter(room => rooms[room].privacy === false);
                    io.emit('publicRooms', publicRooms);
                } else {
                    rooms[room].players = rooms[room].players.filter(playerId => playerId !== socket.id);
                    if (rooms[room].players.length === 0) {
                        delete rooms[room];
                        let publicRooms = Object.keys(rooms).filter(room => rooms[room].privacy === false);
                        io.emit('publicRooms', publicRooms);

                    } else {
                        socket.to(room).emit('roomUpdated', rooms[room].players);
                    }
                }
                break;
            }
        }
    });

    socket.on('message', (message, room) => {
        console.log('Un client a envoyé un message', message);
        socket.to(room).emit('message', message);
    });

    socket.on('createRoom', (room, privacy) => {
        console.log(room);
        console.log('Le client:', socket.id, 'a créé la room:', room);

        let findRoom = Object.keys(rooms).find(room => rooms[room].players.includes(socket.id));
        if (findRoom) {
            socket.emit('alreadyInRoom', findRoom);
            return;
        }

        if (!rooms[room]) {
            rooms[room] = { players: [], category: [], creator: socket.id, privacy: privacy};
        }

        rooms[room].id = Math.random().toString(36).substr(2, 9);
        rooms[room].players.push(socket.id);

        socket.join(room);

        console.log(`Room status:`, rooms);

        socket.emit('roomCreated', room, rooms[room].id);
        socket.emit('roomUpdated', rooms[room].players);

        if(privacy) {

        } else {
            let publicRooms = Object.keys(rooms).filter(room => rooms[room].privacy === false);
            io.emit('publicRooms', publicRooms);
        }
    });

    socket.on('joinRoom', (inviteCode) => {
        let foundRoom = Object.keys(rooms).find(room => rooms[room].id === inviteCode.inviteCode);
        console.log('Le client:', socket.id, 'a demandé à rejoindre la room:', inviteCode);

        if (foundRoom) {

            let findRoom = Object.keys(rooms).find(room => rooms[room].players.includes(socket.id));
            if (findRoom) {
                socket.emit('alreadyInRoom', findRoom);
                return;
            }

            if (!rooms[foundRoom].players.includes(socket.id)) {
                rooms[foundRoom].players.push(socket.id);
                socket.join(foundRoom);
                console.log(`Le client: ${socket.id} a rejoint la room: ${foundRoom} avec le code: ${inviteCode.inviteCode}`);
                console.log(`Room status:`, rooms);
                socket.emit('roomJoined', foundRoom);
                socket.emit('roomUpdated', rooms[foundRoom].players);
                socket.to(foundRoom).emit('roomUpdated', rooms[foundRoom].players);
            } else {
                socket.emit('alreadyInRoom', foundRoom);
            }
        } else {
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
