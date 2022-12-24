import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { state } from 'vue-tsc/out/shared'

export const useUsers = defineStore('users', {
  state: () => ({
    token: ''
  }),
  actions: {
    updateToken(token:string){
      this.token=token
    }
  }
})
