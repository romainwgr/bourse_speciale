<!-- 
    Page de recherche
-->
<template>
    <div>

      <h2>Rechercher un film</h2>
      <input type="text" v-model="searchQuery" placeholder="Entrez le titre du film" />
      <button @click="searchFilm">Rechercher</button>
      
      <div v-if="films.length">
        <h3>Résultats de la recherche :</h3>
        <ul>
          <li v-for="film in films" :key="film._id">
            {{ film.titre }} ({{ film.date_sortie }})
          </li>
        </ul>
      </div>
      <p v-else>Aucun résultat trouvé</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        films: []
      };
    },
    methods: {
      async searchFilm() {
        try {
          // Appel de l'API avec `fetch` pour rechercher un film par titre
          const response = await fetch(`http://localhost:3000/api/films/search?title=${encodeURIComponent(this.searchQuery)}`);
          
          if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
          }
          
          const data = await response.json();
          this.films = data;
        } catch (error) {
          console.error("Erreur lors de la recherche du film :", error);
        }
      }
    }
  };
  </script>
  