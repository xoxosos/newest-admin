/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-05 21:02:27
 * @LastEditors: CodeForBetter xoxosos666@gmail.com
 * @LastEditTime: 2023-05-07 18:56:40
 * @FilePath: \newest-admin\src\stores\useLanguage.ts
 * @Description:
 */
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'

const langs = {
  en: 'en',
  'en-US': 'en',
  'en-GB': 'en',
  zhCN: 'zhCN',
  jp: 'ja'
}
export const useLanguageStore = defineStore({
  id: 'lang',
  state: () => ({
    language: langs[window.navigator.language] || 'zhCN'
  }),
  actions: {
    changeLanguage(lang) {
      this.language = lang
      message.success('修改语言成功')
      console.log(' ', this.language)
    }
  },
  getters: {
    getLanguage(): string {
      return this.language
    }
  }
})
