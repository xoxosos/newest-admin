/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-05-09 19:01:32
 * @Description:
 */
import router from '@/router/router'
import { MenuStore } from '@/stores/modules/menu'
import { TabsStore } from '@/stores/modules/tabs'
import { useAuthStore } from '@/stores/useAuthStore'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * 路由拦截
 */
router.beforeEach(async (to, from, next) => {
  console.log('beforeEach', to, from, next)

  const auth = useAuthStore()
  NProgress.start()

  // 判断当前路由是否需要访问权限
  const tabsStore = TabsStore()
  const hasTabs = tabsStore.tabsOption.some((tab) => tab.key === to.path)

  if (!hasTabs && to.matched.length > 0 && to.path !== '/login' && to.name !== 'not-found') {
    tabsStore.addTab(to.meta.title as string, to.path)
  }

  if (auth.isLoggedIn) {
    if (to.name === 'login' || to.matched.length > 0) {
      next()
    } else {
      await MenuStore().setMenuList()
      next({ ...to, replace: true })
    }
  } else if (to.path === '/login') {
    next()
  } else {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
