const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'votre_secret_jwt';

// // Récupérer tous les utilisateurs
// const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
//     }
// };

// Créer un utilisateur (inscription)
const createUser = async (req, res) => {
    try {
        const { name, public_name, email, password, phone } = req.body;

        if (!name || !public_name || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { public_name }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email ou pseudonyme déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            public_name,
            email,
            password: hashedPassword,
            phone,
        });

        await user.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur.', error: err.message });
    }
};

// Se connecter (authentification)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie.', token, user });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la connexion.', error: err.message });
    }
};

// Modifier le profil d'un utilisateur
const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID invalide.' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.json({ message: 'Profil mis à jour avec succès.', updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil.', error: err.message });
    }
};

// Modifier l'image de profil
// const updateProfileImage = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { profil_image } = req.body;

//         if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'ID invalide.' });
//         }

//         if (!profil_image) {
//             return res.status(400).json({ message: "L'URL de l'image est requise." });
//         }

//         const updatedUser = await User.findByIdAndUpdate(id, { profil_image }, { new: true });
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         res.json({ message: "Image de profil mise à jour avec succès.", updatedUser });
//     } catch (err) {
//         res.status(500).json({ message: "Erreur lors de la mise à jour de l'image de profil.", error: err.message });
//     }
// };

// Récupérer les films aimés d'un utilisateur 
// TODO c'est l'utilisateur connecté peut etre y a un moyen plus simple et econome
// const getLikedMovies = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'ID invalide.' });
//         }

//         const user = await User.findById(id).populate('liked_movies');
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         res.json({ liked_movies: user.liked_movies });
//     } catch (err) {
//         res.status(500).json({ message: 'Erreur lors de la récupération des films aimés.' });
//     }
// };

// Ajouter un film aux liked_movies d'un utilisateur
// TODO c'est l'utilisateur connecté peut etre y a un moyen plus simple et econome

// const addLikedMovie = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { movieId } = req.body;

//         if (!id || !mongoose.Types.ObjectId.isValid(id) || !movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
//             return res.status(400).json({ message: 'ID utilisateur ou film invalide.' });
//         }

//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         if (user.liked_movies.includes(movieId)) {
//             return res.status(400).json({ message: 'Ce film est déjà dans les films aimés.' });
//         }

//         user.liked_movies.push(movieId);
//         await user.save();

//         res.json({ message: 'Film ajouté aux films aimés.', liked_movies: user.liked_movies });
//     } catch (err) {
//         res.status(500).json({ message: 'Erreur lors de l’ajout du film.', error: err.message });
//     }
// };

// Récupérer les films notés d'un utilisateur
// TODO c'est l'utilisateur connecté peut etre y a un moyen plus simple et econome

// const getRatedMovies = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'ID invalide.' });
//         }

//         const user = await User.findById(id).populate('rated_movies.movie');
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         res.json({ rated_movies: user.rated_movies });
//     } catch (err) {
//         res.status(500).json({ message: 'Erreur lors de la récupération des films notés.' });
//     }
// };

// // Ajouter une note à un film
// const addRatedMovie = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { movieId, rating, comment } = req.body;

//         if (!id || !mongoose.Types.ObjectId.isValid(id) || !movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
//             return res.status(400).json({ message: 'ID utilisateur ou film invalide.' });
//         }

//         if (rating < 0 || rating > 5) {
//             return res.status(400).json({ message: 'La note doit être comprise entre 0 et 5.' });
//         }

//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         const alreadyRated = user.rated_movies.find((rm) => rm.movie.toString() === movieId);
//         if (alreadyRated) {
//             return res.status(400).json({ message: 'Ce film a déjà été noté.' });
//         }

//         user.rated_movies.push({ movie: movieId, rating, comment });
//         await user.save();

//         res.json({ message: 'Film noté avec succès.', rated_movies: user.rated_movies });
//     } catch (err) {
//         res.status(500).json({ message: 'Erreur lors de la notation du film.', error: err.message });
//     }
// };

// // Mettre à jour le numéro de téléphone
// const updatePhoneNumber = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { phone } = req.body;

//         if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'ID invalide.' });
//         }

//         if (!phone) {
//             return res.status(400).json({ message: 'Le numéro de téléphone est requis.' });
//         }

//         const updatedUser = await User.findByIdAndUpdate(id, { phone }, { new: true, runValidators: true });
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         res.json({ message: 'Numéro de téléphone mis à jour avec succès.', user: updatedUser });
//     } catch (err) {
//         res.status(500).json({ message: 'Erreur lors de la mise à jour du numéro de téléphone.', error: err.message });
//     }
// };

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID invalide.' });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.json({ message: 'Utilisateur supprimé avec succès.', deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur.', error: err.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUserProfile,
    // updateProfileImage,
    // getLikedMovies,
    // addLikedMovie,
    // getRatedMovies,
    // addRatedMovie,
    deleteUser,
};
