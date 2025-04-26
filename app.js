require('dotenv').config();
const Server = require('./Server');

const server = new Server({
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
});

server.start();
