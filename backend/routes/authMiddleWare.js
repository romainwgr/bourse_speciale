const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    console.log('dans le middleware');// Debug
    const token = req.cookies.authToken; // Récupération du token dans le cookie

    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé. Token manquant." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajoute les informations utilisateur dans `req.user`
        next();
    } catch (err) {
        console.error("Token invalide ou expiré :", err);
        return res.status(403).json({ message: "Token invalide ou expiré." });
    }
};

module.exports = isAuthenticated;
