<!-- 
    Page d'accueil
-->
<template>
  <div class="home">
    <h1>Bienvenue sur l'application de films</h1>
    <h2>Liste des films du moment</h2>
    <!-- Liste des films -->
    <ul>
      <li v-for="film in films" :key="film._id">
        {{ film.Series_Title }} ({{ film.Released_Year }})
      </li>
    </ul>
    <!-- Message d'erreur si la requête échoue -->
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      films: [], // Tableau pour stocker les films récupérés
      errorMessage: "" // Message d'erreur en cas de problème
    };
  },
  async created() {
    try {
      // Appel à l'API pour récupérer les films
      const response = await fetch('http://localhost:3000/api/films'); // Remplace par l'URL réelle de ton API
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
  }
};
</script>
<style>
body {
  background-color: #1B1B1B;
}
h1, h2 {
  text-align: center;
  color: white;
}

.home li, .home h2 {
  color: white;
}

</style>