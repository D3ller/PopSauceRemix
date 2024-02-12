const express = require('express');
const http = require('http');
const cors = require('cors');
const { setupSocketIO } = require('./socketController');
const corsOptions = require('./config').corsOptions;

const app = express();
const server = http.createServer(app);
app.use(cors(corsOptions));

setupSocketIO(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));
