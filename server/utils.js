let multiple = [
    {
        question: 'Quel est le nombre de départements en France ?',
        reponses: ['101', '102', '103', '104'],
        reponse: '103'
    },
    {
        question: 'Quel est le nombre de régions en France ?',
        reponses: ['11', '12', '13', '14'],
        reponse: '13'
    },
    {
        question: 'Quel est le nombre de communes en France ?',
        reponses: ['36500', '36550', '36600', '36650'],
        reponse: '36500'
    }
]

let input = [
    {
        question: 'Quel est le principal gaz à effet de serre contribuant au réchauffement climatique ?',
        reponse: 'Dioxyde de carbone'
    },
    {
        question: 'Quel est le terme utilisé pour décrire la diminution de la diversité biologique ?',
        reponse: 'Extinction'
    },
    {
        question: 'Quelle pratique agricole est considérée comme bénéfique pour l\'environnement ?',
        reponse: 'Agriculture biologique'
    }
]

let image = [
    {
        question: 'Quel est cet animal marin réputé pour son intelligence et ses vocalisations ?',
        reponse: 'Dauphin',
        url_image: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQdVrDbX5tCAQ6lX9axvmA12KMoRadrK1F7Pgls0RBotbvCJ9C-rd-_TNNKD70f4oQL'
    },
    {
        question: 'Quel oiseau est connu pour ses plumes colorées et sa capacité à imiter les sons ?',
        reponse: 'Perroquet',
        url_image: 'https://media.gettyimages.com/id/162543354/fr/vectoriel/ara-macao.jpg?s=612x612&w=0&k=20&c=2nI69GAns0yTxMd7zbgQfrF3lIOO9hyWUHU5HJliAdY='
    },
    {
        question: 'Quel grand félin est réputé pour être l\'un des animaux les plus rapides sur terre ?',
        reponse: 'Guépard',
        url_image: 'https://www.zoo-africansafari.com/wp-content/uploads/86I8415-1-scaled.jpg'
    }
]

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
            privacy: privacy,
            currentQuestion: null
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
            roomID: roomID,
            points: 0
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

    chooseQuestion(roomID) {
        let room = this.rooms.find(x => x.id === roomID);
        let QuestionType = ["multiple", "input", "image"];
        let type = QuestionType[Math.floor(Math.random() * QuestionType.length)];
        let res;
        console.log('type', type)

        if(type === "multiple") {
            room.currentQuestion = multiple[Math.floor(Math.random() * multiple.length)]
            res = {
                type: 'multiple',
                question: room.currentQuestion.question,
                reponses: room.currentQuestion.reponses
            }
        }

        if(type === "input") {
            room.currentQuestion = input[Math.floor(Math.random() * input.length)]
            res = {
                type: 'input',
                question: room.currentQuestion.question
            }
        }

        if(type === "image") {
            room.currentQuestion = image[Math.floor(Math.random() * image.length)]
            res = {
                type: 'image',
                question: room.currentQuestion.question,
                url_image: room.currentQuestion.url_image
            }
        }

        return res;
    }

    checkReponse(reponse, roomID, user) {
        let room = this.rooms.find(x => x.id === roomID);
        //get the question index

        console.log('reponse', reponse)

        if (reponse === room.currentQuestion.reponse) {
            let player = this.players.find(x => x.token === user.token);
            player.points += 1;
            console.log('player', player)
            return {type: 'message', message: 'congrat, good reponse', player: player}
        } else {
            return {type: 'error', error: 'bad reponse'}
        }
    }


}

module.exports = { Game }