/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-06-03 20:36:15
 * @Description:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/loginRegistered/index.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/test/index.vue'),
        meta: { title: 'test' }
      }
    ]
  }
]
export const notFound = [
  {
    path: '/notfound',
    name: 'NoFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: false
})

export default router
