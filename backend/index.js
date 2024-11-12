const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importer cors

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware pour interpréter les requêtes JSON
app.use(express.json());

// Connexion à MongoDB avec Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté à MongoDB Atlas"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Importer et utiliser les routes de l'API des films
const filmRoutes = require('./routes/films.js');
app.use('/api/films', filmRoutes);

// Route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API de films !");
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
