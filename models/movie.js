const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true},
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('movie', MovieSchema);
