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
      Footer
    }
  };
  </script>
  
<style>
body {
  background-color: #1B1B1B;
  margin: 0;
}
</style>
  