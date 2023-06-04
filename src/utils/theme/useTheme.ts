/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-06-04 13:10:17
 * @Description:
 */
import { ref } from 'vue'
const theme = ref('light')
watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
})
export default function useTheme() {
  return {
    theme
  }
}
