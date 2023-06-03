/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-05-30 20:49:37
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router'
const superAdminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/workplace',
    meta: { title: '数据台', icon: 'home_line' },
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '/dashboard/workplace',
        name: 'dashboard',
        component: () => import('@/views/dashboard/WorkView.vue'),
        meta: { title: '工作台' }
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: () => import('@/views/dashboard/DashBoard.vue'),
        meta: { title: '分析页' }
      }
    ]
  },
  {
    path: '/system-manage',
    name: 'system-manage',
    redirect: '/system-manage/auth',
    meta: { title: '系统管理', icon: 'setting_line' },
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '/system-manage/auth-manage',
        name: 'auth-manage',
        meta: { title: '权限管理' },
        children: [
          {
            path: '/system-manage/auth-manage/auth',
            name: 'auth',
            component: () => import('@/views/auth/list.vue'),
            meta: { title: '权限列表' }
          }
        ]
      }
    ]
  }
]
const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/workplace',
    meta: { title: '数据台', icon: 'home_line' },
    component: () => import('@/views/HomeView.vue'),

    children: [
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: () => import('@/views/dashboard/WorkView.vue'),
        meta: { title: '工作台' }
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: () => import('@/views/dashboard/DashBoard.vue'),
        meta: { title: '分析页' }
      }
    ]
  },
  {
    path: '/user-manage',
    name: 'user-manage',
    redirect: '/user-manage/users',
    meta: { title: '用户管理', icon: 'user_line' },
    component: () => import('@/views/HomeView.vue'),

    children: [
      {
        path: '/user-manage/users',
        name: 'users',
        component: () => import('@/views/user/list.vue'),
        meta: { title: '用户列表' }
      }
    ]
  },
  {
    path: '/system-manage',
    name: 'system-manage',
    redirect: '/system-manage/auth',
    meta: { title: '系统管理', icon: 'setting_line' },
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '/system-manage/auth-manage',
        name: 'auth-manage',
        meta: { title: '权限管理' },
        children: [
          {
            path: '/system-manage/auth-manage/auth',
            name: 'auth',
            component: () => import('@/views/auth/list.vue'),
            meta: { title: '权限列表' }
          }
        ]
      }
    ]
  },
  {
    path: '/generate-form',
    name: 'generate',
    component: () => import('@/views/genarateform/drawableView.vue'),
    meta: { title: '表单生成器', icon: 'classify_line' }
  }
]
const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/workplace',
    meta: { title: '数据台', icon: 'home_line' },
    component: () => import('@/views/HomeView.vue'),

    children: [
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: () => import('@/views/dashboard/WorkView.vue'),
        meta: { title: '工作台' }
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: () => import('@/views/dashboard/DashBoard.vue'),
        meta: { title: '分析页' }
      }
    ]
  },
  {
    path: '/user-manage',
    name: 'user-manage',
    redirect: '/user-manage/users',
    meta: { title: '用户管理', icon: 'user_line' },
    component: () => import('@/views/HomeView.vue'),

    children: [
      {
        path: '/user-manage/users',
        name: 'users',
        component: () => import('@/views/user/list.vue'),
        meta: { title: '用户列表' }
      }
    ]
  },
  {
    path: '/generate-form',
    name: 'generate',
    component: () => import('@/views/genarateform/drawableView.vue'),
    meta: { title: '表单生成器', icon: 'classify_line' }
  }
]
const getDynamicRoute = (routes = []) => {
  return new Promise((resolve, reject) => {
    resolve({ routes })
  })
}

const useDynamicRoute = (roleFlag) => {
  switch (roleFlag) {
    case '0':
      return superAdminRoutes
    case '1':
      return adminRoutes
    case '2':
      return userRoutes
  }
}
export { getDynamicRoute }
export default useDynamicRoute
interface MenuItem {
  path: string
  name: any
  meta?: {}
  children?: MenuItem[]
}

function generateMenuItems(routes: RouteRecordRaw[]): MenuItem[] {
  const menuItems: MenuItem[] = []

  routes.forEach((route) => {
    // 排除无效的路由或不需要显示在菜单中的路由
    if (route.meta?.hidden || !route.path || !route.name) {
      return
    }

    const menuItem: MenuItem = {
      path: route.path,
      name: route.name,
      meta: route.meta
    }

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      menuItem.children = generateMenuItems(route.children)
    }

    menuItems.push(menuItem)
  })

  return menuItems
}
