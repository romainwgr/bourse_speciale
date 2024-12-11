// //backend/models/Film.js
// const mongoose = require('mongoose');

// const filmSchema = new mongoose.Schema({
//     Poster_Link: String,
//     Series_Title: String,
//     Released_Year: Number, // Changer le type pour un entier (year)
//     Certificate: String,
//     Runtime: String, // La durée est au format '142 min', donc String
//     Genre: String,
//     IMDB_Rating: Number,
//     Overview: String,
//     Meta_score: Number,
//     Director: String,
//     Star1: String,
//     Star2: String,
//     Star3: String,
//     Star4: String,
//     No_of_Votes: Number,
//     Gross: String // La valeur contient des virgules, donc String
// });

// module.exports = mongoose.model('films', filmSchema);
const mongoose = require('mongoose');

// Définir un nouveau schéma pour les films
const filmSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Identifiant unique
    titleType: String,                  // Type de titre, par exemple "movie"
    originalTitle: String,              // Titre original du film
    startYear: String,                  // Année de début (resté String selon les données fournies)
    genres: String,                     // Genres au format chaîne, séparés par des virgules
    poster_url: String,                 // URL de l'affiche
    actors: String,                     // Acteurs (format texte)
    director: String,                   // Nom du réalisateur
    runtime: String                     // Durée (format texte)
});

// Exporter le modèle Mongoose
module.exports = mongoose.model('film2', filmSchema);