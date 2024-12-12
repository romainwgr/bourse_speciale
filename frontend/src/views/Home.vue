<template>
  <div class="home">
    <h1>Bienvenue sur l'application de films</h1>
    <h2>Liste des films du moment</h2>

    <!-- Liste des films -->
    <ul class="film-list">
      <li v-for="film in films" :key="film._id">
        {{ film.originalTitle }} ({{ film.startYear }})
      </li>
    </ul>

    <!-- Bouton custom pour tester -->
    <CustomButton text="Valider" color="red" @click="handleValidation" />

    <!-- Message d'erreur si la requête échoue -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      films: [], // Tableau pour stocker les films récupérés
      errorMessage: "", // Message d'erreur en cas de problème
    };
  },
  async created() {
    try {
      // Appel à l'API pour récupérer les films
      const response = await fetch("http://localhost:3000/api/films"); // Remplace par l'URL réelle de ton API
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`); // Gestion des erreurs HTTP
      }
      const data = await response.json(); // Conversion des données au format JSON
      this.films = data; // Stockage des données dans `films`
    } catch (error) {
      // Gestion des erreurs lors de la requête
      this.errorMessage = "Erreur lors de la récupération des films : " + error.message;
      console.error(error);
    }
  },
  methods: {
    handleValidation() {
      alert("Validation réussie !");
    },
  },
};
</script>

<style>
/* Styles de la page d'accueil */
.home {
  padding: 2em;
  background-color: var(--bg-app); /* Arrière-plan principal */
  color: var(--text-high-contrast); /* Couleur de texte */
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 0.5em;
  color: var(--text-high-contrast); /* Texte principal */
}

h2 {
  text-align: center;
  font-size: 1.8em;
  margin-bottom: 1em;
  color: var(--text-high-contrast); /* Texte secondaire */
}

/* Liste des films */
.film-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 600px;
}

.film-list li {
  padding: 0.8em;
  margin: 0.5em 0;
  background-color: var(--ui-bg); /* Arrière-plan des éléments */
  border: 1px solid var(--border-subtle); /* Bordure subtile */
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.film-list li:hover {
  background-color: var(--ui-bg-hover); /* Arrière-plan au survol */
  transform: scale(1.02); /* Effet de zoom au survol */
  cursor: pointer;
}

/* Message d'erreur */
.error-message {
  text-align: center;
  color: var(--text-low-contrast); /* Couleur d'erreur */
  margin-top: 2em;
  font-weight: bold;
}
</style>
