<template>
  <div>
    <h2>Liste des films</h2>
    <!-- Liste horizontale de films avec défilement -->
    <div class="film-container">
      <div v-for="film in films" :key="film._id" class="film-item">
        <!-- Titre du film -->
        <h3>{{ film.originalTitle }} ({{ film.startYear }})</h3>
        <!-- Affichage de l'image du poster -->
        <router-link :to="{ name: 'FilmDetail', params: { id: film._id } }" class="film-card">
        <img :src="film.poster_url" :alt="film.originalTitle" class="poster" />
        </router-link>
      </div>
    </div>

    <!-- Message d'erreur si la requête échoue -->
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import FilmCard from "@/components/film/FilmCard.vue";

export default {
  components: {
    FilmCard,
  },
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
};
</script>

<style scoped>
/* Styles pour le texte */
h2, h3, p {
  color: white; /* Texte en blanc */
}

.film-container {
  display: flex; /* Affichage horizontal */
  overflow-x: auto; /* Permet le défilement horizontal */
  padding: 10px 0;
  gap: 20px; /* Espacement entre les éléments */
}

.film-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px; /* Largeur minimum pour chaque film */
  max-width: 200px; /* Limite la taille du film */
}

.poster {
  width: 100%; /* Assure que l'image prend toute la largeur du conteneur */
  height: auto; /* Conserve les proportions de l'image */
  border-radius: 8px; /* Optionnel : pour arrondir les coins des images */
}

/* Optionnel : styles pour améliorer les liens */
a {
  text-decoration: none;
  color: white; /* Liens en blanc */
}

a:hover {
  color: #d1d1d1; /* Couleur légèrement différente au survol */
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
