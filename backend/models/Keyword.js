const mongoose = require('mongoose');

// Définition du schéma Keyword
const keywordSchema = new mongoose.Schema({
  _id: { 
    type: Number, 
    required: true
  },
  name: { 
    type: String, 
    required: true
  },
  movies: [
    {
      type: Number, // ID des films associés au mot-clé
      required: true
    }
  ]
});

// Export du modèle
module.exports = mongoose.model('Keyword', keywordSchema);
