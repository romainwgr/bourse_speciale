const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // pour hacher les mots de passe

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Supprime les espaces inutiles
    },
    email: {
        type: String,
        required: true,
        unique: true, // L'email doit être unique
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
});

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
