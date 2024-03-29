/*
 * @Author: shzou shihaozou@outlook.com
 * @Date: 2022-08-22 10:45:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-03 23:48:05
 * @FilePath: \uu-admin\src\store\interface\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RouteRecordRaw } from 'vue-router'
export interface MenuOptions {
  path: string
  title: string
  name: string
  meta: {
    title: string
  }
  icon?: string
  children?: MenuOptions[]
}

export interface MenuState {
  menuList: MenuOptions[]
  matchList: RouteRecordRaw[]
}

/**
 * tabs
 */
export interface tabsOption {
  key: string
  title: string
}
