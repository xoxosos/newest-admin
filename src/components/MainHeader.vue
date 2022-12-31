<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/user' }">用户列表</el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>