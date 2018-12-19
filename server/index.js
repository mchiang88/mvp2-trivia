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

// SOCKET SETUP
const io = socket(server);

io.on('connection', function(client) {
  console.log(`made client connection: ${client.id}`);

  client.on('disconnect', () => console.log(`${client.id} has disconnected`));

  client.on('subscribeTimer', interval => {
    console.log(`${client.id} has subscribed to timer with interval: ${interval} ms`);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  })
});