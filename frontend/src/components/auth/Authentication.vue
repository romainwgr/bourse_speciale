<template>
    <div class="authentication">
      <div class="auth-tabs">
        <h2
          :class="{ active: currentTab === 'signIn' }"
          @click="currentTab = 'signIn'"
        >
          Connexion
        </h2>
        <h2
          :class="{ active: currentTab === 'signUp' }"
          @click="currentTab = 'signUp'"
        >
          Inscription
        </h2>
      </div>
  
      <div class="auth-content">
        <SignIn v-if="currentTab === 'signIn'" />
        <SignUp v-if="currentTab === 'signUp'" />
      </div>
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
        currentTab: "signIn", // Par défaut, l'onglet Connexion est affiché
      };
    },
  };
  </script>
  
  <style scoped>
  .authentication {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  .auth-tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .auth-tabs h2 {
    cursor: pointer;
    padding: 10px 20px;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
  }
  
  .auth-tabs h2.active {
    border-bottom: 2px solid #007bff;
    color: #007bff;
  }
  
  .auth-content {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  