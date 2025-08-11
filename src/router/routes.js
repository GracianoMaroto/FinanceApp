const routes = [
  // Login/Register SEM layout principal
  {
    path: '/auth',
    component: () => import('pages/LoginRegisterPage.vue'),
  },

  // Rotas protegidas COM layout
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/auth', redirect: '/finance' }, // Redireciona para finanças após login
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'finance', component: () => import('pages/FinancasPage.vue') },
    ],
  },

  // Página 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]


export default routes
