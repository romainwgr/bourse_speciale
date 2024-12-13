<template>
  <div id="app">
    <Navbar />

    <router-view></router-view>
    <Footer />
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
      theme: 'theme-light', // Thème par défaut
    };
  },
  provide() {
    return {
      theme: this.theme,
      toggleTheme: this.toggleTheme,
    };
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
      document.documentElement.className = this.theme; // Applique le thème globalement

    },
  },
};
</script>

<style>
/* Styles globaux */
:root{
    --bg-app: #191113; /* Step 1 - App background */
    --bg-subtle: #1E1517; /* Step 2 - Subtle background */
  
    --ui-bg: #3A141E; /* Step 3 - UI element background */
    --ui-bg-hover: #4E1325; /* Step 4 - Hovered UI element background */
    --ui-bg-active: #5E1A2E; /* Step 5 - Active/Selected UI element background */
  
    --border-subtle: #6F2539; /* Step 6 - Subtle borders and separators */
    --border: #883447; /* Step 7 - UI element border and focus rings */
    --border-hover: #B3445A; /* Step 8 - Hovered UI element border */
  
    --solid-bg: #E54666; /* Step 9 - Solid background */
    --solid-bg-hover: #EC5A72; /* Step 10 - Hovered solid background */
  
    --text-low-contrast: #FF949D; /* Step 11 - Low-contrast text */
    --text-high-contrast: #FED2E1; /* Step 12 - High-contrast text */
    --element-size: 4rem;


}
:root.light-theme{
    --bg-app: #FFFCFD; /* Step 1 - App background */
    --bg-subtle: #FFF7F8; /* Step 2 - Subtle background */
  
    --ui-bg: #FEEAED; /* Step 3 - UI element background */
    --ui-bg-hover: #FFDCE1; /* Step 4 - Hovered UI element background */
    --ui-bg-active: #FFCED6; /* Step 5 - Active/Selected UI element background */
  
    --border-subtle: #F8BFC8; /* Step 6 - Subtle borders and separators */
    --border: #EFACB8; /* Step 7 - UI element border and focus rings */
    --border-hover: #E592A3; /* Step 8 - Hovered UI element border */
  
    --solid-bg: #E54666; /* Step 9 - Solid background */
    --solid-bg-hover: #DC3B5D; /* Step 10 - Hovered solid background */
  
    --text-low-contrast: #CA244D; /* Step 11 - Low-contrast text */
    --text-high-contrast: #64172B; /* Step 12 - High-contrast text */
    --element-size: 4rem;

}

.container-center {
  background-color: var(--bg-app);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: var(--bg-app); /* Arrière-plan basé sur le thème */
  color: var(--text-high-contrast); /* Couleur du texte dynamique */

}
</style>
