/*
 * @Author: LinRenJie
 * @Date: 2022-12-22 18:42:33
 * @LastEditTime: 2022-12-24 12:48:43
 * @Description:
 * @FilePath: /admin/vite.config.ts
 * @Email: xoxosos666@gmail.com
 */
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports:['vue','pinia','vue-router'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
export default viteConfig
