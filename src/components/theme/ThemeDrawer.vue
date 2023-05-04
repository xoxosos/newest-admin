<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-05-04 11:37:12
 * @Description: 
-->
<template>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="系统设置"
    placement="right"
    @after-visible-change="afterVisibleChange"
  >
    <ThemeSetting />
  </a-drawer>
</template>
<script lang="ts" setup>
import ThemeSetting from './ThemeSetting.vue'
const visible = ref<boolean>(false)
const afterVisibleChange = (bool: boolean) => {
  console.log('visible', bool)
}
const showDrawer = () => {
  visible.value = true
}
defineExpose({
  showDrawer
})
</script>
