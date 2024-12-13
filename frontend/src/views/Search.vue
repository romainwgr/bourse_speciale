<!-- 
  Page de recherche
-->
<template>
  <div>
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
/* Conteneur principal pour les films */
.films-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px;
}

/* Conteneur pour la barre de recherche */
.search-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

/* Barre de recherche */
.search-bar {
  width: 50%;
  height: 40px;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid var(--border, #ccc);
  background-color: var(--ui-bg, #f4f4f4);
  color: var(--text-high-contrast, #000);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-bar:focus {
  border-color: var(--border-hover, #888);
  outline: none;
  box-shadow: 0 0 5px var(--border-hover, #888);
}

/* Message de recherche en cours */
p, h2 {
  color: var(--text-high-contrast, white);
  text-align: center;
}

/* Texte pour aucun résultat */
p {
  font-style: italic;
  color: var(--text-low-contrast, #aaa);
}

/* Animation pour la barre de recherche */
.search-bar::placeholder {
  color: var(--text-low-contrast, #bbb);
  font-style: italic;
  font-size: 14px;
}

/* Ajout d'un effet de survol pour les cartes de films */
.films-grid .film-card {
  background-color: var(--ui-bg, #f9f9f9);
  border-radius: 10px;
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.films-grid .film-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
