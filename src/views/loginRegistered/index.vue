<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-04-23 14:52:57
 * @Description: 
-->
<template>
  <div class="login-container login-box">
    <transition name="login-form">
      <component :is="component"></component>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import LoginView from './LoginView.vue'
import RegisterView from './RegisterView.vue'

const pageType = ref('login')
const component = computed(() => {
  return pageType.value === 'login' ? LoginView : RegisterView
})
const changeType = (type: string) => {
  console.log(type)
  pageType.value = type
}
provide('changeType', { changeType })
</script>

<style lang="less" scoped>
.login-form-forgot {
  float: right;
}

:deep(.item-form .ant-form-item-label) {
  line-height: 40.14px;
}

:deep(.ant-form-item-control-input-content) {
  display: flex;
  align-items: center;
}

.login-container {
  /* 使用渐变背景颜色 */
  background-image: linear-gradient(to bottom right, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form {
  background-image: linear-gradient(to bottom right, #6a81e8, #764ba2);
  width: 500px;
  // background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* 添加hover特效 */
  transition: all 0.3s ease-in-out;
}

.login-form:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  /* 将border颜色更改为蓝色 */
  // border: 1px solid #1890ff;
  transform: scale(1.05);
}

.login-form-enter-active {
  animation: login-form-enter 0.4s;
}

.login-form-leave-active {
  animation: login-form-leave 0.4s;
}

/* 过渡过程 */
@keyframes login-form-enter {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes login-form-leave {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
