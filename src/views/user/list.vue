<template>
  <div class="new-body new-body-card">
    <a-card>
      <a-form ref="formRef" :label-Col="{ style: { width: '80px' } }" :model="formState">
        <a-row :gutter="24">
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="姓名">
              <a-input v-model:value="formState.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item :label="$t('huanying')">
              <a-input :v-model:value="formState.gender"></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="手机号">
              <a-input v-model:value="formState.mobile"></a-input>
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
              <a-input v-model:value="formState.birthday"></a-input>
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
          @change="handleTableChange"
        >
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script lang="tsx" setup>
import useList from '@/hooks/useList'
import useTableSwitch from '@/hooks/useTable/useHeader'
import { api } from '@/utils/api'
// import columns from '@/views/user/table'
import { DownOutlined, ReloadOutlined, UpOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'

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

interface DataProps {
  age: number
  birthday: string
  email: string
  gender: number
  id: number
  mobile: string
  name: string
}

const formState = ref<DataProps>({
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
    await loadData()
    // list.value = e ?? r?.data
  } finally {
    loading.value = false
  }
}

const listRequestFn = api.apifoxGetUserList
const { list, loading, reset, curPage, pageSize, total, loadData } = useList(
  listRequestFn,
  formState
)
const handleTableChange = (p, f, s) => {
  console.log('sorter', s)
}
const formRef = ref()
const clean = () => {
  formRef.value.resetFields()
}
const columns = computed(() => {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 120,
      fixed: 'left' as 'left'
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 120,
      fixed: 'left' as 'left',
      customRender({ text }: { text: string }) {
        return <a-avatar src={text} />
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
      fixed: 'left' as 'left',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 100
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 100,
      customRender({ text }: { text: string }) {
        return <span>{text === '1' ? '男' : '女'}</span>
      }
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      width: 120
    },
    {
      title: '电话号码',
      dataIndex: 'mobile',
      width: 120
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 150
    },

    {
      title: '操作',
      dataIndex: 'operation',
      customRender({ record }) {
        return (
          <div>
            <a>edit</a>
            <a-divider type="vertical"></a-divider>
            <a>delete</a>
          </div>
        )
      },
      width: 100
    }
  ]
})
onMounted(() => init())
</script>

<style scoped></style>
