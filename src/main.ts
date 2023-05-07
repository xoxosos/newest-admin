/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-20 17:41:06
 * @Description:主文件
 */
import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/antd.less'
import 'ant-design-vue/dist/antd.variable.less'
import 'normalize.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/iconfont/iconfont.js'
import './assets/styles/common/var.css'
import './assets/styles/index.less'
import SvgIcon from './components/iconfont/SvgIcon.vue'
import i18n from './locales/lang/index'
import router from './router'
import { useAuthStore } from './stores/useAuthStore.js'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)

const pinia = createPinia()

pinia.use(
  createPersistedState({
    // 全局 key 配置接受传入 Store key 的函数，并返回一个新的 storage 密钥。
    key: (id) => `__persist__${id}`,
    //  该配置将会使所有 Store 持久化存储，且必须配置 persist: false 显式禁用持久化。
    auto: true
  })
)
app.use(pinia).use(router).use(i18n).mount('#app')
const auth = useAuthStore()
const defaultPath = '/dashboard/workplace'
router.beforeEach((to, from, next) => {
  NProgress.start()
  const isAuthenticated = computed(() => auth.isLoggedIn).value
  console.log('RouteBeforeEach->hasToken:', isAuthenticated)
  if ((to.path === '/login' || to.path === '/') && isAuthenticated) {
    // 如果已登录，且要跳转的页面是登录页，直接跳转到首页
    next({ path: defaultPath, query: { redirect: to.fullPath } })
  } else if (!isAuthenticated && to.path !== '/login') {
    // 如果未登录，且要跳转的页面不是登录页，直接跳转到登录页
    next({ path: '/login' })
  } else {
    // 其他情况，放行
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
