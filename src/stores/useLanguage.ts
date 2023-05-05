/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-05 21:02:27
 * @LastEditors: CodeForBetter xoxosos666@gmail.com
 * @LastEditTime: 2023-05-06 00:16:52
 * @FilePath: \newest-admin\src\stores\useLanguage.ts
 * @Description:
 */
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore({
  id: 'lang',
  state: () => ({
    language: 'zhCN'
  }),
  actions: {
    changeLanguage(lang) {
      this.language = lang
      console.log(' ', this.language)
    }
  },
  getters: {
    getLanguage(): string {
      return this.language
    }
  }
})
