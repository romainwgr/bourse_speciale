import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import du routeur

// Import des styles globaux
import './assets/styles/colors.scss'; // Chemin vers tes variables SCSS

const app = createApp(App);

app.use(router); // Utilisation du routeur dans l'application
app.mount('#app');
