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
  .user-profile {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
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
  }
  
  .profile-info h1 {
    font-size: 20px;
    margin: 0;
    color: #333;
  }
  </style>
  