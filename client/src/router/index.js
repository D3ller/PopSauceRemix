import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Room from '../views/Room.vue'
import Account from '@/views/account/Account.vue'
import CreateAccount from '@/views/account/CreateAccount.vue'
import LoginAccount from '@/views/account/LoginAccount.vue'
import Tr from '@/i18n/translation.js'
import Admin from '@/views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      redirect: `/${Tr.defaultLocale}/`
    },

    {
      path: "/:locale/",
      component: RouterView,
      beforeEnter: Tr.routeMiddleware,
      children: [

    {
      path: '',
      name: 'home',
      component: HomeView
    },
        {
          path: 'find',
          name: 'find',
          component: () => import('../views/Find.vue')
        },
    {
      path: 'room/:id',
      name: 'room',
      component: Room
    },
    {
      path: 'account',
      name: 'account',
      component: Account,
    },
    {
      path: 'account/register',
      name: 'register',
      component: CreateAccount,
    },
    {
      path: 'account/login',
      name: 'login',
      component: LoginAccount
    },
    {
      path: 'admin',
      name: 'admin',
      component: Admin
    }
  ]
}
  ]
})

export default router
