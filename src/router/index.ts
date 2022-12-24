import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/DashBoard.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/user/list.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginRegistered/LoginView.vue')
    }
  ]
})

export default router
