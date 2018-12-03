const mongoose = require('mongoose');

const host = 'localhost'

mongoose.connect(`mongodb://${host}/trivia`)
  .then(() => console.log(`connected to mongoDB on ${host}`))
  .catch(err => console.error(err));

const db = mongoose.connection;


module.exports = db;