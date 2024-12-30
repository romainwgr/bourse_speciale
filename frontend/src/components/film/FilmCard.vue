<!--
    Composant qui affiche un film qu'on trouve dans la page d'accueil
    Il l'affiche en petit avec une image et un titre 
-->
<template>
  <router-link 
    v-if="filmId" 
    :to="{ name: 'FilmDetail', params: { id: filmId } }" 
    class="film-card"
  >
    <img 
      :src="film.poster_url" 
      :alt="film.original_title" 
      class="film-card__image" 
    />
    <h3 class="film-card__title">{{ film.original_title }}</h3>
  </router-link>
  <div v-else class="error">
    <p>Film ID non défini.</p>
  </div>
</template>

<script>
export default {
  props: {
    film: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filmId() {
      // Vérifie que le film et son ID sont bien définis
      return this.film?._id || null;
    },
  },
};
</script>

<style scoped>
.film-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  border: none;
  width: 200px; 
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
} 

.film-card:hover {
  transform: scale(1.05); /* Zoom subtil au survol */
}

.film-card__image {
  width: 100%; /* L'image prend toute la largeur du conteneur */
  height: auto; /* Maintient les proportions de l'image */
  border-radius: 8px; /* Coins arrondis */
  margin-bottom: 10px; /* Espace entre l'image et le titre */
}

.film-card__title {
  font-size: 16px; /* Taille du texte */
  color: white;
  margin: 10px 0 0; /* Espacement supérieur */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; /* Évite que le texte prenne plusieurs lignes */
}

.error {
  color: red;
  text-align: center;
  font-size: 14px;
}
</style>
