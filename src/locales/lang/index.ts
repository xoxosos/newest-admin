/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-05 22:14:00
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-05 23:51:17
 * @FilePath: \newest-admin\src\locales\lang\index.ts
 * @Description:
 */
// src\lang\index.ts
// import { useLanguageStore } from '@/stores/useLanguage'
import { createI18n } from 'vue-i18n'
import en from './en'
import zhCN from './zh-CN'
import ja from './ja'

const locale = JSON.parse(localStorage.getItem('__persist__lang'))?.language || 'zhCN'
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages: {
    en,
    zhCN,
    ja
  }
})
const tt = i18n.global.t
export default i18n
export {tt}
