<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/store/modules/user'
import MenuItem from './menu-item.vue'

const props = defineProps({
  collapsed: {
    type: Boolean
  }
})

const route = useRoute()
const router = useRouter()
const state = reactive({
  openKeys: [] as string[],
  selectedKeys: [route.name] as string[]
})
const userStore = useUserStore()

const menus = computed(() => userStore.menus)

const getRouteByName = (name: string) => router.getRoutes().find(n => n.name === name)
const getTargetMenuByActiveMenuName = (activeMenu: string) =>
  router.getRoutes().find(n => [n.name, n.path].includes(activeMenu))

const getOpenKeys = () => {
  const { meta } = route
  if (meta.activeMenu) {
    const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
    return targetMenu?.meta.namePath ?? [meta.activeMenu]
  }

  return meta.hideInMenu
    ? state.openKeys || []
    : route.meta.namePath ?? route.matched.slice(1).map(n => n.name)
}

watch(
  () => route.fullPath,
  () => {
    if (route.name === 'Login' || props.collapsed) return
    state.openKeys = getOpenKeys()
    const { meta } = route
    if (meta.activeMenu) {
      const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
      state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu] as string[]
    } else {
      state.selectedKeys = [route.meta?.activeMenu ?? route.name] as string[]
    }
  },
  {
    immediate: true
  }
)

const clickMenuItem = ({ key }) => {
  if (key === route.name) return
  const targetRoute = getRouteByName(key)
  router.push({ name: key })
}
</script>

<template>
  <div class="overflow-auto h-[calc(100vh-64px)]">
    <a-menu
      collapsible
      mode="inline"
      v-model:selected-keys="state.selectedKeys"
      :open-keys="state.openKeys"
      :collapsed="props.collapsed"
      @click="clickMenuItem"
    >
      <menu-item :menus="menus" />
    </a-menu>
  </div>
</template>
