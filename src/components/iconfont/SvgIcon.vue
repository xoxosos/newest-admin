<!--
 * @Author: CodeForBetter xoxosos666@gmail.com
 * @Date: 2023-05-06 20:49:05
 * @LastEditors: CodeForBetter xoxosos666@gmail.com
 * @LastEditTime: 2023-05-07 18:43:06
 * @FilePath: \newest-admin\src\components\iconfont\SvgIcon.vue
 * @Description: 
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#919aa3'
  }
})
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`
})
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<style scoped>
.svg-icon {
  width: 17px;
  height: 17px;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
