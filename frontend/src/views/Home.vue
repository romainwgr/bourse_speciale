<template>
    <div>
      <h2>Liste des films</h2>
      <ul>
        <li v-for="film in films" :key="film._id">
          {{ film.titre }} ({{ film.date_sortie }})
        </li>
      </ul>
      <p v-if="errorMessage">{{ errorMessage }}</p> <!-- Message d'erreur si la requête échoue -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        films: [],
        errorMessage: ""
      };
    },
    async created() {
      try {
        // Appel à l'API pour récupérer les films
        const response = await fetch('http://localhost:3000/api/films'); // Remplace par l'URL de ton API
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`); // Gère les erreurs HTTP
        }
        const data = await response.json();
        this.films = data; // Stocker les données dans `films`
      } catch (error) {
        this.errorMessage = "Erreur lors de la récupération des films : " + error.message;
        console.error(error);
      }
    }
  };
  </script>
  