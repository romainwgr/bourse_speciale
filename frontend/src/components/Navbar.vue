<!--
    Composant qui affiche la barre de navigation
-->
<template>
  <nav class="navbar">
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

window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  var scrolled = window.scrollY > 0;
  if(scrolled) {
    navbar.classList.add('navbar-scrolled');
    console.log('add');
  } else {
    navbar.classList.remove('navbar-scrolled');
    console.log('remove');
  }
});
</script>

<style scoped>

nav {
  position: fixed;
  top: 0;
  width: 100%;
  height : 4.2em;
  padding: 0.5em 0;
  display: flex;
  justify-content: space-between; 
  align-items: center;           
  background-color: rgba(51, 51, 51, 0);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navlinks {
  display: flex;
  justify-content: center;  
  margin: 0em 1em;
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


a.router-link-exact-active {
  text-decoration: underline;
}

nav a {
  display: flex;
}

nav .logo {
  width: 3.125em;  
  height: auto;    
}

.navbar-scrolled {
    background-color: rgb(29, 29, 29);
    height: 3.6em;
}
</style>
