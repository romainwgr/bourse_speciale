<!--
    Composant qui affiche le footer
-->
<template>
  <footer class="footer">
    <p>&copy; 2024 - Bourse Spéciale</p>
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
  background-color: #1A1A1A;
  color: #fff;
  padding: 0.5em;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
