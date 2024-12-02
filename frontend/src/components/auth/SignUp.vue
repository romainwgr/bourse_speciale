<template>
    <div class="signup">
      <h2>Inscription</h2>
      <form @submit.prevent="handleSignUp">
        <div>
          <label for="name">Nom :</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            placeholder="Entrez votre nom"
          />
        </div>
        <div>
          <label for="public_name">Nom Public (Pseudonyme) :</label>
          <input
            type="text"
            id="public_name"
            v-model="formData.public_name"
            required
            placeholder="Entrez votre pseudonyme"
          />
        </div>
        <div>
          <label for="email">Email :</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            placeholder="Entrez votre email"
          />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
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
    max-width: 400px;
    margin: auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .signup label {
    display: block;
    margin-bottom: 0.5em;
  }
  .signup input {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .signup button {
    width: 100%;
    padding: 0.7em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .signup button:hover {
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
  