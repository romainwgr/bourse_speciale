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
        <h2>Pseudo : {{ user.public_name }}</h2>
        <h2>E-mail : {{ user.email }}</h2>
      </div>
    </div>
    <div class="liked-movies">
      <h2>Films favoris :</h2>
      <!-- Compléter avec les films favoris -->
      <p>Aucun film favoris !</p>
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
          name: "Nom indisponible",
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

  /* User profile */

  .user-profile {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
    background-color: #f9f9f9;
  }
  
  .profile-picture img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #007bff;
    align-items: center;
  }
  
  .profile-info h1 {
    font-size: 20px;
    text-align: center;
    margin-top: 0;
  }

  .profile-info h2 {
    font-size: 16px;
    margin: 0;
  }

  /* liked */

  .liked-movies {
    display: flex;
    flex-direction: column;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 30px;
    margin-top: 30px;
    margin-inline: 30px;
    background-color: #f9f9f9;
  }

  .liked-movies h2, .liked-movies p {
    text-align: center;
  }

  .liked-movie-list li {
    color:#333;
  }
  </style>
  