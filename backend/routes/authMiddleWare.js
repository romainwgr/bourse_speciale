const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format attendu : "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: "Token d'authentification requis." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décodage du token
        req.user = decoded; // Ajouter les données utilisateur décodées à la requête
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token invalide ou expiré." });
    }
};

module.exports = { authenticateToken };