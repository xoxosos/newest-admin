<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-05-09 19:01:32
 * @Description: 
-->
<template>
  <div class="new-admin-header-tool-item">
    <a-dropdown>
      <a>
        <SvgIcon height="14px" iconName="icon-language" />
      </a>
      <template #overlay>
        <a-menu :selected-keys="[currentLanguage]">
          <a-menu-item
            v-for="(lang, index) in languages"
            :selected="lang.key === currentLanguage"
            :key="lang.key"
          >
            <a @click="handleChange(lang.key)">
              {{ lang.label }}
            </a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useLanguageStore } from '@/stores/useLanguage'
import { reactive, ref } from 'vue'
import SvgIcon from '../iconfont/SvgIcon.vue'
const { changeLanguage, getLanguage } = useLanguageStore()
// 当前选中的语言
const currentLanguage = ref<string>(getLanguage)
const languages = reactive([
  { key: 'en', label: 'English' },
  { key: 'zhCN', label: '中文' },
  { key: 'ja', label: '日本語' }
])
const handleChange = (value: string) => {
  console.log('选中的语言为：', value)
  currentLanguage.value = value
  changeLanguage(value)
}
</script>

<style scoped></style>
