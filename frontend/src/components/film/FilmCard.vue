<template>
  <router-link :to="{ name: 'FilmDetail', params: { id: film._id } }" class="film-card">
    <div class="film-card__image-container">
      <img :src="film.poster_path" :alt="film.original_title" class="film-card__image" />
    </div>
    <h3 class="film-card__title">{{ film.original_title }}</h3>
  </router-link>
</template>

<script>
export default {
  props: {
    film: {
      type: Object,
      required: true,
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

.film-card__image-container {
  width: 150px; /* Largeur fixe pour toutes les images */
  height: 225px; /* Hauteur fixe pour toutes les images */
  overflow: hidden; /* Cache les parties débordantes de l'image */
  border-radius: 8px; /* Coins arrondis */
  margin-bottom: 10px; /* Espace entre l'image et le titre */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000; /* Couleur de fond au cas où l'image ne charge pas */
}

.film-card__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* L'image couvre toute la zone sans déformer */
}

.film-card__title {
  font-size: 16px; /* Taille du texte */
  color: white;
  margin: 10px 0 0; /* Espacement supérieur */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; /* Évite que le texte prenne plusieurs lignes */
}
</style>
