<!--
    Composant qui affiche le footer
-->
<template>
  <footer class="footer">
    <p>&copy; 2024 - Bourse Spéciale - Toute reproduction formellement interdite sous peine de prison ferme pendant 2 ans et une amende de 75 000 euros (à partager équitablement avec les membres du groupe).</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>

html, body {
  margin: 0;
  padding: 0;
  height: 100%; 
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

main {
  flex: 1;
}

.footer {
  background-color: grey;
  color: #fff;
  margin-block: 10px;
  padding: 0.5em;
  text-align: center;
}
</style>
