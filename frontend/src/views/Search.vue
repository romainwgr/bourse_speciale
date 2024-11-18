<!-- 
  Page de recherche
-->
<template>
  <div>
    <h2>Rechercher un film</h2>
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Entrez le titre du film"
    />

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
.films-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
