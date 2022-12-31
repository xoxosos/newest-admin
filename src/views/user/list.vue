<template>
  <main-header></main-header>
  <!--    内容-->
  <div class="main-content">
    <div class="main-content-header">
      <main-search @initData="init"></main-search>
    </div>
    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column fixed label="id" prop="id" />
        <el-table-column label="name" prop="name" />
        <el-table-column label="birthday" prop="birthday" />
        <el-table-column label="age" prop="age" />
        <el-table-column label="gender" prop="gender">
          <template #default="{ row, column }">
            {{ row.gender === 1 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column label="status" prop="status">
          <template #default="{ row }">
            <el-switch v-model="row.status" disabled />
          </template>
        </el-table-column>
        <el-table-column label="mobile" prop="mobile" />
        <el-table-column label="email" prop="email" width="250" />
        <el-table-column fixed="right" label="Operations">
          <template #default>
            <el-button link size="small" type="primary" @click="handleClick">Detail</el-button>
            <el-button link size="small" type="primary">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from '@/components/MainHeader.vue'
import MainSearch from '@/components/MainSearch.vue'
import { api } from '@/utils/api'
import { onMounted, ref } from 'vue'

interface data {
  age: number
  birthday: string
  email: string
  gender: number
  id: number
  mobile: string
  name: string
}

const tableData = ref<data>()
const loading = ref<boolean>()
const init = async () => {
  console.log('initData')
  loading.value = true
  try {
    const [e, r] = await api.getUserInfo()
    tableData.value = e ?? r?.data
  } catch (e) {
  } finally {
    loading.value = false
  }
}
onMounted(() => init())
</script>

<style scoped></style>
