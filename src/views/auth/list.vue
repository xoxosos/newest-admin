<template>
  <a-button ghost type="primary" @click="handleSubmit">submit</a-button>
  <a-form ref="tableFormRef" :model="tableData[0]">
    <a-table
      :columns="columns"
      :data-source="tableData"
      :rowKey="(record: tableProps) => record.id"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'firstContactListName'">
          <a-form-item
            :rules="[
              {
                message: '联系人name必填',
                trigger: 'blur',
                required: true,
                pattern: /^(?:[\u4e00-\u9fa5·]{2,5})$/
              }
            ]"
            label="111"
            :name="['first', 'name']"
          >
            <a-input
              v-model:value="tableData[0].first.name"
              :disabled="record.status === '1' ? true : false"
              @change="log"
            />
          </a-form-item>
        </template>
      </template>
    </a-table>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface tableProps {
  id: ''
  status: ''
  statusName: ''
  createTime: ''
  first: {
    name: ''
  }
}
const tableData = ref([
  {
    id: '',
    status: '',
    statusName: '',
    createTime: '',
    first: {
      name: ''
    }
  }
])
const log = (v: any) => {
  console.log(v)
  console.log(tableData.value[0].first.name)
}
const columns = ref([
  {
    title: 'first Contact Name',
    detaIndex: 'firstContactList',
    key: 'firstContactListName',
    wdith: 200
  },
  {
    title: 'first Contact Email',
    detaIndex: 'firstContactList',
    key: 'firstContactListEmail',
    width: 200
  },
  {
    title: 'Status',
    detaIndex: 'status',
    key: 'status'
  }
])
// 需求只校验邮箱是否包含@和. ,有其他要求这里可以写正则；
const regEmail = (val: string | string[]) => {
  return val.includes('@') && val.includes('.')
}
// 失去焦点校验邮箱 操作DOM去更改边框；
const blurCheckEmail = (event: any, val: string, id: string) => {
  const ID = document.getElementById(id)
  if (val === '') {
    ID!.style.border = '1px solid rgba(0,0,0,0.15)'
    return
  }
  if (!regEmail(val)) {
    ID!.style.border = '1px solid rgb(212,0,0)'
    // message!.error('邮箱格式有误请检查');
    console.log('邮箱格式有误请检查')
    return
  }
  ID!.style.border = '1px solid rgba(0,0,0,0.15)'
}
// 自定义邮箱校验规则
const validateEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return Promise.reject(new Error('请输入邮箱'))
  }
  if (!regEmail(value)) {
    return Promise.reject(new Error('邮箱格式有误请检查'))
  }
  return Promise.resolve()
}
const tableFormRef = ref()
// 提交
const handleSubmit = () => {
  tableFormRef.value
    .validateFields()
    .then((res: any) => {
      console.log(res)
      // 接口请求
    })
    .catch((err: any) => {
      console.log(err)
    })
}
</script>

<style scoped></style>
