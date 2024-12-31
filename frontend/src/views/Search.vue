<!-- 
  Page de recherche
-->
<template>
  <div class="search">
    <h2>Rechercher un film</h2>
    <div class="search-container">
      <input
        type="text"
        class="search-bar"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Entrez le titre du film"
      />
    </div>

    <!-- Résultats de la recherche -->
    <div v-if="films.length" class="films-grid">
      <FilmCard 
        v-for="film in films" 
        :key="film._id" 
        :film="film" 
      />
    </div>

    <!-- Message si aucun résultat trouvé -->
    <p v-else-if="searchQuery.trim() && !isLoading">
      Aucun film trouvé pour "{{ searchQuery }}"
    </p>

    <!-- Indicateur de chargement -->
    <p v-if="isLoading">Recherche en cours...</p>
  </div>
</template>

<script>
import FilmCard from "@/components/film/FilmCard.vue";

export default {
  components: {
    FilmCard
  },
  data() {
    return {
      searchQuery: "",
      films: [],
      isLoading: false,
      searchTimeout: null
    };
  },
  methods: {
    handleSearch() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      if (!this.searchQuery.trim()) {
        this.films = [];
        return;
      }

      this.searchTimeout = setTimeout(() => {
        this.searchFilm();
      }, 500);
    },
    async searchFilm() {
      this.isLoading = true;

      try {
        const response = await fetch(
          `http://localhost:3000/api/films/search?title=${encodeURIComponent(
            this.searchQuery
          )}`
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        this.films = data;
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        this.films = [];
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>

.search {
  margin-top: 9em;
}
.films-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 30px;
  margin-top: 30px;
  margin-inline: 30px;
}

.search-container {
  display: flex;
  justify-content: center;
}

.search-bar {
  width: 45%;
  height: 30px;
  border-radius: 10px;
  list-style: none;
  border: none;
  text-indent: 5px;
}

.search-bar:focus {
  list-style: none;
  outline: auto;
}

p, h2 {
  color: white;
  text-align: center
}
</style>
