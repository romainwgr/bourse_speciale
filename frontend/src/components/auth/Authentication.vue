<template>
  <div class="authentication">

    <div class="auth-content">
      <h1 class="title">Netflix</h1>

      <SignIn v-if="currentTab === 'signIn'" />
      <SignUp v-if="currentTab === 'signUp'" />
    </div>

    <!-- Lien pour basculer entre connexion et inscription -->
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
      currentTab: "signIn", // Par défaut, l'onglet Connexion est affiché
    };
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.authentication {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.auth-content {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.switch-tab {
  font-size: 14px;
  color: #666;
}

.switch-tab a {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.switch-tab a:hover {
  text-decoration: underline;
}
</style>
