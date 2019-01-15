const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const axios = require('axios');

const router = require('./router');
const entities = require('./entities');

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
let gameId = 678;

const openLobbies = {
  123: {
    gameId: 123,
    creator: 'Benjo',
    players: [],
    nQuestions: 5,
    difficulty: 'hard',
    category: 'any',
    time_per_question: 30,
    maxPlayers: 4,
    questions: []
  },
  abdie3: {
    gameId: 'abdie3',
    creator: 'Frankie',
    players: ['Todd', 'Joe'],
    nQuestions: 5,
    difficulty: 'any',
    category: 'any',
    time_per_question: 10,
    maxPlayers: 4,
    questions: []
  },
  345: {
    gameId: 345,
    creator: 'John',
    players: [],
    nQuestions: 5,
    difficulty: 'easy',
    category: 'any',
    time_per_question: 5,
    maxPlayers: 2,
    questions: []
  }
};

const socketLobbies = {};


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

  client.on('createLobby', 
    ({ 
      trivia_amount: nQuestions, 
      trivia_category: category, 
      trivia_difficulty: difficulty,
      max_players: maxPlayers,
      time_per_question,
      username: username
    }) => {
      let url = `https://opentdb.com/api.php?amount=${nQuestions}`;
      if (category !== 'any') url += `&category=${category}`;
      if (difficulty !== 'any') url += `&difficulty=${difficulty}`;
      url += '&type=multiple';

      axios.get(url)
        .then(data => {
          const replacer = match => {
            if (entities[match]) return entities[match];
            else console.log(match);
          };

          if (data.data.response_code === 1 || data.data.response_code === 2) {
            io.sockets.connected[`${client.id}`].emit('apiError');
          }
          else {
            let questions = data.data.results;

            questions.forEach((item) => {
              item.incorrect_answers.forEach((inc, ii) => {
                item.incorrect_answers[ii] = inc.replace(/&#?\w+;/g, replacer);
              item.question = item.question.replace(/&#?\w+;/g, replacer);
              item.correct_answer = item.correct_answer.replace(/&#?\w+;/g, replacer);
              });
            });

            gameId += 1;

            openLobbies[gameId] = {
              gameId,
              creator: username,
              players: [],
              nQuestions,
              difficulty,
              category,
              time_per_question,
              maxPlayers,
              questions
            }
            
            io.sockets.connected[`${client.id}`].emit('createdLobby', openLobbies[gameId]);
            io.emit('lobbylist', openLobbies);

            socketLobbies[gameId] = io.of(`/${gameId}`);

            socketLobbies[gameId].on('connection', client => {
              console.log(`player has joined lobby`);
            })
          }
        })
        .catch(err => console.error(err));
  });

  
});



// const nsp = io.of('/lobbies');

// nsp.on('connection', nspclient => {
//   console.log('connection into lobbies accepted');
  
// });
