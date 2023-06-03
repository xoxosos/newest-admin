import { defineStore } from 'pinia'

export const UserStore = defineStore({
  id: 'UserStore',
  state: () => ({}),
  getters: {},
  actions: {
    setUserInfo(userInfo: object) {
      this.userInfo = userInfo
    }
  }
})
