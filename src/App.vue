<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-20 17:41:06
 * @Description: 程序入口
-->
<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { RouterView } from 'vue-router'
</script>

<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>
