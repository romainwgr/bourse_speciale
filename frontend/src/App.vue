<template>
  <div id="app" :class="theme">
    <Navbar />
    <router-view></router-view>
    <Footer />
    <button class="theme-toggle" @click="toggleTheme">Changer le thème</button>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      theme: 'theme-dark', // Thème par défaut
    };
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
    },
  },
};
</script>

<style>
/* Utilisation des variables CSS */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: var(--bg-app); /* Arrière-plan dynamique basé sur le thème */
  color: var(--text-high-contrast); /* Couleur du texte dynamique */
}

/* Bouton de basculement du thème */
.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: var(--ui-bg);
  color: var(--text-high-contrast);
  border: 1px solid var(--border);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-toggle:hover {
  background-color: var(--ui-bg-hover);
  color: var(--text-low-contrast);
}
</style>
