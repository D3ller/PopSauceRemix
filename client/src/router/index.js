import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Room from '../views/Room.vue'
import Account from '@/views/account/Account.vue'
import CreateAccount from '@/views/account/CreateAccount.vue'
import LoginAccount from '@/views/account/LoginAccount.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/room/:id',
      name: 'room',
      component: Room
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
    },
    {
      path: '/account/register',
      name: 'register',
      component: CreateAccount,
    },
    {
      path: '/account/login',
      name: 'login',
      component: LoginAccount
    }
  ]
})

export default router
