/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-20 17:41:06
 * @Description: 路由
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/dashboard',
          name: 'index',
          redirect: '/dashboard/workplace',
          meta: { title: '首页' },
          children: [
            {
              path: '/dashboard/workplace',
              name: 'workplace',
              component: () => import('../views/dashboard/WorkView.vue'),
              meta: { title: '工作台' }
            },
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: () => import('../views/dashboard/DashBoard.vue'),
              meta: { title: '分析页' }
            }
          ]
        },
        {
          path: '/user-manage',
          name: 'user-manage',
          redirect: '/user-manage/users',
          meta: { title: '用户管理' },
          children: [
            {
              path: '/user-manage/users',
              name: 'users',
              component: () => import('../views/user/list.vue'),
              meta: { title: '用户列表' }
            }
          ]
        },
        {
          path: '/system-manage',
          name: 'system-manage',
          redirect: '/system-manage/auth',
          meta: { title: '系统管理' },
          children: [
            {
              path: '/system-manage/auth-manage',
              name: 'auth-manage',
              meta: { title: '权限管理' },
              children: [
                {
                  path: '/system-manage/auth-manage/auth',
                  name: 'auth',
                  component: () => import('../views/auth/list.vue'),
                  meta: { title: '权限列表' }
                }
              ]
            }
          ]
        },
        {
          path: '/generate-form',
          name: 'generate',
          component: () => import('../views/genarateform/drawableView.vue'),
          meta: { title: '表单生成器' }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginRegistered/index.vue')
    }
  ]
})

export default router
