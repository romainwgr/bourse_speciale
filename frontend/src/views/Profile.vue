<template>
    <div class="profile-page">
      <!-- Affichage du loader pendant la vérification de l'authentification -->
      <div v-if="isLoading">
        <p>Chargement...</p>
      </div>
      <!-- Affichage conditionnel : utilisateur authentifié ou non -->
      <div v-else-if="isAuthenticated">
        <Profile :user="user" />
      </div>
      <div v-else>
        <Authentication @authenticated="onAuthenticated" />
      </div>
    </div>
  </template>
  
  <script>
  import Authentication from "@/components/auth/Authentication.vue";
  import Profile from "@/components/profile/Profile.vue";
  
  export default {
    name: "ProfilePage",
    components: {
      Authentication,
      Profile,
    },
    data() {
      return {
        isAuthenticated: false,
        user: null,
        isLoading: true, // Ajout d'un état de chargement
      };
    },
    methods: {
      async checkAuthentication() {
        try {
          const token = localStorage.getItem('token'); 
  
          // Simuler un délai de 0,2 seconde
          await new Promise(resolve => setTimeout(resolve, 200));
  
          const response = await fetch("http://localhost:3000/api/users/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Ajoutez le token dans l'en-tête Authorization
            },
          });
  
          if (response.ok) {
            const userData = await response.json();
            this.user = userData;
            this.isAuthenticated = true;
          } else {
            this.isAuthenticated = false;
          }
        } catch (error) {
          console.error("Erreur lors de la vérification de l'authentification :", error);
          this.isAuthenticated = false;
        } finally {
          this.isLoading = false; // Désactiver le mode chargement une fois terminé
        }
    },
      onAuthenticated(userData) {
        // Mise à jour de l'état après l'authentification
        this.user = userData;
        this.isAuthenticated = true;
        this.isLoading = false; // Assurez-vous que le chargement est terminé
      },
    },
    mounted() {
      this.checkAuthentication();
    },
  };
    </script>
    
    <style scoped>
    /* Conteneur principal du profil */
    .profile {
      max-width: 600px;
      margin: 0 auto;
      padding: 1.5em;
      background-color: var(--ui-bg, #f4f4f4); /* Fond dynamique basé sur le thème */
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Section des détails du profil */
    .profile-details {
      background-color: var(--ui-bg, #fff); /* Fond dynamique basé sur le thème */
      padding: 1.5em;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease, background-color 0.3s ease;
    }
    
    .profile-details:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Augmente l'ombre au survol */
    }
    
    /* Boutons */
    button {
      display: block;
      margin: 1.5em auto;
      padding: 0.75em 1.5em;
      border: none;
      font-size: 16px;
      font-weight: bold;
      background-color: var(--solid-bg, #333); /* Couleur dynamique */
      color: var(--text-high-contrast, #fff); /* Couleur de texte dynamique */
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }
    
    button:hover {
      background-color: var(--solid-bg-hover, #555); /* Arrière-plan dynamique au survol */
      transform: scale(1.05); /* Légère mise en avant au survol */
    }
    
    button:active {
      transform: scale(0.95); /* Effet de pression */
    }
    
    button:focus {
      outline: 2px solid var(--border-hover, #888); /* Ajoute un focus visible pour l'accessibilité */
    }
    
    /* Ajout de transitions douces */
    button, .profile-details {
      transition: all 0.3s ease;
    }
    </style>
    
    
     

  