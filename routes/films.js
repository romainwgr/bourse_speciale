// routes/films.js
const express = require('express');
const router = express.Router();

// Exemple de route GET
router.get('/', (req, res) => {
    res.send("Liste des films");
});

module.exports = router;
