<!--
    Composant qui affiche la barre de navigation
-->
<template>
    <nav>
      <ul>
        <li v-for="(link, index) in navigationLinks" :key="index">
          <router-link :to="link.path">{{ link.name }}</router-link>
        </li>
      </ul>
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
    }
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #333;
    padding: 1em;
  }
  
  ul {
    list-style: none;
    display: flex;
    gap: 1em;
  }
  
  li {
    color: #fff;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  a.router-link-exact-active {
    font-weight: bold;
    text-decoration: underline;
  }
  </style>
  