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
 
 
  .login-form input {
    width: 80%;
    padding: 0.5em;
    margin-bottom: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .login-form button {
    width: 85%;
    padding: 0.7em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .login-form button:hover {
    background-color: #0056b3;
  }
  .success {
    color: green;
    margin-top: 1em;
  }
  .error {
    color: red;
    margin-top: 1em;
  }
  </style>
  