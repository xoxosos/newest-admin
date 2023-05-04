<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-05-04 10:34:12
 * @Description: 
-->
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {
      color: '#18a058',
      setColor(color: string) {
        document.documentElement.style.setProperty('--ant-primary-color', color)
      }
    }
  },
  methods: {
    handleChange(color: string) {
      this.color = color
      this.setColor(this.color)
    }
  }
})
</script>

<template>
  <a-form>
    <a-form-item label="主题设置">
      <input type="color" v-model="color" @change="handleChange(color)" />
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped></style>
