<template>
  <div class="new-body new-body-card">
    <a-card>
      <a-form ref="formRef" :label-Col="{ style: { width: '80px' } }" :model="formState">
        <a-row :gutter="24">
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="姓名">
              <a-input :value(v-model)="formState.name"> </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="性别">
              <a-input :value(v-model)="formState.gender"> </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="手机号">
              <a-input :value(v-model)="formState.mobile"> </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24" style="text-align: right">
            <a style="font-size: 12px" @click="expand = !expand">
              <template v-if="expand">
                <UpOutlined />
              </template>
              <template v-else>
                <DownOutlined />
              </template>
              {{ !expand ? '展开' : '收起' }}
            </a>
            <a-button ghost style="margin: 0 8px" type="primary" @click="clean">
              <ReloadOutlined />
              重置
            </a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item v-if="expand" label="年龄">
              <a-input :value(v-model)="formState.birthday"> </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <!--    内容-->
    <a-card>
      <div class=" ">
        <div class="new-table-tool">
          <div class="new-table-tool-title">
            <a-button ghost type="primary">新增用户</a-button>
          </div>
          <div>
            <a-space align="center">
              边框
              <a-switch v-model:checked="isBordered" @click="handleSwitch('isBordered')" />
              <a-divider type="vertical"></a-divider>
              斑马线
              <a-switch v-model:checked="isZebra" @click="handleSwitch('isZebra')" />
              <a-divider type="vertical"></a-divider>
              高度铺满
              <a-switch v-model:checked="isBoundless" @click="handleSwitch('isBoundless')" />
            </a-space>
          </div>
        </div>
        <a-table
          :bordered="bordered"
          :class="classObj"
          :columns="columns"
          :data-source="list"
          :loading="loading"
          :row-class-name="
  zebra ? (_record: {}, index:number) => (index % 2 === 1 ? 'table-striped' : null) : null
          "
          :scroll="scroll"
          class="table-list ant-table-striped"
          row-key="id"
        >
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import useList from '@/hooks/useList'
import useTableSwitch from '@/hooks/useTable/useHeader'
import { api } from '@/utils/api'
import columns from '@/views/user/table'
import { DownOutlined, ReloadOutlined, UpOutlined } from '@ant-design/icons-vue'
import { onMounted, reactive } from 'vue'

const {
  handleSwitch,
  scroll,
  isBoundless,
  isZebra,
  isBordered,
  zebra,
  bordered,
  expand,
  classObj
} = useTableSwitch()

interface data {
  age: number
  birthday: string
  email: string
  gender: number
  id: number
  mobile: string
  name: string
}

// const tableData = ref<data>()
const formState = reactive<data>({
  age: 0,
  birthday: '',
  email: '',
  gender: 0,
  id: 0,
  mobile: '',
  name: ''
})
const init = async () => {
  console.log('initData')
  loading.value = true
  try {
    const [e, r] = await api.getUserInfo()
    list.value = e ?? r?.data
  } finally {
    loading.value = false
  }
}

const { list, loading, reset, curPage, pageSize, reload, total, loadData } = useList(
  init,
  formState
)
onMounted(() => init())
</script>

<style scoped></style>
