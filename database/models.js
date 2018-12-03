const mongoose = require('mongoose');
const db = require('.');

const resultSchema = new mongoose.Schema({

}, {timestamps: false});

const Results = mongoose.model('results', resultSchema);

module.exports = { Results };