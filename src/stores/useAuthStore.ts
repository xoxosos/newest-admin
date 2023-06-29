/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-20 18:01:34
 * @Description: 用于身份认证的store 提供登录注册注销等功能
 */
import router from '@/router'
import { api } from '@/utils/api'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

interface Props {
  username: string
  password: string

  [key: string]: any
}

interface AuthProp {
  token: string
  user: {
    [key: string]: any
  }
  dynamicRoutes: []
  menus: []
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthProp => ({
    token: '',
    dynamicRoutes: [],
    user: {},
    menus: []
  }),
  actions: {
    async login(user: Props) {
      const { username, password } = user
      try {
        const [e, r] = await api.apifoxLogin({
          username,
          password
        })
        if (r?.code === 0) {
          this.user = r?.data
          this.token = r?.data.token
          Cookies.set('satoken', this.token)
          console.log(Cookies.get('satoken'))
          router.push('/dashboard')
        } else if (r?.message) {
          message.error(r?.message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async register(user: Props) {
      const { username, password, email } = user
      try {
        const [e, r] = await api.registerUser({
          username,
          password,
          email
        })
        if (r?.code === 0) {
          message.success(r?.message)
        } else if (r?.message) {
          message.error(r?.message)
        }
        return r?.code === 0
      } catch (error) {
        console.error(error)
      }
    },
    logout() {
      console.log('logout')
      this.user = {}
      this.token = ''
      Cookies.remove('satoken', { path: '' })
      // localStorage.removeItem('__persist__auth')
      localStorage.clear()
    },
    isLogin() {
      const localToken = JSON.parse(localStorage.getItem('__persist__auth'))
      const cookieToken = Cookies.get('satoken')
      console.log(this.token)
      return !!(cookieToken || localToken || null)
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    getToken(state): string {
      return state.token
    },
    getRoutes(state): [] {
      return state.dynamicRoutes
    }
  }
})
