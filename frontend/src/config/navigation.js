export default [
    {
      name: 'Accueil',
      path: '/',
      component: () => import('../views/Home.vue') // Lazy-loading du composant
    },
    {
      name: 'Recherche de films',
      path: '/recherche',
      component: () => import('../views/Search.vue')
    },
    {
      name: 'Profil',
      path: '/profil',
      component: () => import('../views/Profile.vue')
    }
  ];
  