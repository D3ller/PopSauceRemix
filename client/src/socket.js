import { io } from 'socket.io-client';

const socket = io('https://apireview.karibsen.fr');

export default socket;