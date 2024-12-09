<template>
  <div class="profile-page">
    <!-- Affichage conditionnel : utilisateur authentifié ou non -->
    <div v-if="isAuthenticated">
      <Profile :user="user" />
    </div>
    <div v-else>
      <Authentication @authenticated="onAuthenticated" />
    </div>
  </div>
</template>

<!-- TODO Corriger l'appel a l'api voir si emit est optionnel ou non pour bien afficher la page de profil -->
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
    };
  },
  methods: {
    async checkAuthentication() {
      try {
        const response = await fetch("http://localhost:3000/api/users/profile", {
          method: "GET",
          credentials: "include",
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
      }
    },
    onAuthenticated(userData) {
      // Mise à jour de l'état après l'authentification
      this.user = userData;
      this.isAuthenticated = true;
    },
  },
  mounted() {
    this.checkAuthentication();
  },
};
</script>
