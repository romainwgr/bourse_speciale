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
  background-color: var(--ui-bg, #1A1A1A); /* Fond dynamique */
  color: var(--text-high-contrast, #fff); /* Couleur de texte dynamique */
  padding: 1em;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2); /* Ombre subtile pour séparer visuellement */
  font-size: 14px;
  z-index: 1000; /* Assure que le footer est au-dessus des autres éléments */
  transition: background-color 0.3s ease, color 0.3s ease; /* Transitions pour le fond et le texte */
}

/* Ajout d'un effet au survol */
.footer:hover {
  background-color: var(--ui-bg-hover, #333); /* Couleur dynamique au survol */
  color: var(--text-low-contrast, #bbb); /* Texte au survol */
}
</style>