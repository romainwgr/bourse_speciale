// backend/controllers/actorsController.js
const Actor = require('../models/Actor');
const Film = require('../models/Film');


// Rechercher un acteur par nom
const searchActorByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Le paramètre 'name' est requis." });
    }

    const actors = await Actor.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(actors);
  } catch (error) {
    console.error("Erreur lors de la recherche d'acteurs :", error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

const getActorById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Récupérer l'acteur
      const actor = await Actor.findById(id);
      if (!actor) {
        return res.status(404).json({ message: "Acteur non trouvé." });
      }
  
    //   Extraire les IDs des films depuis actor.movies
    //   const movieIds = actor.movies.map(movie => movie.id);
  
    //   Récupérer les films avec les IDs extraits
    //   const movies = await Film.find({ id: { $in: movieIds } });
  
      res.status(200).json({
        actor: {
          id: actor._id,
          name: actor.name,
        },
        // movies, 
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de l'acteur :", error);
      res.status(500).json({ message: "Une erreur est survenue." });
    }
  };


  

module.exports = {
  searchActorByName,
  getActorById,
};
