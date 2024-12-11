<template>
    <div id="app">
      <Navbar />
      <h1>Bienvenue sur l'application de films</h1>
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
      Footer
    }
  };
  </script>
  
  <style>
  /* Styles globaux, si nécessaire */
  </style>
  