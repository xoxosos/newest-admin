<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-20 17:41:06
 * @Description: 程序入口
-->
<script lang="ts" setup>
import en from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import ja from 'ant-design-vue/es/locale/ja_JP'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import { useLanguageStore } from './stores/useLanguage'

const i18n = useI18n()
const locale = ref()
const langs = {
  zhCN: zhCN,
  en: en,
  ja: ja
}
watch(
  () => useLanguageStore().getLanguage,
  (language) => {
    console.log('切换当前语言为：', language)
    locale.value = langs[language]
    i18n.locale.value = language
  },
  {
    immediate: true
  }
)
</script>

<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>
