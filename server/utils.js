let multiple = [
    {
        question: "Quelle est le pourcentage d'énergie renouvelable consommée en France ?",
        reponses: ["-12,3", "-21,4", "-19,3", "-17,1"],
        reponse: "-17,1"
    },
    {
        question: "À quelle vitesse le vent doit-il souffler pour faire fonctionner une éolienne ?",
        reponses: ["entre 10 et 70 km/h", "entre 14 et 90 km/h", "au dessus de 90 km/h", "entre 10 et 30 km/h"],
        reponse: "entre 10 et 70 km/h"
    },
    {
        question: "Qui travaille le moins?",
        reponses: ["Richard", "Corentin", "Marius", "Emillien"],
        reponse: "Richard"
    },
    {
        question: "Combien d'espèces d’animaux sont menacées d’extinction dans le monde ?",
        reponses: ["1000", "4000", "10000", "40000"],
        reponse: "10000"
    },
    {
        question: "En France, sur 10 salariés combien utilisent la voiture pour se rendre sur leur lieu de travail ?",
        reponses: ["6", "7", "8", "9"],
        reponse: "7"
    },
    {
        question: "Parmi les émissions de CO2 dues au transport routier en Europe, quelle est la part liée aux voitures individuelles ?",
        reponses: ["20%", "40%", "60%", "70%"],
        reponse: "60%"
    },
    {
    question: "De quel pourcentage la production d'énergie nucléaire est-elle représentée en France ?",
    reponses: ["50%", "60%", "70%", "80%"],
    reponse: "70%"
},
{
    question: "En quelle année a été inventée la première voiture électrique ?",
    reponses: ["1834", "1899", "1910", "1945"],
    reponse: "1834"
},
    {
        question: "Quelle est la température recommandée à l’intérieur d’un logement ?",
        reponses: ["17°C", "19°C", "21°C", "23°C"],
        reponse: "19°C"
    },
    {
        question: "Combien économise-t-on d'eau en urinant sous la douche ?",
        reponses: ["5 litres", "10 litres", "15 litres", "20 litres"],
        reponse: "15 litres"
    },
    {
        question: "Quelle est la consommation moyenne d'électricité par personne et par an en kWh ?",
        reponses: ["1000 kWh", "1500 kWh", "2200 kWh", "3000 kWh"],
        reponse: "2200 kWh",
    },
    {
        question: "Parmi les options suivantes, quel appareil d'électroménager consomme le plus d’énergie en moyenne ?",
        reponses: ["Frigo", "Lave-linge", "Télévision", "Ordinateur"],
        reponse: "Frigo"
    }
]

let input = [
    {
        question: "Quelle structure permet d’obtenir de l'électricité avec le vent ?",
        reponse: "eolienne"
    },
    {
        question: "Quelle structure permet d’obtenir de l'électricité avec de l’eau ?",
        reponse: "Barrage"
    },
    {
        question: "Comment appelle-t-on un carburant produit à partir de matières premières végétales ou animales ?",
        reponse: "agrocarburant"
    },
    {
        question: "Dans quel pays se situe la plus grande centrale hydroélectrique ?",
        reponse: "Chine"
    },
    {
        question: "Quel est le pays d'Europe le plus écologique ?",
        reponse: "Norvège"
    },
    {
        question: "Quelle est l'utilité la plus courante de l'énergie géothermique dans nos foyers ?",
        reponse: "chauffage"
    },
    {
        question: "Quel est le premier pays producteur d’énergies renouvelables dans le monde ?",
        reponse: "Chine"
    },
    {
        question: "Quel est le pays le moins écologique ?",
        reponse: "Chine"
    },
    {
        question: "Quelle est la première énergie renouvelable utilisée en France ?",
        reponse: "bois"
    },
    {
        question: "Quelle est l'énergie renouvelable la plus rentable ?",
        reponse: "solaire"
    },
    {
        question: "Quel est le nom de l'énergie renouvelable produite grâce au soleil ?",
        reponse: "Energie solaire"
    },
    {
        question: "Quelle capitale marche à 100% à l'énergie renouvelable en Europe ?",
        reponse: "Oslo"
    },
    {
        question: "L’effet photovoltaïque, qui désigne la production d’électricité à partir du rayonnement solaire a été découvert par ?",
        reponse: "Edmond Becquerel"
    }
]

let image = [
    {
        question: "Quelle est cette structure ?",
        reponse: "centrale nucléaire",
        "url_image": "https://static.actu.fr/uploads/2023/07/usine-golfech-centrale-nucleaire-tarn-et-garonne-energie.png"
    },
    {
        question: "Qu'est-ce que c'est ?",
        reponse: "grande barriere de corail",
        "url_image": "https://odysseedelaterre.fr/wp-content/uploads/2021/09/grande-barriere-corail-australie.jpg"
    },
    {
        question: "Quel est cet animal ?",
        reponse: "lynx boréal",
        "url_image": "https://www.jaitoutcompris.com/img/encyclo/lynx.jpg"
    },
    {
        question: "Quelle est ce poisson ?",
        reponse: "thon rouge",
        "url_image": "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/actu/thon-rouge.jpg"
    },
    {
        question: "Quel est cet animal marin réputé pour son intelligence et ses vocalisations ?",
        reponse: "Dauphin",
        "url_image": "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQdVrDbX5tCAQ6lX9axvmA12KMoRadrK1F7Pgls0RBotbvCJ9C-rd-_TNNKD70f4oQL"
    },
    {
        question: "Quel oiseau est connu pour ses plumes colorées et sa capacité à imiter les sons ?",
        reponse: "Perroquet",
        "url_image": "https://media.gettyimages.com/id/162543354/fr/vectoriel/ara-macao.jpg?s=612x612&w=0&k=20&c=2nI69GAns0yTxMd7zbgQfrF3lIOO9hyWUHU5HJliAdY="
    },
    {
        question: "Quel grand félin est réputé pour être l'un des animaux les plus rapides sur terre ?",
        reponse: "Guépard",
        "url_image": "https://www.zoo-africansafari.com/wp-content/uploads/86I8415-1-scaled.jpg"
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
                points: [],
                privacy: privacy,
                currentQuestion: null,
                playing: false,
            }

            console.log(room)

            if (this.rooms.find(y => y.creator.token === username.token)) {
                return {type: 'error', error: 'you already have a room'}
            } else {
                this.rooms.push(room);
                return {type: 'message', message: 'congrat, room created', room: room};
            }
        }

        addPlayer(user, roomID) {
            console.log(user, "coco")
            let player = {
                name: user.name,
                token: user.token,
                roomID: roomID
            }

            this.players.push(player)

            let room = this.rooms.find(x => x.id === roomID)

            if(!room) {
                return {type: 'error', error: 'room does not exist', code: 404}
            }

            let isExist = room.players.find(y => y.token === player.token)

            if (!isExist) {
                room.players.push(player)
                room.points.push({
                    token: player.token,
                    points: 0
                })

                console.log(room)
            } else {
                return {type: 'error', error: 'you are already in the room', code: 400}
            }
            return {type: 'message', message: 'congrat, you are in the room', room: room}
        }

        removePlayer(user, roomID) {
            let room = this.rooms.find(x => x.id === roomID);
            let player = room.players.find(x => x.token === user.token);

            console.log(room, player)

            if(!player) {
                return {type: 'error', error: 'you are not in the room'}
            }

            let index = room.players.indexOf(player);
            room.players.splice(index, 1);

            if (room.players.length === 0) {
                let index = this.rooms.indexOf(room);
                this.rooms.splice(index, 1);
                return false;
            } else {
                return true;
            }
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

        getScore(roomID) {
            let room = this.rooms.find(x => x.id === roomID);
            if (!room) return [];

            let players = room.players;
            let points = room.points;

            let res = players.map(player => {
                let point = points.find(p => p.token === player.token);
                return { name: player.name, points: point ? point.points : 0, token: player.token };
            });

            return res;
        }


        chooseQuestion(roomID) {
            let room = this.rooms.find(x => x.id === roomID);
            room.playing = true;
            let QuestionType = ["multiple", "input", "image"];
            let type = QuestionType[Math.floor(Math.random() * QuestionType.length)];
            let res;
            room.startTime = Date.now();
            room.firstCorrectAnswerGiven = false;


            if (type === "multiple") {
                room.currentQuestion = multiple[Math.floor(Math.random() * multiple.length)]
                res = {
                    type: 'multiple',
                    question: room.currentQuestion.question,
                    reponses: room.currentQuestion.reponses
                }
            }

            if (type === "input") {
                room.currentQuestion = input[Math.floor(Math.random() * input.length)]
                res = {
                    type: 'input',
                    question: room.currentQuestion.question
                }
            }

            if (type === "image") {
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
            let currentTime = Date.now();
            let timeElapsed = (currentTime - room.startTime) / 2000;

            let accentoletter = (str) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }

            reponse = accentoletter(reponse.toUpperCase());

            let answer = accentoletter(room.currentQuestion.reponse.toUpperCase());

            if (reponse === answer) {
                let player = this.players.find(x => x.token === user.token);

                let points = room.points.find(p => p.token === player.token)
                points.points += Math.max(1, 10 - Math.floor(timeElapsed));

                console.log(room.points)

                let winner = this.checkGameEnd(roomID);
                if (winner) {
                    return {type: 'end', message: 'Game over, we have a winner!', player: winner};
                }

                return {type: 'message', message: 'congrat, good reponse', points: room.points};
            } else {
                return {type: 'error', error: 'bad reponse'};
            }
        }



        checkGameEnd(roomID) {
            let room = this.rooms.find(x => x.id === roomID);

            if(!room) {
                return {type: 'error', error: 'room does not exist'}
            }

            let winner = null;
            room.points.forEach(player => {
                console.log(player.token, "points")
                if (player.points >= 70) {
                    let user = this.players.find(x => x.token === player.token);
                    winner = user;
                }
            });
            return winner;
        }

        getAnswer(roomID) {
            let room = this.rooms.find(x => x.id === roomID);
            if(!room) {
                return {type: 'error', error: 'room does not exist'}
            }
            return room.currentQuestion.reponse;
        }

        getPublicRooms() {
            let room = this.rooms.filter(x => x.privacy === false);
            let rooms = room.map(x => {
                return {id: x.id, name: x.name, players: x.players.length}
            });
            return rooms;
        }

        chooseTheme(theme, roomID) {
            let room = this.rooms.find(x => x.id === roomID);
            if(!room) {
                return {type: 'error', error: 'room does not exist'}
            }
            room.themes = theme;
            return {type: 'message', message: 'theme chosen', theme: theme}
        }

        getRoomInfo(roomID) {
            let room = this.rooms.find(x => x.id === roomID);
            if(!room) {
                return {type: 'error', error: 'room does not exist'}
            }
            return room.playing;
        }

    }

module.exports = { Game }