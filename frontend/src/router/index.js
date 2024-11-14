// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import navigationConfig from '@/config/navigation.js';

const routes = navigationConfig.map(route => ({
  path: route.path,
  name: route.name,
  component: route.component
}));

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
