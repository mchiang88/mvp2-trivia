const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const bodyParser = require('body-parser');

// const router = require('./router');

const app = express();
const port = 1128;

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client/dist')));

// app.use('/api', router);

app.listen(port, () => console.log(`server listening on ${port}`));