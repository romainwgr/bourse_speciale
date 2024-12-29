
const Like = require('../models/Like');


const like = async (req, res) => {
    try{
        const userId = req.user.id;
        const movieId = req.params.id;
      
        // Vérifie si le "like" existe déjà
        const existingLike = await Like.findOne({ userId, movieId });
        if (existingLike) {
          return res.status(400).json({ message: 'Vous avez déjà aimé ce film.' });
        }
      
        // Ajoute un nouveau "like"
        const newLike = new Like({ userId, movieId });
        await newLike.save();
      
        res.status(201).json({ message: 'Film aimé avec succès.' });
    }
    catch(e){
        res.status(500).json({ message: 'Erreur lors de l\'ajout du film dans les films aimés.', error: e.message });

    }
}

const unlike = async (req,res) => {
    try{
        const userId = req.user.id;
        const movieId = req.params.id;
      
        // Supprime le "like"
        const result = await Like.findOneAndDelete({ userId, movieId });
        if (!result) {
          return res.status(404).json({ message: 'Like non trouvé.' });
        }
      
        res.status(200).json({ message: 'Like retiré avec succès.' });
    }
    catch(e){
        res.status(500).json({ message: 'Erreur lors de la suppression du film des films aimés.', error: e.message });

    }
}
const isLiked = async (req,res) => {
    try{
        const userId = req.user.id;
        const movieId = req.params.id;
      
        // Vérifie l'existence du "like"
        const isLiked = await Like.exists({ userId, movieId });
        res.status(200).json({ isLiked });
    }
    catch(e){
        res.status(500).json({ message: 'Erreur lors de la recherche si le film est aimé ou non', error: e.message });

    }
}
module.exports = {
    like,
    unlike,
    isLiked
};