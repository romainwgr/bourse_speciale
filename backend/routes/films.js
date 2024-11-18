//films.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Film = require('../models/Film'); // Assurez-vous que le modèle Film existe

// Route pour récupérer tous les films
router.get('/', async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des films.' });
    }
});

// Route pour rechercher un film par titre
router.get('/search', async (req, res) => {
    try {
        const { title } = req.query;
        console.log("Titre reçu :", title); // Vérifie ce qui est reçu

        if (!title) {
            return res.status(400).json({ message: 'Le paramètre "title" est requis.' });
        }

        const films = await Film.find({
            Series_Title: { $regex: title, $options: 'i' }
        });

        console.log("Films trouvés :", films); // Vérifie les résultats retournés

        if (films.length === 0) {
            return res.status(404).json({ message: 'Aucun film trouvé.' });
        }

        res.json(films);
    } catch (err) {
        console.error("Erreur lors de la recherche :", err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la recherche.' });
    }
});
// Route pour récupérer un film par ID
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params; // Récupère l'ID depuis l'URL
      console.log("ID reçu :", id); // Ajoute un log pour vérifier l'ID reçu
  
      // Vérifie que l'ID est un ObjectId valide
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID invalide.' });
      }
  
      // Recherche le film par ID
      const film = await Film.findById(id);
  
      if (!film) {
        return res.status(404).json({ message: 'Film non trouvé.' });
      }
  
      res.json(film); // Retourne les détails du film
    } catch (error) {
      console.error("Erreur lors de la récupération du film :", error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  });
  

module.exports = router;
