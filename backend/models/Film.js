const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Identifiant unique MongoDB
  adult: { 
        type: Boolean, 
        required: true 
  },
  belongs_to_collection: {
        id: { 
            type: Number
        },
        name: { 
            type: String
        },
        poster_path: { 
            type: String
        },
        backdrop_path: { 
            type: String
        },
  },
  budget: { 
        type: Number, 
        required: true
  },
  genres: [
    {
        id: { 
            type: Number,
            required: true
        },
        name: { 
            type: String, 
            required: true 
        },
    },
  ],
  homepage: { 
        type: String
  },
  id: { 
        type: Number, 
        required: true, 
        unique: true
  },
  imdb_id: { 
        type: String
  },
  original_language: { 
        type: String, 
        required: true
  },
  original_title: { 
        type: String, 
        required: true
  },
  overview: { 
      type: String
  },
  popularity: { 
        type: Number, 
        required: true
  },
  poster_path: { 
     type: String
  },
  production_companies: [
    {
      name: { 
        type: String, 
        required: true
      },
      id: { 
        type: Number, 
        required: true
      },
    },
  ],
  production_countries: [
    {
      iso_3166_1: { 
        type: String, 
        required: true
      },
      name: { 
        type: String, 
        required: true 
      },
    },
  ],
  release_date: { 
    type: Date
  },
  revenue: { 
    type: Number, 
    required: true
  },
  runtime: { 
    type: Number 
  },
  spoken_languages: [
    {
      iso_639_1: { 
        type: String, 
        required: true 
      },
      name: { 
        type: String, 
        required: true 
      },
    },
  ],
  status: {
    type: String, 
    required: true
  },
  title: { 
    type: String, 
    required: true
  },
  video: { 
    type: Boolean, 
    required: true 
  },
  vote_average: { 
    type: Number, 
    required: true 
  },
  vote_count: { 
    type: Number, 
    required: true 
  },
  actors: [
    {
      type: Number, // Référence aux IDs numériques des acteurs
      ref: 'Actor', // Référence à la collection Actors
    },
  ],
  directors: [
    {
      type: Number, // Référence aux IDs numériques des directeurs
      ref: 'Director', // Référence à la collection Directors
    },
  ],
  
});

module.exports = mongoose.model('Film', filmSchema);
