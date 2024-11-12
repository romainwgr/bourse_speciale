const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    titre: String,
    date_sortie: Date,
    acteurs: [String],
    genre: String,
    duree: Number,
    mots_cles: [String]
});

module.exports = mongoose.model('films', filmSchema);


