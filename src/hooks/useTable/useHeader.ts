import { ref, watch } from 'vue'

export default function useTableSwitch() {
  const isZebra = ref(false)
  const isBordered = ref(false)
  const isBoundless = ref(false)
  const bordered = ref(false)
  const zebra = ref(false)
  const scroll = ref({ x: 1300, y: 'calc(100vh - 460px)' })
  const expand = ref(false)
  watch([expand, () => isBoundless.value], ([expand, isBoundless]) => {
    console.log([expand, isBoundless])
    if (isBoundless) {
      classObj.value[0].boundless = isBoundless
      return
    } else {
      classObj.value[0].boundless = isBoundless
    }
    scroll.value = expand
      ? { x: 1300, y: 'calc(100vh - 520px)' }
      : { x: 1300, y: 'calc(100vh - 460px)' }
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
      : { x: 1300, y: 'calc(100vh - 460px)' }
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
