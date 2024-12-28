const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    public_name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Unicité pour les pseudonymes
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Email invalide.',
      },
    },
    phone: {
      type: String,
      unique: true,
      sparse: true, // Permet de ne pas exiger la présence de ce champ
    },
    liked_movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film', // Référence à une collection 
      },
    ],
    rated_movies: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Film',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5, // Par exemple, une note sur 5
        },
        comment: {
          type: String,
          trim: true,
        },
      },
    ],
    password: {
      type: String,
      required: true,
    },
    profil_image: {
      type: String,
      default: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', // URL de l'image de profil
    },
    preferences: [
      {
        type: Number, // ID des mots-clés (référence à la collection Keyword)
        ref: 'Keyword', // Référence à la collection Keyword
      },
    ],
  }
);





module.exports = mongoose.model('User', userSchema);
