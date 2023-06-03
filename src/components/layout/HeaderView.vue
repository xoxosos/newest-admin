<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-05 23:00:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-04 00:54:44
 * @FilePath: \newest-admin\src\components\layout\HeaderView.vue
 * @Description: 
-->
<template>
  <!-- 全屏 -->
  <div class="new-admin-header-tool-item">
    <a-tooltip placement="bottom">
      <template #title>
        {{ isFullscreen ? '退出全屏' : '开启全屏' }}
      </template>
      <span @click="toggle">
        <fullscreen-outlined v-show="!isFullscreen" />
        <fullscreen-exit-outlined v-show="isFullscreen" />
      </span>
    </a-tooltip>
  </div>
  <language />

  <div class="new-admin-header-tool-item">
    <a-dropdown>
      <div class="new-admin-header-avatar">
        <a-avatar :src="avatar" />
        <span style="padding: 0 4px 0 8px">{{ username }} </span>
        <DownOutlined />
      </div>
      <template #overlay>
        <a-menu @click="onClick">
          <a-menu-item key="1">1st menu item</a-menu-item>
          <a-menu-item key="2">2nd menu item</a-menu-item>
          <a-menu-item key="logout">
            <span>
              退出登录
              <logout-outlined /> </span
          ></a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  DownOutlined,
  ExclamationCircleOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'
import type { MenuProps } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'
import language from './language.vue'
const { isFullscreen, toggle } = useFullscreen()
const { username, avatar } = useAuthStore().$state.user
const onClick: MenuProps['onClick'] = ({ key }) => {
  key === 'logout' &&
    Modal.confirm({
      title: '是否注销用户',
      content: '注销后将返回登录页面',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        useAuthStore().logout()
        router.replace('/login')
      },
      onCancel: () => {}
    })
}
</script>

<style scoped lang="less"></style>
