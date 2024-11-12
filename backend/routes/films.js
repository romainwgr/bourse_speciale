const express = require('express');
const router = express.Router();
const Film = require('../models/Film'); // Assurez-vous que le modèle Film existe

// Route pour récupérer tous les films
router.get('/', async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour rechercher un film par titre
router.get('/search', async (req, res) => {
    try {
        const { title } = req.query;
        const films = await Film.find({ titre: new RegExp(title, 'i') });
        res.json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
