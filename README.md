
<div align='center' >
 <img alt="Logo" width="120" height="120" src="./src/assets/logo.svg">
  <h1> Newest Admin Vite</h1>
</div>

<p align="center">
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/vue-v3.2.47-brightgreen.svg" alt="vue">
  </a>
  <a href="https://vuetifyjs.com/">
    <img src="https://img.shields.io/badge/Ant%20Design%20Vue-3.2.16-blue.svg" alt="antd">
  </a>
    <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/vite-v4.2.1-blueviolet.svg" alt="antd">
  </a>
  <a href="https://github.com/yangjiakai/lux-admin-vuetify3/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

<!-- <h4 align='center'>
<a href="">在线 Demo</a>
</h4> -->

<br>

<p align='center'>
 <b>简体中文</b>
</p>

## ⚡ 简介

> 目标搭建一个免费开源的后台管理系统模版,基于 Vue3、TypeScript、Antd-vue3、Pinia 和 Vite 等主流技术,并集成多个Demo.

在 Antd 精美的主题基础上，我们构建了一个清晰且高效的项目逻辑架构，整合了最新的技术框架。本项目旨在实现各种常见的技术需求和功能，同时融合了
AI 助手，以提供更智能化的体验。

## 特性

- 📖 [Vue 3.2](https://github.com/vuejs/core)
- 📖 [Vite 4.x](https://github.com/vitejs/vite)
- 📖 UI Framework [AntdVue3](https://antdv.com/docs/vue/introduce)
- 📖 TypeScript
- 🚀 **CSS 变量**：主要控制项目的布局和颜色
- 🚀 **ESlint**：代码校验
- 🚀 **Prettier**：代码格式化
- 🚀 **Axios**：发送网络请求（已封装好）
- 📦 组件自动导入
- 🍍 通过 [Pinia](https://pinia.vuejs.org/)进行状态管理,集成持久化插件
- 📔 使用新的 `<script setup>` 语法
- 📈 Echarts
- 🌍 vue-i18n 多语言支持
- 📚 virtual-scroller , vuedraggable , perfect-scrollbar
- 📝 富文本编辑器

## 联络我

- 邮箱 <a href="mailto:xoxosos666@gmail.com">xoxosos666@gmail.com</a>

## 预览
- 预览地址 <a href="https://xoxosos.github.io/#/login" target="_blank">newest-admin</a>

### UI 框架

- [antd-vue](https://antdv.com/docs/vue/introduce) : ant-design-vue 是 Ant Design 的 Vue 实现，组件的风格与 Ant Design 保持同步，组件的 html 结构和 css 样式也保持一致，真正做到了样式 0 修改，组件 API 也尽量保持了一致。Ant Design Vue 致力于提供给程序员愉悦的开发体验。


## 🚀 目标功能

- **用户管理**：登录、登出
- **权限管理**：动态路由、指令权限、权限函数、路由守卫
- **多环境**：开发环境（development）、预发布环境（staging）、正式环境（production）
- **多主题**：多种主题
- **错误页面**: 403、404
- **Dashboard**：根据不同用户显示不同的 Dashboard 页面
- **其他内置功能**：SVG、动态侧边栏、动态面包屑、标签页快捷导航、Screenfull 全屏、自适应收缩侧边栏

### UI 相关
- [x] 明暗主题切换 -- 完成
- [x] 主题色切换 -- 完成
- [x] 中日英三语言切换-- 完成
- [ ] 瀑布流布局 -- 施工中
- [ ] 大数据虚拟列表 -- 施工中
- [ ] 骨架屏 -- 施工中

### 认证相关

- [x] 登录 -- 完成
- [x] 注册 -- 完成
- [ ] 验证邮件 -- 施工中
- [ ] 密码重置 -- 施工中

### 公共页面

- [x] 404 -- 完成
- [ ] 500 -- 施工中
- [ ] 系统维护 -- 施工中
- [ ] 常见问题 -- 施工中


### 功能页面

- [x] 任务列表() -- 完成
- [x] 任务版(拖拽功能) -- 施工中

### 插件

- [Vue Router4](https://router.vuejs.org/)
- [VueUse](https://github.com/antfu/vueuse) - 非常有用的组合式 API 合集
- [VuedDaggable](https://github.com/SortableJS/Vue.Draggable) - 允许进行与数组模型同步的拖拽放置操作
- [Vue-Masonry-Wall](https://github.com/DerYeger/yeger/tree/main/packages/vue-masonry-wall) - 是一种 Vue3 响应式,支持
  SSR,且零依的的瀑布流布局方案
- [Vue-Virtual-Scroller](https://github.com/Akryum/vue-virtual-scroller) - 大数据快速虚拟滚动插件


## 现在可以试试!
```shell
# 项目克隆 (推荐ssh)
git clone git@github.com:xoxosos/newest-admin.git
```

```shell
# 安装 pnpm
npm install pnpm -g
````

```shell
# 安装依赖
pnpm install
```

```shell
# 项目运行
pnpm dev
```

```shell
# 项目打包
pnpm build:prod
```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md)
  规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

    - `feat` 增加新功能
    - `fix` 修复问题/BUG
    - `style` 代码风格相关无影响运行结果的
    - `perf` 优化/性能提升
    - `refactor` 重构
    - `revert` 撤销修改
    - `test` 测试相关
    - `docs` 文档/注释
    - `chore` 依赖更新/脚手架配置修改等
    - `workflow` 工作流改进
    - `ci` 持续集成
    - `types` 类型定义文件更改
    - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE



