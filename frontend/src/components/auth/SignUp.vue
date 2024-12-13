<template>
  <div class="signup">
    <form @submit.prevent="handleSignUp">
      <div>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
          placeholder="Entrez votre nom"
        />
      </div>
      <div>
        <input
          type="text"
          id="public_name"
          v-model="formData.public_name"
          required
          placeholder="Entrez votre pseudonyme"
        />
      </div>
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
      <button type="submit">S'inscrire</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        public_name: "",
        email: "",
        password: "",
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSignUp() {
      try {
        const response = await fetch("http://localhost:3000/api/users/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();

        if (response.ok) {
          this.successMessage = "Inscription réussie !";
          this.errorMessage = "";
          this.resetForm();
          this.$emit("registered", data.user); // Émettre un événement avec les infos utilisateur
        } else {
          this.errorMessage = data.message || "Erreur lors de l'inscription.";
          this.successMessage = "";
        }
      } catch (error) {
        console.error("Erreur :", error);
        this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        this.successMessage = "";
      }
    },
    resetForm() {
      this.formData = {
        name: "",
        public_name: "",
        email: "",
        password: "",
      };
    },
  },
};
</script>

<style scoped>
/* Conteneur principal */
.signup {
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

.signup:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Ombre plus intense au survol */
}

/* Champs d'entrée */
.signup input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid var(--border, #ccc);
  border-radius: 8px;
  font-size: 16px;
  background-color: var(--ui-bg, #fff); /* Fond dynamique */
  color: var(--text-high-contrast, #333); /* Couleur du texte dynamique */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.signup input:focus {
  border-color: var(--border-hover, #007bff);
  box-shadow: 0 0 5px var(--border-hover, rgba(0, 123, 255, 0.5));
  outline: none;
}

/* Bouton d'inscription */
.signup button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: var(--solid-bg, #007bff);
  color: var(--text-high-contrast, white);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.signup button:hover {
  background-color: var(--solid-bg-hover, #0056b3);
  transform: scale(1.03); /* Légère mise en avant au survol */
}

.signup button:active {
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
  .signup {
    padding: 15px;
  }

  .signup input {
    font-size: 14px;
    padding: 10px;
  }

  .signup button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
