import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      resolvers: [ AntDesignVueResolver()]
    }),
    Components({
      resolvers: [ AntDesignVueResolver({ importStyle: 'less' })]
    })
  ],
  // 开启less支持
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#722ed1',
          'link-color': '#712fd1',
          'border-radius-base': '2px',
          'heading-color': 'rgba(0, 0, 0, 0.85)',
          'disabled-color': 'rgba(0, 0, 0, 0.25)'
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      // 文件路径别名
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    host: '0.0.0.0',
    // port: 56438, // 服务器端口号
    open: true, // 是否自动打开浏览器
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:4523/m1/2120640-0-2c46b26a', // '/api' 代理的接口路径
        target: 'https://mock.apifox.cn/m1/2120640-0-2c46b26a', // '/api' 代理的接口路径
        changeOrigin: true, // 跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
export default viteConfig
