<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-05 23:00:42
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-05 23:47:06
 * @FilePath: \newest-admin\src\components\layout\HeaderView.vue
 * @Description: 
-->
<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" @select="handleSelect">
    <a-sub-menu key="sub1">
      <template #icon>
        <setting-outlined />
      </template>
      <template #title>Navigation Three - Submenu</template>
      <a-menu-item-group title="Item 1">
        <a-menu-item key="zhCN">简体中文</a-menu-item>
        <a-menu-item key="en">English</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>
  </a-menu>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '../../stores/useLanguage'
const languageStore = useLanguageStore()
const { language, changeLanguage } = languageStore
const i18n = useI18n()
const handleSelect = ({ key }) => {
  changeLanguage(key)
  i18n.locale.value = key
}
const current = ref<string[]>([])
</script>

<style scoped></style>
