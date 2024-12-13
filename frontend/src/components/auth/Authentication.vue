<template>
  <div class="authentication">
    <div class="auth-content">
      <h1 class="title">Netflix</h1>

      <SignIn 
        v-if="currentTab === 'signIn'" 
        @authenticated="handleAuthenticated" 
      />
      <SignUp 
        v-if="currentTab === 'signUp'" 
        @registered="handleRegistered" 
      />
    </div>

    <p class="switch-tab">
      <span v-if="currentTab === 'signIn'">
        Pas encore inscrit ? 
        <a @click="currentTab = 'signUp'" href="javascript:void(0)">Inscription</a>
      </span>
      <span v-if="currentTab === 'signUp'">
        Déjà inscrit ? 
        <a @click="currentTab = 'signIn'" href="javascript:void(0)">Se connecter</a>
      </span>
    </p>
  </div>
</template>

<script>
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";

export default {
  name: "Authentication",
  components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      currentTab: "signIn",
    };
  },
  methods: {
    handleAuthenticated(user) {
      console.log("Utilisateur connecté :", user);
      this.$emit("authenticated", user); // Propager l'événement au parent
    },
    handleRegistered(user) {
      console.log("Utilisateur inscrit :", user);
      this.currentTab = "signIn"; // Basculer vers la connexion après l'inscription
    },
  },
};
</script>

<style scoped>
/* Titre principal */
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
  color: var(--text-high-contrast, #000); /* Texte dynamique */
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Conteneur principal */
.authentication {
  max-width: 450px;
  margin: 40px auto;
  text-align: center;
  background-color: var(--ui-bg, #f9f9f9); /* Fond dynamique */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre subtile */
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.authentication:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Ombre plus intense au survol */
}

/* Contenu de l'authentification */
.auth-content {
  border: 1px solid var(--border, #ccc); /* Bordure dynamique */
  padding: 25px;
  border-radius: 12px;
  background-color: var(--ui-bg, #fff); /* Fond dynamique */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Texte de basculement entre les onglets */
.switch-tab {
  font-size: 14px;
  color: var(--text-low-contrast, #666); /* Couleur dynamique pour le texte */
  margin-top: 10px;
}

.switch-tab a {
  color: var(--solid-bg, #007bff); /* Couleur dynamique pour les liens */
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.switch-tab a:hover {
  text-decoration: underline;
  color: var(--solid-bg-hover, #0056b3); /* Couleur au survol */
}

/* Réactivité pour les petits écrans */
@media (max-width: 600px) {
  .authentication {
    padding: 15px;
  }

  .auth-content {
    padding: 20px;
  }

  .title {
    font-size: 22px;
  }

  .switch-tab {
    font-size: 13px;
  }
}
</style>
