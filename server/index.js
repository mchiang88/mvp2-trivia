const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const router = require('./router');

const app = express();
const port = 1128;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

const server = app.listen(port, () => console.log(`server listening on ${port}`));

// HANDLING GAMES & USERS
const usersList = [];
const openLobbies = {
  123: {
    creator: 'Benjo',
    players: [],
    maxPlayers: 4
  },
  abdie3: {
    creator: 'Frankie',
    players: ['Todd', 'Joe'],
    maxPlayers: 4
  },
  345: {
    creator: 'John',
    players: ['one', 'two', 'three'],
    maxPlayers: 4
  }
};
const currentGames = [];


// SOCKET SETUP
const io = socket(server);

io.on('connection', client => {
  let name = client.id;
  console.log(`made client connection: ${client.id}`);
  
  client.on('createUser', username => {
    name = username;
    if (!usersList.includes(name)) usersList.push(name);
    console.log(`${name} created`); 
  });

  io.sockets.connected[`${client.id}`].emit('lobbylist', openLobbies);

  client.on('disconnect', () => console.log(`${client.id} (${name}) has disconnected`));

  client.on('subscribeTimer', interval => {
    console.log(`${client.id} has subscribed to timer with interval: ${interval} ms`);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });


  
});

// const nsp = io.of('/lobbies');

// nsp.on('connection', nspclient => {
//   console.log('connection into lobbies accepted');
  
// });
