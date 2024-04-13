const axios = require('axios');
const {json} = require("express");

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
                theme: null,
                allQuestions: [],
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


        async chooseQuestion(roomID) {
            let room = this.rooms.find(x => x.id === roomID);
            room.playing = true;
            let QuestionType = ["multiple", "input", "image"];
            await room.allQuestions
            let random = Math.floor(Math.random() * room.allQuestions.length);
            await new Promise(resolve => setTimeout(resolve, 500));

            let type;
            let res;

            if(room.allQuestions.length === 0) {
                return {type: 'no-questions', error: 'no more questions'}
            }

            if(room.allQuestions[random].reponse_1 && room.allQuestions[random].reponse_2 && room.allQuestions[random].reponse_3 && room.allQuestions[random].reponse_4) {
                type = "multiple";
            }
            if(room.allQuestions[random].reponse_1 && !room.allQuestions[random].reponse_2 && !room.allQuestions[random].reponse_3 && !room.allQuestions[random].reponse_4) {
                type = "input";
            }

            if(room.allQuestions[random].image && room.allQuestions[random].reponse_1) {
                type = "image";
            }

            room.startTime = Date.now();
            room.currentQuestion = room.allQuestions[random];

            if (type === "multiple") {
                res = {
                    type: 'multiple',
                    question: {fr:room.currentQuestion.question, en: room.currentQuestion.question_en},
                    reponses: {fr:[room.currentQuestion.reponse_1, room.currentQuestion.reponse_2, room.currentQuestion.reponse_3, room.currentQuestion.reponse_4], en:[room.currentQuestion.reponse_1_en, room.currentQuestion.reponse_2_en, room.currentQuestion.reponse_3_en, room.currentQuestion.reponse_4_en]}
                }
            }

            if (type === "input") {
                res = {
                    type: 'input',
                    question: {fr:room.currentQuestion.question, en: room.currentQuestion.question_en}
                }
            }

            if (type === "image") {
                res = {
                    type: 'image',
                    question: {fr:room.currentQuestion.question, en: room.currentQuestion.question_en},
                    url_image: room.currentQuestion.url_image
                }
            }

            await new Promise(resolve => setTimeout(resolve, 500));

            console.log(JSON.stringify(res))

            return res;
        }

        checkReponse(reponse, roomID, user, lang) {
            console.log(lang)
            let room = this.rooms.find(x => x.id === roomID);
            let currentTime = Date.now();
            let timeElapsed = (currentTime - room.startTime) / 2000;
            let type;

            let accentoletter = (str) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }

            reponse = accentoletter(reponse.toUpperCase());

            if(room.currentQuestion.reponse_1 && room.currentQuestion.reponse_2 && room.currentQuestion.reponse_3 && room.currentQuestion.reponse_4) {
                type = "multiple";
            }
            if(room.currentQuestion.reponse_1 && !room.currentQuestion.reponse_2 && !room.currentQuestion.reponse_3 && !room.currentQuestion.reponse_4) {
                type = "input";
            }

            if(room.currentQuestion.image && room.currentQuestion.reponse_1) {
                type = "image";
            }

            let answerFR = accentoletter(room.currentQuestion.bonne_reponse.toUpperCase());
            let answerEN = accentoletter(room.currentQuestion.good_reponse.toUpperCase());

            console.log(reponse === answerFR, reponse === answerEN, answerFR)


            if(lang === "fr") {
                if (reponse === answerFR) {
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
            } else {
                if (reponse === answerEN) {
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

            let index = room.allQuestions.indexOf(room.currentQuestion);
            room.allQuestions.splice(index, 1);
            console.log(room.allQuestions.length)
            return {fr: room.currentQuestion.bonne_reponse, en: room.currentQuestion.good_reponse}
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

        async getAllQuestions(roomID, selected) {
            let room = this.rooms.find(x => x.id === roomID);
            if(!room) {
                return {type: 'error', error: 'room does not exist'}
            }
            await axios.get('http://apiplateform.karibsen.fr/api/questions').then(res => {
                room.allQuestions = res.data['hydra:member'];
                let questions = room.allQuestions.filter(x => x.themes === '/api/themes/'+selected);
                console.log(selected)
                let common = room.allQuestions.filter(x => x.themes === '/api/themes/5');
                questions = questions.concat(common);
                room.allQuestions = questions;
            })
        }

    }

module.exports = { Game }