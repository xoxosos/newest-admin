<script lang="ts" setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

onMounted(() => {
  useAuthStore().loadFromLocalStorage()
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<style lang="scss" scoped></style>
