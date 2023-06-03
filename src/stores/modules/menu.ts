/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-06-03 20:35:14
 * @Description:
 */

import router from '@/router'
import matchRouter from '@/router/permission'
import { notFound, routes } from '@/router/router'
import { api } from '@/utils/api'
import useDynamicRoute from '@/utils/common/useDynamicRoute'
import { defineStore } from 'pinia'
import { useAuthStore } from '../useAuthStore'

export const MenuStore = defineStore({
  id: 'MenuStore',
  state: () => ({
    // 后端传的菜单列表
    menuList: [],
    // 过滤后的菜单列表
    matchList: [],
    //
    storageRouter: []
  }),
  getters: {},
  actions: {
    async setMenuList() {
      // 获取后端请求路由
      try {
        let getRouter: any = await api.apifoxGetMenuList()
        // (模拟后台返回的路由表)
        getRouter = [
          {
            icon: 'histogram',
            path: '/home',
            title: '主页'
          },
          {
            icon: 'histogram',
            path: '/dashboard',
            title: '数据大屏'
          },
          {
            icon: 'histogram',
            path: '/system-manage',
            title: 'system'
          }
        ]
        // 根据角色生成路由表
        const list = useDynamicRoute(useAuthStore().user.roleFlag)

        // 与前端动态路由表过滤
        const arr = matchRouter(list, getRouter)

        console.log(list)

        // 合并公共路由表
        const routerList = routes.concat(list)
        routerList.forEach((route) => {
          const routeName: any = route.name
          if (!router.hasRoute(routeName)) {
            // 动态添加到路由中
            router.addRoute(route)
          }
        })
        notFound.forEach((notFound) => router.addRoute(notFound))
        // 保存菜单列表
        this.matchList = routerList
        // 保存缓存路由
        this.storageRouter = routerList
        // test
      } catch (e) {
        console.log(e)
      }
    }
  }
})
