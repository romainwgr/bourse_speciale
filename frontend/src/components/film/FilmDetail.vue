<!--
    Composant qui affiche un film en détail après que l'utilisateur ait cliqué dessus
    On y affiche toutes ses infos .. (image, titre, descriptions, acteurs etc...)
-->
<template>
  <div v-if="film" class="film-detail">
    <!-- Section Image -->
    <div class="film-detail__image-container">
      <img 
        :src="film.poster_path ? `https://image.tmdb.org/t/p/original${film.poster_path}` : 'https://via.placeholder.com/300x450'" 
        :alt="film.original_title" 
        class="film-detail__image" 
      />
    </div>

    <!-- Section Infos -->
    <div class="film-detail__info">
      <h2 class="film-detail__title">{{ film.original_title }}</h2>
      <p class="film-detail__year"><strong>Année de sortie :</strong> {{ film.release_date?.split('-')[0] }}</p>
      <p class="film-detail__genre">
        <strong>Genres : </strong>
        <span v-for="(genre, index) in film.genres" :key="genre.id">
          {{ genre.name }}<span v-if="index < film.genres.length - 1">, </span>
        </span>
      </p>
      <p class="film-detail__runtime"><strong>Durée :</strong> {{ film.runtime }} min</p>

      <!-- Tableau des réalisateurs -->
      <p class="film-detail__director" v-if="film && film.directors && film.directors.length > 0">
  <strong>Réalisateurs :</strong>
  <table class="detail-table">
    <thead>
      <tr>
        <th>Nom</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="directorEntry in film.directors" :key="directorEntry.director.id">
        <td>{{ directorEntry.director.name }}</td>
      </tr>
    </tbody>
  </table>
</p>
<p v-else class="film-detail__director">
  <strong>Réalisateurs :</strong> Non disponibles
</p>


<!-- Tableau des acteurs -->
<p class="film-detail__actors" v-if="film && film.actors && film.actors.length > 0">
  <strong>Acteurs :</strong>
  <table class="detail-table">
    <thead>
      <tr>
        <th>Nom</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="actorEntry in film.actors" :key="actorEntry.actor.id">
        <td>{{ actorEntry.actor.name }}</td>
      </tr>
    </tbody>
  </table>
</p>
<p v-else class="film-detail__actors">
  <strong>Acteurs :</strong> Non disponibles
</p>



      <p class="film-detail__overview"><strong>Résumé :</strong> {{ film.overview }}</p>
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
      film: null, // Contient les détails du film, les acteurs et les réalisateurs
    };
  },
  

  async created() {
    const route = useRoute();
    const filmId = route.params.id; // Récupère l'ID du film depuis l'URL

    try {
      // Récupérer les détails du film
      const response = await fetch(`http://localhost:3000/api/films/${filmId}`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      console.log(data.genres)
      // Charger les détails des acteurs avec Promise.all
      const actorRequests = data.actors.map((actor) =>
        fetch(`http://localhost:3000/api/actors/${actor._id}`)
          .then((res) => {
            if (!res.ok) throw new Error(`Erreur HTTP pour l'acteur ${actor._id} : ${res.status}`);
            return res.json();
          })
          .catch((error) => {
            console.error(`Erreur lors de la récupération de l'acteur ${actor._id} :`, error.message);
            return null; // Retourner null si erreur
          })
      );

      // Charger les détails des réalisateurs avec Promise.all
      const directorRequests = data.directors.map((director) =>
        fetch(`http://localhost:3000/api/directors/${director._id}`)
          .then((res) => {
            if (!res.ok) throw new Error(`Erreur HTTP pour le réalisateur ${director._id} : ${res.status}`);
            return res.json();
          })
          .catch((error) => {
            console.error(`Erreur lors de la récupération du réalisateur ${director._id} :`, error.message);
            return null; // Retourner null si erreur
          })
      );

      // Résoudre toutes les promesses en parallèle
      const [actors, directors] = await Promise.all([
        Promise.all(actorRequests),
        Promise.all(directorRequests),
      ]);

      // Mettre à jour le film avec les détails des acteurs et réalisateurs
      this.film = {
        ...data,
        actors: actors.filter(Boolean), // Supprime les acteurs non récupérés
        directors: directors.filter(Boolean), // Supprime les réalisateurs non récupérés
      };
      console.log(this.film.directors[0].director);
      console.log(this.film.actors[0].actor);


    } catch (error) {
      console.error("Erreur lors de la récupération des détails du film :", error);
    }
  },
};
</script>



<style scoped>
.detail-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  color: white;
}

.detail-table th,
.detail-table td {
  border: 1px solid #ccc;
  padding: 8px 10px;
  text-align: left;
}

.detail-table th {
  background-color: #444;
  color: white;
  font-weight: bold;
}

.detail-table tbody tr:nth-child(even) {
  background-color: #333;
}

.detail-table tbody tr:nth-child(odd) {
  background-color: #222;
}

.film-detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.film-detail__image-container {
  display: flex;
  justify-content: center;
  width: 30%;
}

.film-detail__image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.film-detail__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 65%;
  padding: 20px;
  background-color: rgb(44, 44, 44);
  color: white;
  border-radius: 15px;
}

.film-detail__title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
}

.film-detail__year,
.film-detail__genre,
.film-detail__runtime,
.film-detail__director,
.film-detail__actors,
.film-detail__overview {
  font-size: 16px;
  line-height: 1.6;
}

.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 20px;
  color: #666;
}
</style>
