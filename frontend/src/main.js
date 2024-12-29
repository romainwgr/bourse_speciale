import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import du routeur
import { jwtDecode } from "jwt-decode";

// Vérification du token au démarrage
const token = localStorage.getItem("token");
if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
        console.log("Token expiré, suppression.");
        localStorage.removeItem("token");
    }
}
const app = createApp(App);

app.use(router); // Utilisation du routeur dans l'application
app.mount('#app');
