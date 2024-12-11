const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    console.log('Dans le middleware'); // Debug
    const authHeader = req.headers.authorization; // Récupération du token dans les en-têtes

    if (!authHeader) {
        console.log('Accès non autorisé. Token manquant.'); // Debug
        return res.status(401).json({ message: "Accès non autorisé. Token manquant." });
    }

    const token = authHeader.split(' ')[1]; // Extraction du token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajoute les informations utilisateur dans `req.user`
        console.log('MiddleWare validé'); // Debug
        next();
    } catch (err) {
        console.log('Token invalide ou expiré :'); // Debug
        console.error("Token invalide ou expiré :", err);
        return res.status(403).json({ message: "Token invalide ou expiré." });
    }
};

module.exports = { isAuthenticated };