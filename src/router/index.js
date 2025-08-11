import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { auth } from 'src/firebase' // ✅ aqui
import { onAuthStateChanged } from 'firebase/auth' // ✅ separado

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Protege rotas privadas
  Router.beforeEach((to, from, next) => {
    const isAuthPage = to.path === '/auth'

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()

      if (user) {
        // Usuário logado: impedir acesso à página de login
        if (isAuthPage) next('/finance')
        else next()
      } else {
        // Usuário NÃO logado: redirecionar para login se necessário
        if (isAuthPage) next()
        else next('/auth')
      }
    })
  })

  return Router
})
