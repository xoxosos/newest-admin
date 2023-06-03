<!--
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-05-30 22:01:53
 * @Description: 
-->
<template>
  <template v-for="menuItem in menuItems">
    <template v-if="menuItem.children">
      <a-sub-menu :key="menuItem.name">
        <template #title>
          <span>{{ menuItem.meta?.title }}</span>
        </template>
        <recursive-menu :menuItems="menuItem.children" />
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="menuItem.name">
        <router-link :to="menuItem.path">{{ menuItem.meta?.title }}</router-link>
      </a-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
defineProps(['menuItems'])
</script>

<style scoped></style>
