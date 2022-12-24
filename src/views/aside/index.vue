<template>
  <el-menu
    background-color='none'
    text-color='#fff'
    @open="handleOpen"
    @close="handleClose"
    :router='true'
  >
    <el-menu-item index="/dashboard">
      <el-icon>
        <icon-menu />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="/user">用户列表</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <document />
        </el-icon>
        <span>权限管理</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="/user">权限列表</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
