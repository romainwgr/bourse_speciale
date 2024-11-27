const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        ref: 'Movie', // Référence à une collection "Movie"
      },
    ],
    rated_movies: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Movie',
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
      default: '', // URL de l'image de profil
    }
  }
);

// Middleware Mongoose pour hasher les mots de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
