/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-06-04 13:12:31
 * @Description:
 */
import useStorage from '@/utils/common/useStorage'
import { createPinia, defineStore } from 'pinia'
const { getLocalStorageParse } = useStorage()
export const GlobalStore = defineStore({
  id: 'GlobalStore',
  state: () => {
    return {
      // token
      token: '',
      // collapsed
      isCollapsed: false,
      // dark theme
      isDark: getLocalStorageParse('GlobalStore')?.isDark || false
    }
  },
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
    setTheme() {
      this.isDark = !this.isDark
    }
  }
})

const pinia = createPinia()

export default pinia
