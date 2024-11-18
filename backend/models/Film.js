const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    Poster_Link: String,
    Series_Title: String,
    Released_Year: Number, // Changer le type pour un entier (year)
    Certificate: String,
    Runtime: String, // La durée est au format '142 min', donc String
    Genre: String,
    IMDB_Rating: Number,
    Overview: String,
    Meta_score: Number,
    Director: String,
    Star1: String,
    Star2: String,
    Star3: String,
    Star4: String,
    No_of_Votes: Number,
    Gross: String // La valeur contient des virgules, donc String
});

module.exports = mongoose.model('films', filmSchema);
