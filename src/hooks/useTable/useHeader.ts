/*
 * @Author: LinRenJie
 * @Date: 2023-01-17 21:59:52
 * @LastEditTime: 2023-02-10 14:09:10
 * @Description:
 * @FilePath: /admin/src/hooks/useTable/useHeader.ts
 * @Email: xoxosos666@gmail.com
 */
import { ref, watch } from 'vue'

export default function useTableSwitch() {
  const isZebra = ref(false)
  const isBordered = ref(false)
  const isBoundless = ref(false)
  const bordered = ref(false)
  const zebra = ref(false)
  const scroll = ref({ x: 1300, y: 'calc(100vh - 430px)' })
  const expand = ref(false)
  watch([expand, () => isBoundless.value], ([expand, isBoundless]) => {
    console.log([expand, isBoundless])
    classObj.value[0].boundless = isBoundless
    scroll.value = expand
      ? { x: 1300, y: 'calc(100vh - 490px)' }
      : { x: 1300, y: 'calc(100vh - 430px)' }
  })
  const classObj = ref([
    {
      boundless: false,
      'max-height-table': false
    }
  ])

  const handleScroll = () => {
    scroll.value = isBoundless.value
      ? { x: 1300, y: '100%' }
      : { x: 1300, y: 'calc(100vh - 420px)' }
  }
  const handleSwitch = (whichSwitch: string) => {
    switch (whichSwitch) {
      case 'isBordered':
        bordered.value = isBordered.value ?? true
        break
      case 'isZebra':
        zebra.value = isZebra.value ?? true
        break
      case 'isBoundless':
        handleScroll()
        break
    }
  }
  return {
    handleSwitch,
    expand,
    classObj,
    scroll,
    isBoundless,
    isZebra,
    isBordered,
    zebra,
    bordered
  }
}
