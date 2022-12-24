<!--
 * @Author: LinRenJie
 * @Date: 2022-12-22 18:42:33
 * @LastEditTime: 2022-12-24 14:38:49
 * @Description: 
 * @FilePath: /admin/src/views/HomeView.vue
 * @Email: xoxosos666@gmail.com
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header flex-float">
        <div class="flex">
          <img class="common-header-logo" src="../assets/logo.svg" alt="" />
          <h1 class="common-header-title">通用管理系统</h1>
        </div>
        <div>
          <el-button type="primary" @click='loginOut'>退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside class="common-aside">
          <Index></Index>
        </el-aside>
        <el-container>
          <el-main>
            <RouterView></RouterView>
          </el-main>
          <el-footer> </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Index from '@/views/aside/index.vue'
import router from '@/router'


interface Person {
  name: string
  age?: number
  address: string
  date: string
}
let tom: Person = {
  name: 'Tom',
  age: 25,
  address: 'No. 189, Grove St, Los Angeles',
  date: '2016-05-03'
}
const tableData = ref<any[]>([])
const loginOut = ():void=>{
  sessionStorage.clear()
  router.push('/login')
}
const a = (): void => {
  for (let i = 0; i < 100; i++) {
    tableData.value.push(tom)
  }
}

onMounted(() => {
  a()
})
</script>
<style lang="scss"></style>
