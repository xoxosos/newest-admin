/*
 * @Author: LinRenJie
 * @Date: 2022-12-24 21:30:35
 * @LastEditTime: 2023-03-08 14:34:27
 * @Description:
 * @FilePath: /admin/src/main.ts
 * @Email: xoxosos666@gmail.com
 */
import { useUsers } from '@/stores/user'
import 'ant-design-vue/dist/antd.less'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import './assets/style.scss'
import router from './router'

const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
/**
 * 路由跳转执行的钩子
 */
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  // 判断是否登陆
  const users = useUsers()
  const updateUserStore = () => {
    users.$patch({
      // userData: JSON.parse(<any>sessionStorage.getItem('userdata')),
      token: <string>token
    })
  }
  token ? updateUserStore() : users.$reset()
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
