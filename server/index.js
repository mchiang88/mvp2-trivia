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

io.on('connection', function(socket) {
  console.log('made socket connection: ', socket.id);

})