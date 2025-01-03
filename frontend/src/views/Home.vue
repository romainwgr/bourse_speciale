<template>
  <div>
    <h2>Liste des films</h2>
    <!-- Liste horizontale de films avec défilement -->
    <div class="film-container">
      <FilmCard
        v-for="film in films"
        :key="film._id"
        :film="film"
      />
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
/* Conteneur principal des films */
.film-container {
  display: flex; /* Permet l'affichage en ligne (horizontal) */
  flex-wrap: nowrap; /* Empêche les films de passer à la ligne */
  overflow-x: auto; /* Active le défilement horizontal */
  gap: 20px; /* Espacement entre les films */
  padding: 10px; /* Espacement autour des films */
  scroll-behavior: smooth; /* Défilement fluide */
  scrollbar-width: thin; /* Minimise l'apparence de la barre de défilement */
}

/* Style de la carte de film */
.film-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: inherit;
  width: 200px; /* Largeur fixe pour chaque carte */
  transition: transform 0.3s ease; /* Zoom au survol */
}

.film-card:hover {
  transform: scale(1.05); /* Zoom léger au survol */
}

/* Image de la carte de film */
.film-card__image {
  width: 100%; /* L'image occupe toute la largeur */
  height: 300px; /* Hauteur fixe pour l'image */
  border-radius: 8px; /* Coins arrondis */
  object-fit: cover; /* Ajuste l'image dans le conteneur sans la déformer */
  margin-bottom: 10px; /* Espace entre l'image et le titre */
}

/* Titre de la carte de film */
.film-card__title {
  font-size: 16px; /* Taille du texte */
  color: white; /* Couleur blanche */
  text-overflow: ellipsis; /* Tronque le texte trop long */
  overflow: hidden;
  white-space: nowrap; /* Évite les retours à la ligne */
  margin: 0;
}

/* Style personnalisé pour la barre de défilement (uniquement pour les navigateurs modernes) */
.film-container::-webkit-scrollbar {
  height: 8px; /* Hauteur de la barre de défilement horizontale */
}

.film-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5); /* Couleur de la barre */
  border-radius: 10px; /* Coins arrondis */
}

.film-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8); /* Couleur plus visible au survol */
}
</style>
