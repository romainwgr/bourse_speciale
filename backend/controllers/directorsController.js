// backend/controllers/directorsController.js
const Director = require('../models/Director');
const Film = require('../models/Film');

// Rechercher un réalisateur par nom
const searchDirectorByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Le paramètre 'name' est requis." });
    }

    const directors = await Director.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(directors);
  } catch (error) {
    console.error("Erreur lors de la recherche des réalisateurs :", error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

const getDirectorById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Récupérer le réalisateur
      const director = await Director.findById(id);
      if (!director) {
        return res.status(404).json({ message: "Réalisateur non trouvé." });
      }
  
      // Récupérer les films basés sur les IDs numériques
    //   const movies = await Film.find({ id: { $in: director.movies } });
  
      res.status(200).json({
        director: {
          id: director._id,
          name: director.name,
        },
        // movies, // Détails des films
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du réalisateur :", error);
      res.status(500).json({ message: "Une erreur est survenue." });
    }
  };
  
  

module.exports = {
  searchDirectorByName,
  getDirectorById,
};
