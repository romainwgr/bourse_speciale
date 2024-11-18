// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import navigationConfig from '@/config/navigation.js';

// Utilise navigationConfig pour définir les routes
const routes = navigationConfig.map(({ path, name, component }) => ({
  path,
  name,
  component
}));

// Crée le routeur
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
