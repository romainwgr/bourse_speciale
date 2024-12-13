<!--  
  Composant qui gère la connexion mail/mdp
-->
<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <div>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          placeholder="Entrez votre email"
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();

        if (response.ok) {
          this.successMessage = "Connexion réussie !";
          this.errorMessage = "";
          localStorage.setItem("token", data.token); // Stocker le token JWT
          this.$emit("authenticated", data.user); // Émettre un événement avec les infos utilisateur
        } else {
          this.errorMessage = data.message || "Erreur lors de la connexion.";
          this.successMessage = "";
        }
      } catch (error) {
        console.error("Erreur :", error);
        this.errorMessage = "Impossible de se connecter au serveur.";
        this.successMessage = "";
      }
    },
  },
};
</script>

<style scoped>
/* Conteneur principal du formulaire */
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid var(--border, #ddd); /* Bordure dynamique */
  border-radius: 12px;
  background-color: var(--ui-bg, #f9f9f9); /* Fond dynamique */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre subtile */
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.login-form:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Ombre plus intense au survol */
}

/* Champs d'entrée */
.login-form input {
  width: 90%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid var(--border, #ccc); /* Bordure dynamique */
  border-radius: 8px;
  font-size: 16px;
  background-color: var(--ui-bg, #fff); /* Fond dynamique */
  color: var(--text-high-contrast, #333); /* Couleur du texte dynamique */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.login-form input:focus {
  border-color: var(--border-hover, #007bff); /* Couleur au focus */
  box-shadow: 0 0 5px var(--border-hover, rgba(0, 123, 255, 0.5));
  outline: none;
}

/* Bouton de connexion */
.login-form button {
  width: 90%;
  padding: 12px;
  font-size: 16px;
  background-color: var(--solid-bg, #007bff); /* Couleur dynamique */
  color: var(--text-high-contrast, white); /* Couleur du texte dynamique */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-form button:hover {
  background-color: var(--solid-bg-hover, #0056b3); /* Couleur au survol */
  transform: scale(1.03); /* Légère mise en avant */
}

.login-form button:active {
  transform: scale(0.97); /* Effet de pression */
}

/* Messages de succès et d'erreur */
.success,
.error {
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.success {
  color: var(--success-color, green); /* Couleur dynamique pour succès */
}

.error {
  color: var(--error-color, red); /* Couleur dynamique pour erreurs */
}

/* Réactivité pour les petits écrans */
@media (max-width: 600px) {
  .login-form {
    padding: 15px;
  }

  .login-form input {
    font-size: 14px;
    padding: 10px;
  }

  .login-form button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
