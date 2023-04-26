/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-20 17:41:06
 * @Description:主文件
 */
import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/antd.less'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import './assets/style.less'
import router from './router'
import { useAuthStore } from './stores/useAuthStore.js'
const app = createApp(App)
const pinia = createPinia()
pinia.use(
  createPersistedState({
    // 全局 key 配置接受传入 Store key 的函数，并返回一个新的 storage 密钥。
    key: (id) => `__persist__${id}`,
    //  该配置将会使所有 Store 持久化存储，且必须配置 persist: false 显式禁用持久化。
    auto: true
  })
)
app.use(pinia).use(router).mount('#app')
/**
 * 路由跳转执行的钩子
 */
const auth = useAuthStore()
router.beforeEach((to, from, next) => {
  console.log('routerBefore->hasToken:', auth.isLoggedIn)
  if (to.path === '/') {
    if (auth.isLoggedIn) {
      next('/dashboard')
      // 登录则放行
      return
    }
    next('/login')
    return
  }
  if (auth.isLoggedIn) {
    next()
    // 登录则放行
    return
  }
  // 如果没有token，那么就需要判断跳转到登录页面还是放行，需要使用history.length属性
  if (to.path === '/login') {
    next()
    return
  }
  if (history.length <= 1) {
    // 没有历史记录，直接跳转到登录页面
    next('/login')
    return
  }
  // 有历史记录，回退到上一个页面
  history.back()
})
