/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-20 17:41:06
 * @Description:主文件
 */
import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/antd.less'
import 'ant-design-vue/dist/antd.variable.less'
import 'normalize.css'
import 'nprogress/nprogress.css'
import i18n from '@/locales/lang/index'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/iconfont/iconfont.js'
import './assets/styles/common/var.css'
import './assets/styles/index.less'
import SvgIcon from './components/iconfont/SvgIcon.vue'
import router from './router'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)

const pinia = createPinia()

pinia.use(
  createPersistedState({
    // 全局 key 配置接受传入 Store key 的函数，并返回一个新的 storage 密钥。
    key: (id) => `__persist__${id}`,
    //  该配置将会使所有 Store 持久化存储，且必须配置 persist: false 显式禁用持久化。
    auto: true
  })
)
app.use(i18n).use(pinia).use(router).mount('#app')
