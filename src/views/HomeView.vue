<!--
 * @Author: LinRenJie
 * @Date: 2022-12-22 18:42:33
 * @LastEditTime: 2023-02-11 20:01:00
 * @Description: 
 * @FilePath: /admin/src/views/HomeView.vue
 * @Email: xoxosos666@gmail.com
-->
<template>
  <a-layout
    class="new-admin-layout new-admin-fixed-header new-admin-fixed-sidebar new-admin-side-dark new-admin-show-tabs new-admin-responsive"
  >
    <a-layout-header
      :style="{ transition: 'all .3s cubic-bezier(.2, 0, 0, 1) 0s' }"
      class="new-admin-header"
    >
      <div
        :class="theme === 'dark' ? ['new-admin-logo-dark'] : ''"
        :style="{
          width: collapsed ? '80px' : '200px',
          transition: 'all .3s cubic-bezier(.2, 0, 0, 1) 0s'
        }"
        class="new-admin-logo"
      >
        <img alt="logo" src="../assets/logo.svg" />
        <span :style="{ color: '#333', display: collapsed ? 'none' : '' }">Newest Admin</span>
      </div>
      <div class="new-admin-header-tool">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </div>
      <div class="new-admin-header-tool">
        <a-switch
          :checked="theme === 'dark'"
          checked-children="Dark"
          un-checked-children="Light"
          @change="changeTheme"
        />
      </div>
      <div class="new-admin-header-tool">
        <a-breadcrumb
          :style="{
            transition: 'left .3s cubic-bezier(.2, 0, 0, 1) 0s'
          }"
        >
          <a-breadcrumb-item v-for="(item, index) of $route.matched" :key="index">
            <template v-if="index === 0">
              <home-outlined class="admin-header-home" @click="toHome" />
            </template>
            <router-link :to="item.path">{{ item.meta.title }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="new-admin-header-nav" style="flex: 1; overflow: hidden"></div>
      <div class="new-admin-header-tool">
        <div class="new-admin-header-tool-item">
          <a-dropdown>
            <div class="new-admin-header-avatar">
              <a-avatar src="https://api.isoyu.com/ARU_GIF_S.php" />
              <span style="padding: 0 4px 0 8px"> 赵日天 </span>
              <DownOutlined />
            </div>
            <template #overlay>
              <a-menu @click="onClick">
                <a-menu-item key="1">1st menu item</a-menu-item>
                <a-menu-item key="2">2nd menu item</a-menu-item>
                <a-menu-item key="3">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <a-layout class="new-admin-main">
      <a-layout-sider
        v-model:collapsed="collapsed"
        :style="{
          transition: 'all .3s cubic-bezier(.2, 0, 0, 1) 0s'
        }"
        class="new-admin-sidebar"
        style="background: #fff"
      >
        <a-menu
          v-model:selectedKeys="selectedKeys"
          :open-keys="state.openKeys"
          :style="{ height: '100%', borderRight: 0 }"
          :theme="theme"
          mode="inline"
        >
          <template v-for="routes in routesMap">
            <a-sub-menu v-if="'children' in routes" :key="routes.name">
              <template #icon>
                <AppstoreOutlined />
              </template>
              <template #title>{{ routes.meta?.title }}</template>
              <template v-for="route in routes.children">
                <a-sub-menu v-if="'children' in route" :key="route.name">
                  <template #title>{{ route.meta?.title }}</template>
                  <template v-for="grandRoute in route.children">
                    <a-sub-menu v-if="'children' in grandRoute" :key="grandRoute.name">
                      <template #title>{{ grandRoute.meta?.title }}</template>
                    </a-sub-menu>
                    <a-menu-item v-else :key="grandRoute?.name">
                      <router-link :to="grandRoute.path">{{ grandRoute.meta?.title }}</router-link>
                    </a-menu-item>
                  </template>
                </a-sub-menu>
                <a-menu-item v-else :key="route?.name">
                  <router-link :to="route.path">{{ route.meta?.title }}</router-link>
                </a-menu-item>
              </template>
            </a-sub-menu>
            <a-menu-item v-else :key="routes?.name">
              <template #icon>
                <SettingOutlined />
              </template>
              <router-link :to="routes.path">{{ routes.meta?.title }}</router-link>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout
        :style="{
          padding: '40px 0 0 0',
          paddingLeft: collapsed ? '80px' : '200px',
          margin: 0,
          transition: 'all .3s cubic-bezier(.2, 0, 0, 1) 0s'
        }"
        class="new-admin-body"
      >
        <a-tabs
          v-model:activeKey="activeKey"
          :style="{
            left: collapsed ? '80px' : '200px',
            transition: 'left .3s cubic-bezier(.2, 0, 0, 1) 0s'
          }"
          class="new-admin-tabs"
          hide-add
          type="editable-card"
          @edit="onEdit"
          @tabClick="push"
        >
          <a-tab-pane
            v-for="pane in panes"
            :key="pane.key"
            :closable="pane.closable"
            :tab="pane.title"
          >
          </a-tab-pane>
          <template #leftExtra>
            <a-button type="text">
              <left-outlined />
            </a-button>
          </template>
          <template #rightExtra>
            <a-button type="text">
              <right-outlined />
            </a-button>
          </template>
        </a-tabs>
        <a-layout-content
          :style="{
            margin: 0,
            minHeight: '280px',
            transition: 'paddingLeft .3s cubic-bezier(.2, 0, 0, 1) 0s'
          }"
          class="new-admin-content"
        >
          <div
            :style="{
              transition: 'all .3s cubic-bezier(.2, 0, 0, 1) 0s'
            }"
            class="new-admin-content-view"
          >
            <router-view v-slot="{ Component }">
              <transition name="scale-slide">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import router from '@/router'
import {
  AppstoreOutlined,
  DownOutlined,
  HomeOutlined,
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { uniqBy } from 'lodash-es'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const toHome = () => {
  console.log('toHome')
}
const activeKey = ref()
const routes = useRouter()
const routesMap = computed(() => routes.options.routes[0]).value.children
console.log(routesMap)
const push = (v: any) => {
  router.push(v)
}
const panes = ref([
  {
    title: '工作台',
    key: '/dashboard/workplace',
    closable: false,
    path: '/dashboard/workplace'
  }
])
const add = (title: any, path: string) => {
  activeKey.value = path
  panes.value.push({
    title,
    key: activeKey.value,
    closable: true,
    path
  })
  console.log('1:', panes.value)
  panes.value = uniqBy(panes.value, 'key')
  console.log('2:', panes.value)
}

interface stateProps {
  openKeys: any
}

const state = reactive<stateProps>({
  openKeys: ['index']
})
//  默认选中当前路由的名字
const selectedKeys = computed(() => [router.currentRoute.value.name])
// 所有sub-menu key
const rootSubmenuKeys = computed(() => routesMap?.map((route) => route.name))
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  if (rootSubmenuKeys.value?.indexOf(latestOpenKey!) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
watch(
  () => routes.currentRoute,
  () => {
    console.log(routes.currentRoute.value)
    add(routes.currentRoute?.value?.meta.title, routes.currentRoute?.value?.path)
  },
  { deep: true }
)
const remove = (targetKey: string) => {
  let lastIndex = 0
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1
    }
  })
  panes.value = panes.value.filter((pane) => pane.key !== targetKey)
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].key
    } else {
      activeKey.value = panes.value[0].key
    }
  }
  router.push(panes.value.at(-1)!.path)
}
const onEdit = (targetKey: any, action: any) => {
  remove(targetKey)
}
const changeTheme = (checked: boolean) => {
  theme.value = checked ? 'dark' : 'light'
}
const theme = ref('dark')
const collapsed = ref(false)
const onClick: MenuProps['onClick'] = ({ key }) => {
  key === '3' && loginOut()
}
const loginOut = (): void => {
  sessionStorage.clear()
  router.push('/login')
}
const height = ref()
window.onresize = () => {
  return (() => {
    document.documentElement.clientWidth //实时宽度
    height.value = document.documentElement.clientHeight //实时高度
    console.log(height)
  })()
}
watch(
  height.value,
  () => {
    console.log(height)
  },
  { immediate: true, deep: true }
)
</script>
<style lang="scss"></style>
