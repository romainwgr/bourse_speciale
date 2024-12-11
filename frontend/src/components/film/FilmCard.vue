<!--
    Composant qui affiche un film qu'on trouve dans la page d'accueil
    Il l'affiche en petit avec une image et un titre 
-->
<template>
  <router-link :to="{ name: 'FilmDetail', params: { id: film._id } }" class="film-card">
    <img 
      :src="film.poster_url" 
      :alt="film.originalTitle" 
      class="film-card__image" 
    />
    <h3 class="film-card__title">{{ film.originalTitle }}</h3>
  </router-link>
</template>

<script>
export default {
  props: {
    film: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.film-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  width: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.film-card:hover {
  transform: scale(1.05);
}

.film-card__image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
}

.film-card__title {
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>
