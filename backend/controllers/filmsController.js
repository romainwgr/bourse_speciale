const Film = require('../models/Film');
const mongoose = require('mongoose');

// Récupérer tous les films
const getAllFilms = async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des films.' });
    }
};

// Rechercher un film par titre
const searchFilmByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ message: 'Le paramètre "title" est requis.' });
        }

        const films = await Film.find({
            Series_Title: { $regex: title, $options: 'i' },
        });

        if (films.length === 0) {
            return res.status(404).json({ message: 'Aucun film trouvé.' });
        }

        res.json(films);
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la recherche.' });
    }
};

// Récupérer un film par ID
const getFilmById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID invalide.' });
        }

        const film = await Film.findById(id);

        if (!film) {
            return res.status(404).json({ message: 'Film non trouvé.' });
        }

        res.json(film);
    } catch (error) {
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};
// TODO getAllAvisByFilm
// TODO AddAvis
// TODO ModifAvis
// TODO SupprAvis
// TODO RemoveLike
// TODO AddLike
// TODO VoirRecentFilmRecherché

module.exports = {
    getAllFilms,
    searchFilmByTitle,
    getFilmById,
};
