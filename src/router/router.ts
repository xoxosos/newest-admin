/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-06-03 20:36:15
 * @Description:
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/loginRegistered/index.vue')
  },
  {
    path: '/utils',
    name: 'utils',
    redirect: '/utils/todo',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '内置组件',
      icon: 'classify_line'
    },
    children: [
      {
        path: '/utils/todo',
        name: 'todo',
        component: () => import('@/views/applications/TodoList.vue'),
        meta: { title: 'todoList' }
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
  history: createWebHashHistory(),
  routes,
  strict: false
})

export default router
