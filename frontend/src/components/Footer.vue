<!--
    Composant qui affiche le footer
-->
<template>
  <footer class="footer">
    <p>&copy; 2024 Votre Application de Films</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
/* Styles généraux pour garantir le sticky footer */
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* Permet d'étendre le body à la taille de la fenêtre */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100%; /* App occupe au moins la hauteur de la fenêtre */
}

/* Contenu principal de la page */
main {
  flex: 1; /* Remplit tout l'espace disponible avant le footer */
}

/* Footer collant */
.footer {
  background-color: #333;
  color: #fff;
  padding: 1em;
  text-align: center;
  margin-top: auto; /* Place le footer après le contenu */
}
</style>
