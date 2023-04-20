import router from '@/router'
import { api } from '@/utils/api'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

interface Props {
  userAccount: string
  password: string
  remember: boolean
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
      const { userAccount, password, remember } = user
      try {
        // const [e, r] = await api.getUserToken({
        //   userAccount,
        //   password
        // })
        const [e, r] = await api.getUserToken({ apifoxToken: 'dROD5webTSINtKEixUxWWBYNnjoRsSXn' })
        if (r?.code === 0) {
          this.user = r?.data
          remember && localStorage.setItem('userFormState', JSON.stringify(user))
          localStorage.setItem('user', JSON.stringify(r?.data))
          // 可替换为任意首页
          router.push('/dashboard')
        } else if (r?.msg) {
          message.error(r?.msg)
        }
      } catch (error) {
        console.error(error)
      }
    },
    loadFromLocalStorage(): void {
      if (this.user.token) return
      const userJson = window.localStorage.getItem('user')
      console.log(userJson)
      if (userJson === 'undefined') return
      if (userJson) this.user = JSON.parse(userJson)
    },
    logout() {
      console.log('logout')
      this.user = { token: '' }
      localStorage.removeItem('user')
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
