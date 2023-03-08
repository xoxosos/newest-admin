<!--
 * @Author: LinRenJie
 * @Date: 2023-01-14 18:27:43
 * @LastEditTime: 2023-03-08 14:29:29
 * @Description: 
 * @FilePath: /admin/src/views/dashboard/WorkView.vue
 * @Email: xoxosos666@gmail.com
-->
<template>
  <div class="new-body new-body-card">
    <a-card
      :bodyStyle="{
        padding: '20px'
      }"
      :bordered="false"
      style="width: 100%"
    >
      <div style="display: flex; align-items: center; justify-content: space-between">
        <div style="display: flex">
          <a-avatar
            src="https://api.ixiaowai.cn/mcapi/mcapi2.php"
            style="
              width: 68px;
              height: 68px;
              object-fit: cover;
              line-height: 60px;
              font-size: 18px;
              border: 1px solid #712fd1;
            "
          />
          <div style="flex: 1; box-sizing: border-box; padding-left: 12px">
            <h4 style="font-size: 20px; font-weight: 450">
              {{ `${tips}管理员, 开始您一天的工作吧!` }}
            </h4>
            <div style="color: rgba(0, 0, 0, 0.45)">
              <span> <cloud-outlined /> </span
              ><em style="padding: 0 0.5em; font-style: normal"
                >今日多云转阴，18℃ - 22℃，出门记得穿外套哦~</em
              >
            </div>
          </div>
        </div>
        <div style="white-space: nowrap; text-align: right; flex-shrink: 0; display: flex">
          <div>
            <p>Card content</p>
          </div>
          <div>
            <p>Card content</p>
          </div>
          <div>
            <p>Card content</p>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { CloudOutlined } from '@ant-design/icons-vue'
import day from 'dayjs'
import { ref } from 'vue'
const hour = day().hour()
const tips = ref()
if (hour < 6) {
  tips.value = '凌晨好!'
} else if (hour < 9) {
  tips.value = '早上好!'
} else if (hour < 12) {
  tips.value = '上午好!'
} else if (hour < 14) {
  tips.value = '中午好！'
} else if (hour < 17) {
  tips.value = '下午好！'
} else if (hour < 19) {
  tips.value = '傍晚好！'
} else if (hour < 22) {
  tips.value = '晚上好！'
} else {
  tips.value = '夜里好！'
}
</script>

<style scoped></style>
