<template>
  <nav :class="theme"> <!-- Application dynamique de la classe -->
    <a href="/"><img src="@/assets/logo_test.png" alt="logo" class="logo"></a>
    <div class="navlinks">
      <ul>
        <!-- Filtre les liens avec showInNavbar à true -->
        <li v-for="(link, index) in filteredLinks" :key="index">
          <router-link :to="link.path">{{ link.name }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import navigationLinks from '@/config/navigation.js';

export default {
  name: 'Navbar',
  data() {
    return {
      navigationLinks,
    };
  },
  computed: {
    filteredLinks() {
      // Filtre uniquement les liens où showInNavbar est true
      return this.navigationLinks.filter(link => link.showInNavbar);
    }
  }
};
</script>

<style scoped>
nav {
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-subtle); /* Couleur d'arrière-plan de la barre de navigation */
}

.navlinks {
  padding: 1em;
}

.logo {
  width: 75px;
  height: 75px;
}

ul {
  list-style: none;
  display: flex;
  gap: 1.5em;
  margin: 0;
  padding: 0;
}

li {
  color: var(--text-high); /* Couleur du texte des liens */
  background-color: var(--ui-bg); /* Arrière-plan des liens */
  padding: 1em;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease; /* Transition pour hover */
}

li:hover {
  background-color: var(--ui-hover); /* Arrière-plan au survol */
  color: var(--text-low); /* Couleur du texte au survol */
}

a {
  color: inherit; /* Hérite de la couleur définie sur le parent */
  text-decoration: none;
}

a.router-link-exact-active{
text-decoration: underline;
  font-weight: bold;
  color: var(--text-high); /* Met en valeur le lien actif */
}
</style>