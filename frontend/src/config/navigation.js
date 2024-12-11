export default [
  {
    name: 'Accueil',
    path: '/',
    component: () => import('../views/Home.vue'),
    showInNavbar: true
  },
  {
    name: 'Recherche de films',
    path: '/search',
    component: () => import('../views/Search.vue'),
    showInNavbar: true
  },
  {
    name: 'Profil',
    path: '/profil',
    component: () => import('../views/Profile.vue'),
    showInNavbar: true
  },
  {
    name: 'FilmDetail',
    path: '/films/:id',
    component: () => import('@/components/film/FilmDetail.vue'),
    showInNavbar: false
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    showInNavbar: false
  }
];
