<!-- 
    Page de profil
-->
<template>
  <div class="profile">
    <!-- Autres contenus du profil -->
    <!-- Intégration du composant SignUp -->
    <Authentication />
  </div>
</template>


  
  <script>
  import Authentication from "@/components/auth/Authentication.vue";

export default {
  name: "Profile",
  components: {
    Authentication
  },
};
  </script>
  
  <style scoped>
  .profile {
    max-width: 600px;
    margin: 0 auto;
    padding: 1em;
  }
  
  
  </style>
  