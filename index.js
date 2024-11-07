require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour interpréter les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connecté à MongoDB Atlas"))
.catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API de films !");
});

// Importer et utiliser les routes de l'API des films
const filmRoutes = require('./routes/films');
app.use('/api/films', filmRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
