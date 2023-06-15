<template>
  <a-button
    shape="circle"
    style="position: absolute; z-index: 999; top: 50%; right: 0"
    @click="
      () => {
        ThemeDrawerRef.showDrawer()
      }
    "
  >
    <template #icon>
      <SettingOutlined />
    </template>
  </a-button>
  <template>
    <ThemeDrawer ref="ThemeDrawerRef" />
  </template>

  <a-layout
    class="new-admin-layout new-admin-fixed-header new-admin-fixed-sidebar new-admin-side-dark new-admin-show-tabs new-admin-responsive"
  >
    <a-layout-header
      :style="{ transition: 'all .3s cubic-bezier(.2, 0, 0, 1) 0s', height: '48px' }"
      class="new-admin-header"
    >
      <div
        :class="theme === 'dark' ? ['new-admin-logo-dark'] : ''"
        :style="{
          width: collapsed ? '80px' : '200px',
          transition: changeTransition
            ? 'all .3s  ease-in-out'
            : 'all .3s cubic-bezier(.2, 0, 0, 1) 0s'
        }"
        class="new-admin-logo"
      >
        <img alt="logo" src="../assets/logo.svg" />
        <span :style="{ display: collapsed ? 'none' : '' }">Newest Admin</span>
      </div>
      <div class="collapsed">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="changeCollapsed" />
        <menu-fold-outlined v-else class="trigger" @click="changeCollapsed" />
      </div>
      <div class="media-collapsed">
        <menu-unfold-outlined @click="showSider" />
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
              <span style="margin-right: 5px">
                <router-link to="/dashboard">
                  <home-outlined class="admin-header-home" />
                </router-link>
              </span>
            </template>
            <span class="breadcrumb-text">{{ item.meta.title }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="new-admin-header-nav" style="flex: 1; overflow: hidden"></div>
      <div class="new-admin-header-tool">
        <HeaderView />
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
          :style="{ height: '100%', borderRight: 0, transition: 'all .3s  ease-in-out' }"
          :theme="theme"
          mode="inline"
          @openChange="onOpenChange"
        >
          <template v-for="menuItem in (menus as any)">
            <template v-if="menuItem.children">
              <a-sub-menu :key="menuItem.name">
                <template #icon>
                  <SvgIcon :icon-name="`icon-${menuItem.meta?.icon}`" class-name="svg-icon" />
                </template>
                <template #title>
                  <span>{{ menuItem.meta.title }}</span>
                </template>
                <recursive-menu :menuItems="menuItem.children" />
              </a-sub-menu>
            </template>
            <template v-else>
              <a-menu-item :key="menuItem.name">
                <template #icon>
                  <SvgIcon :icon-name="`icon-${menuItem.meta?.icon}`" class-name="svg-icon" />
                </template>
                <router-link :to="menuItem.path">{{ menuItem.meta.title }}</router-link>
              </a-menu-item>
            </template>
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
              <transition name="slide-fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    placement="left"
    style="color: red"
    title="系统设置"
  >
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :open-keys="state.openKeys"
      :style="{ height: '100%', borderRight: 0, transition: 'all .3s  ease-in-out' }"
      :theme="theme"
      mode="inline"
      @openChange="onOpenChange"
    >
      <template v-for="menuItem in (menus as any)">
        <template v-if="menuItem.children">
          <a-sub-menu :key="menuItem.name">
            <template #icon>
              <SvgIcon :icon-name="`icon-${menuItem.meta?.icon}`" class-name="svg-icon" />
            </template>
            <template #title>
              <span>{{ menuItem.meta.title }}</span>
            </template>
            <recursive-menu :menuItems="menuItem.children" />
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="menuItem.name">
            <template #icon>
              <SvgIcon :icon-name="`icon-${menuItem.meta?.icon}`" class-name="svg-icon" />
            </template>
            <router-link :to="menuItem.path">{{ menuItem.meta.title }}</router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-drawer>
</template>
<script lang="ts" setup>
import RecursiveMenu from '@/components/dynamicmenu/RecursiveMenu.vue'
import HeaderView from '@/components/layout/HeaderView.vue'
import ThemeDrawer from '@/components/theme/ThemeDrawer.vue'
import router from '@/router'
import { MenuOptions } from '@/stores/interface'
import { MenuStore } from '@/stores/modules/menu'
import {
  HomeOutlined,
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

import useTheme from '@/utils/theme/useTheme'
import { uniqBy } from 'lodash-es'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ThemeSetting from '@/components/theme/ThemeSetting.vue'

const { theme } = useTheme()
const route = useRoute()
const ThemeDrawerRef = ref(null)
const visible = ref(false)

const showSider = () => {
  visible.value = true
}
onMounted(() => {
  MenuStore().setMenuList()
})
// 侧边栏菜单
const menus = computed((): MenuOptions[] =>
  MenuStore().matchList.filter((path) => path['name'] !== 'login')
)
const activeKey = ref()
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
  panes.value = uniqBy(panes.value, 'key')
}

interface stateProps {
  openKeys: any
}

const state = reactive<stateProps>({
  openKeys: ['index']
})
//  默认选中当前路由的名字
const selectedKeys = computed(() => [route.name])

// 所有sub-dynamicmenu key
const rootSubmenuKeys = computed(() => menus.value?.map((route) => route.name))
console.log('rootSubmenuKeys', rootSubmenuKeys.value)
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  if (rootSubmenuKeys.value?.indexOf(latestOpenKey!) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
watch(
  () => route.fullPath,
  () => {
    state.openKeys = route.fullPath.split('/').slice(1, -1)
    add(route.meta?.title, route.path)
  },
  { deep: true, immediate: true }
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
const changeTransition = ref(false)
const changeTheme = (checked: boolean) => {
  changeTransition.value = true
  theme.value = checked ? 'dark' : 'light'
}
// const theme = ref('dark')
const collapsed = ref(false)
const changeCollapsed = () => {
  changeTransition.value = false
  collapsed.value = !collapsed.value
}
</script>
<style lang="less" scoped>
.new-admin-header-tool {
  .anticon svg {
    color: grey;
  }
}
</style>
