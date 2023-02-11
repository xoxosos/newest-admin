import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.less'
import './assets/main.css'
import './assets/style.scss'
import { useUsers } from '@/stores/user'

const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
/**
 * 路由跳转执行的钩子
 */
router.beforeEach((to, from, next) => {
  // 判断是否登陆
  const users = useUsers()
  const updateUserStore = () => {
    users.$patch({
      // userData: JSON.parse(<any>sessionStorage.getItem('userdata')),
      token: <string>sessionStorage.getItem('token')
    })
  }
  sessionStorage.getItem('token') ? updateUserStore() : users.$reset()
  console.log('token:', users.token)
  if (!users.token) {
    // 未登录 对象为空
    if (to.path === '/login') {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
