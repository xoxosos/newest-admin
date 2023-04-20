import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/antd.less'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import './assets/style.scss'
import router from './router'
import { useAuthStore } from './stores/useAuthStore.js'

const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
/**
 * 路由跳转执行的钩子
 */
const auth = useAuthStore()
router.beforeEach((to, from, next) => {
  console.log('routerBefore->hasToken:', auth.isLoggedIn)
  // const token = auth.$state.user.token
  if (auth.isLoggedIn) {
    // 登录则放行
    next()
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
