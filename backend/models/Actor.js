const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  movies: [
    {
      id: { type: Number, required: true },
      role: { type: String }
    }
  ]
});

module.exports = mongoose.model('Actor', actorSchema);