<!-- 
    Composant qui affiche le profil d'un utilisateur avec 
    Sa photo de profil
    Son nom
-->
<template>
    <div class="user-profile">
      <div class="profile-picture">
        <img :src="user.profil_image || defaultImage" alt="Photo de profil" />
      </div>
      <div class="profile-info">
        <h1>{{ user.name }}</h1>
      </div>
    </div>
  </template>
  
  <script>
  import defaultImage from '../../assets/profil_img.jpg';
  
  export default {
    name: "UserProfile",
    props: {
      user: {
        type: Object,
        required: true,
        default: () => ({
          name: "Nom non disponible",
          profil_image: "", // Image par défaut définie ailleurs
        }),
      },
    },
    data() {
      return {
        defaultImage, // Image par défaut
      };
    },
  };
  </script>
  
  <style scoped>
/* Conteneur principal */
.user-profile {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--border, #ccc); /* Couleur dynamique pour les bordures */
  border-radius: 12px;
  max-width: 450px;
  margin: 20px auto;
  background-color: var(--ui-bg, #f4f4f4); /* Fond dynamique */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre subtile */
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.user-profile:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Ombre plus intense au survol */
}

/* Image de profil */
.profile-picture img {
  width: 90px;
  height: 90px;
  border-radius: 50%; /* Rend l'image circulaire */
  object-fit: cover; /* S'assure que l'image s'adapte bien au conteneur */
  border: 3px solid var(--solid-bg, #007bff); /* Couleur dynamique pour la bordure */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Ombre subtile autour de l'image */
}

/* Informations utilisateur */
.profile-info h1 {
  font-size: 22px;
  margin: 0;
  color: var(--text-high-contrast, #333); /* Couleur dynamique pour le texte */
  font-weight: bold;
  text-transform: capitalize; /* Met la première lettre en majuscule */
}

.profile-info h1:hover {
  color: var(--text-low-contrast, #666); /* Change la couleur au survol */
  transition: color 0.3s ease;
}
</style>

  