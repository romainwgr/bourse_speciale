<!-- 
    Page de profil
-->
<template>
    <div class="profile">
      <h2>Mon Profil</h2>
      <div class="profile-details">
        <p><strong>Nom :</strong> John Doe</p>
        <p><strong>Email :</strong> john.doe@example.com</p>
        <p><strong>Films préférés :</strong></p>
        <ul>
          <li>Film 1</li>
          <li>Film 2</li>
          <li>Film 3</li>
        </ul>
        <button @click="editProfile">Modifier le profil</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
    methods: {
      editProfile() {
        // Ajouter la logique pour modifier le profil
        console.log("Modification du profil");
      }
    }
  };
  </script>
  
  <style scoped>
  .profile {
    max-width: 600px;
    margin: 0 auto;
    padding: 1em;
  }
  
  .profile-details {
    background-color: #f9f9f9;
    padding: 1em;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  button {
    display: block;
    margin: 1em auto;
    padding: 0.5em 1em;
    border: none;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;
  }
  </style>
  