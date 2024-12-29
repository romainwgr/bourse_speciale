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
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.signup input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.signup input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.signup button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup button:hover {
  background-color: #0056b3;
}

.success,
.error {
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.success {
  color: green;
}

.error {
  color: red;
}

/* Réactivité pour les petits écrans */
@media (max-width: 600px) {
  .signup {
    padding: 15px;
  }

  .signup input {
    font-size: 14px;
    padding: 8px;
  }

  .signup button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
