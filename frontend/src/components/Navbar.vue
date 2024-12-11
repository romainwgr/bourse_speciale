<!--
    Composant qui affiche la barre de navigation
-->
<template>
  <nav>
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
      navigationLinks
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
  color: white;
  background-color: grey;
  padding: 1em;
  border-radius: 5px;
  
}

a {
  color: inherit;
  text-decoration: none;
}

a.router-link-exact-active {
  text-decoration: underline;
}
</style>
