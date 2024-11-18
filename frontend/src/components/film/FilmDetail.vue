<!--
    Composant qui affiche un film en détail après que l'utilisateur ait cliqué dessus
    On y affiche toutes ses infos .. (image, titre, descriptions, acteurs etc...)
-->
<template>
  <div v-if="film" class="film-detail">
    <!-- Section Image -->
    <div class="film-detail__image-container">
      <img 
        :src="film.Poster_Link" 
        :alt="film.Series_Title" 
        class="film-detail__image" 
      />
    </div>

    <!-- Section Infos -->
    <div class="film-detail__info">
      <h2 class="film-detail__title">{{ film.Series_Title }}</h2>
      <p class="film-detail__year"><strong>Année de sortie :</strong> {{ film.Released_Year }}</p>
      <p class="film-detail__genre"><strong>Genre :</strong> {{ film.Genre }}</p>
      <p class="film-detail__runtime"><strong>Durée :</strong> {{ film.Runtime }}</p>
      <p class="film-detail__rating"><strong>Note IMDB :</strong> <span class="rating">{{ film.IMDB_Rating }}</span></p>
      <p class="film-detail__director"><strong>Réalisateur :</strong> {{ film.Director }}</p>
      <p class="film-detail__actors"><strong>Acteurs :</strong> {{ film.Star1 }}, {{ film.Star2 }}, {{ film.Star3 }}, {{ film.Star4 }}</p>
      <p class="film-detail__overview"><strong>Résumé :</strong> {{ film.Overview }}</p>
    </div>
  </div>

  <!-- Message de chargement -->
  <p v-else class="loading">Chargement des détails du film...</p>
</template>




<script>
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      film: null // Initialisé à null
    };
  },
  async created() {
    const route = useRoute();
    const filmId = route.params.id; // Récupère l'ID du film depuis l'URL

    try {
      const response = await fetch(
        `http://localhost:3000/api/films/${filmId}`
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      this.film = data; // Stocke les détails du film
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du film :", error);
    }
  }
};
</script>
<style scoped>
.film-detail {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  padding: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  margin: 20px auto;
  max-width: 1200px;
}

.film-detail__image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.film-detail__image {
  width: 100%;
  max-height: 90vh; /* Rend l'image plus grande sur l'écran */
  object-fit: cover; /* Maintient les proportions */
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.film-detail__info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto; /* Permet le défilement si le contenu est trop long */
}

.film-detail__title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.film-detail__year,
.film-detail__genre,
.film-detail__runtime,
.film-detail__rating,
.film-detail__director,
.film-detail__actors,
.film-detail__overview {
  font-size: 18px;
  color: #555;
}

.rating {
  color: #ffa500;
  font-weight: bold;
  font-size: 20px;
}

.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 20px;
  color: #666;
}
</style>
