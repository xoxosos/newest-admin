// hook/useLocale.ts
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'

export default function useLocale() {
  const { t, locale } = useI18n() //实例化i18n

  const currentLocale = computed(() => {
    return locale.value // 固定写法 获取当前语言设置
  })
  // 切换语言
  const changeLocale = (value: string) => {
    locale.value = value //赋值切换语言
    localStorage.setItem('locale', value) //修改本地存储
    message.success(t('navbar.action.locale')) //提示信息
  }
  return {
    t,
    currentLocale,
    changeLocale
  }
}
