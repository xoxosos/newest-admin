/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-20 18:01:34
 * @Description: 用于身份认证的store 提供登录注册注销等功能
 */
import router from '@/router'
import { api } from '@/utils/api'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

interface Props {
  username: string
  password: string
  [key: string]: any
}

interface User {
  user: {
    token: string
    [key: string]: any
  }
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): User => ({
    user: {
      token: ''
    }
  }),
  actions: {
    async login(user: Props) {
      const { username, password } = user
      try {
        const [r] = await api.login({
          username,
          password
        })
        if (r?.code === 0) {
          this.user = r?.data
          // 可替换为任意首页
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
      this.user = { token: '' }
      localStorage.removeItem('__persist__auth')
      router.push('/login')
    }
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.user.token
    },
    getToken(): string {
      return this.user.token
    }
  }
})
