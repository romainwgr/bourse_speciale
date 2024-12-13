<template>
  <nav>
    <a href="/"><img src="@/assets/logo_test.png" alt="logo" class="logo" /></a>
    <div class="navlinks">
      <ul>
        <li>
          <router-link to="/">Accueil</router-link>
        </li>
        <li>
          <router-link to="/search">Recherche de films</router-link>
        </li>
        <li>
          <router-link to="/profil">Profil</router-link>
        </li>
          
        <!-- Problèmes pour cliquer sur le bouton -->
        <li>
          <theme-button />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import ThemeButton from "./ThemeButton.vue";

export default {
  name: 'Navbar',
  components: { ThemeButton},
  inject: ['theme', 'toggleTheme'], // Récupère le thème et la méthode pour basculer

};

</script>

<style scoped>
/* Style pour la navigation */
nav {
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ui-bg); /* Couleur d'arrière-plan dynamique */
  color: var(--text-high-contrast); /* Texte dynamique */
}

/* Liens de navigation */
.navlinks {
  padding: 1em;
}

ul {
  list-style: none;
  display: flex;
  gap: 1.5em;
  margin: 0;
  padding: 0;
}

li {
  color: var(--text-high-contrast); /* Texte dynamique */
  background-color: var(--ui-bg); /* Arrière-plan dynamique */
  padding: 1em;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease; /* Effet fluide */
}

li:hover {
  background-color: var(--ui-bg-hover); /* Arrière-plan au survol */
  color: var(--text-low-contrast); /* Texte au survol */
}

a {
  color: inherit;
  text-decoration: none;
}

/* Lien actif */
a.router-link-exact-active {
  text-decoration: underline;
  font-weight: bold;
  color: var(--text-high-contrast); /* Met en valeur le lien actif */
}

/* Logo */
.logo {
  width: 75px;
  height: 75px;
}
</style>
