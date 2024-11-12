import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Assurez-vous que le chemin est correct
import Search from '../views/Search.vue'; // Un autre exemple de vue

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
