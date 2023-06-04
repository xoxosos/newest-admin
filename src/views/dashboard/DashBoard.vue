<!--
 * @Author: LinRenJie
 * @Date: 2022-12-22 18:42:33
 * @LastEditTime: 2023-06-04 16:58:21
 * @Description: 
 * @FilePath: /admin/src/views/DashBoard.vue
 * @Email: xoxosos666@gmail.com
-->
<template>
  <div class="new-body new-body-card">
    <a-row :gutter="24">
      <a-col :lg="6" :md="12" :sm="24" :xs="24">
        <a-card :bordered="false" title="Card title">
          <a-statistic
            :precision="2"
            :value="11.28"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
            suffix="%"
            title="Feedback"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :lg="6" :md="12" :sm="24" :xs="24">
        <a-card :bordered="false" title="Card title">
          <a-statistic
            :precision="2"
            :value="11.28"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
            suffix="%"
            title="Feedback"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :lg="6" :md="12" :sm="24" :xs="24">
        <a-card :bordered="false" title="Card title">
          <a-statistic
            :precision="2"
            :value="9.3"
            :value-style="{ color: '#cf1322' }"
            class="demo-class"
            suffix="%"
            title="Idle"
          >
            <template #prefix>
              <arrow-down-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :lg="6" :md="12" :sm="24" :xs="24">
        <a-card :bordered="false" title="Card title">
          <a-statistic-countdown
            :value="deadline"
            format="HH:mm:ss:SSS"
            style="margin-right: 50px"
            title="Million Seconds"
          />
        </a-card>
      </a-col>
    </a-row>
    <a-card
      :active-tab-key="key"
      :tab-list="tabList"
      style="width: 100%"
      title="Card title"
      @tabChange="(key) => onTabChange(key, 'key')"
    >
      <template #customTab="item">
        <span v-if="item.key === 'tab1'">
          <home-outlined />
          {{ item.key }}
        </span>
      </template>
      <template #extra>
        <a href="#">More</a>
      </template>
      <template v-if="key === 'tab1'">
        <v-chart
          :option="option"
          autoresize
          class="chart"
          style="height: 320px; position: relative"
        />
      </template>
      <template v-if="key === 'tab2'">
        <v-chart
          :option="barOption"
          autoresize
          class="chart"
          style="height: 320px; position: relative"
        />
      </template>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { HomeOutlined } from '@ant-design/icons-vue'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ref } from 'vue'
import VChart from 'vue-echarts'
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30
const tabList = [
  {
    key: 'tab1',
    tab: 'tab1'
  },
  {
    key: 'tab2',
    tab: 'tab2'
  }
]
const key = ref('tab1')
const noTitleKey = ref('app')

const onTabChange = (value: string, type: string) => {
  console.log(value, type)
  if (type === 'key') {
    key.value = value
  } else if (type === 'noTitleKey') {
    noTitleKey.value = value
  }
}

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
])

// pie
const option = ref({
  title: {
    text: 'Traffic Sources',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
const data: number[] = []
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200))
}

const barOption = ref({
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 2 // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
})

function run() {
  for (let i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000)
    } else {
      data[i] += Math.round(Math.random() * 200)
    }
  }
}

setTimeout(function () {
  run()
}, 0)
setInterval(function () {
  run()
}, 3000)
</script>
<style></style>
