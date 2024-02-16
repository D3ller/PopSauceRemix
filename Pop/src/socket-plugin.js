// socket-plugin.js
import socket from './socket.js';

export default {
    install: (app) => {
        app.config.globalProperties.$socket = socket;
    },
};
