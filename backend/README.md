# Backend Documentation

Ce dossier contient le code backend de l'application. Il est organisé en plusieurs sous-dossiers pour assurer une structure propre et maintenable.

## Structure du projet

### `/controllers`
- **Rôle :** Ce dossier contient les logiques métier de l'application, c'est-à-dire les fonctions qui gèrent les requêtes HTTP (par exemple, `GET`, `POST`, `PUT`, `DELETE`) et interagissent avec la base de données via les modèles.
- **Exemple de contenu :**
  - `users.js` : Logique métier pour les utilisateurs (CRUD).

---

### `/models`
- **Rôle :** Ce dossier contient les définitions des schémas de la base de données MongoDB via Mongoose. Les schémas définissent la structure des documents, leurs types et leurs validations.
- **Exemple de contenu :**
  - `User.js` : Schéma pour la collection `users`, avec les champs `name`, `email`, `age`, etc.

---

### `/routes`
- **Rôle :** Ce dossier contient les définitions des routes de l'application. Les routes définissent les chemins HTTP (`/api/...`) et les méthodes (`GET`, `POST`, etc.), et connectent ces chemins aux contrôleurs correspondants.
- **Exemple de contenu :**
  - `userRoutes.js` : Routes pour les opérations sur les utilisateurs (par exemple, `/api/users`).

---

### `.env`
- **Rôle :** Ce fichier contient les variables d'environnement sensibles, comme :
  - La chaîne de connexion à la base de données MongoDB.
  - Le numéro de port sur lequel le serveur écoute.



# Fichier `index.js`

Le fichier `index.js` est le point d'entrée principal de l'application backend. Il configure et démarre le serveur Express, connecte MongoDB via Mongoose, et initialise les middlewares ainsi que les routes.

---

## Fonctionnalités principales

1. **Configuration du serveur :**
   - Utilisation de `Express` pour créer un serveur.
   - Analyse des requêtes JSON avec `express.json()`.

2. **Connexion à MongoDB :**
   - Utilisation de `Mongoose` pour se connecter à une base de données MongoDB.
   - Lecture des informations de connexion à partir du fichier `.env`.

3. **Gestion des Cross-Origin Requests :**
   - Ajout de `CORS` pour permettre les requêtes provenant d'autres origines.

4. **Initialisation des routes :**
   - Définition d'une route de test à la racine `/`.
   - Importation et enregistrement des routes pour les films (`/api/films`).

5. **Démarrage du serveur :**
   - Écoute sur un port défini dans `.env` ou, par défaut, sur le port 3000.

---

## Contenu détaillé

### **1. Configuration des dépendances**
Le fichier importe les modules nécessaires :
- **`express`** : Framework pour créer le serveur.
- **`mongoose`** : Bibliothèque pour interagir avec MongoDB.
- **`cors`** : Middleware pour autoriser les requêtes entre origines différentes.
- **`dotenv`** : Pour charger les variables d'environnement définies dans le fichier `.env`.

### **2. Middleware global**
Le fichier configure les middlewares utilisés globalement :
- **`cors()`** : Permet de gérer les problèmes de sécurité liés aux requêtes Cross-Origin.
- **`express.json()`** : Permet de parser le corps des requêtes au format JSON.

### **3. Connexion à MongoDB**
La connexion à MongoDB est établie avec Mongoose. Si la connexion échoue, une erreur est affichée.

```javascript
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté à MongoDB Atlas"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));
