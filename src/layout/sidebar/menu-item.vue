<script lang="ts" setup>
import { type PropType, computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import MenuItemContent from './menu-item-content.vue'

defineOptions({
  name: 'MenuItem'
})

const props = defineProps({
  menus: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => []
  }
})

const filterMenus = computed(() => {
  return [...props.menus]
    .filter(n => !n.meta?.hideInMenu)
    .sort((a, b) => (a?.meta?.order || 0) - (b?.meta?.order || 0))
})

const isShowSubMenu = (item: RouteRecordRaw) => {
  return (
    item?.meta?.type === 0 ||
    (!Object.is(item?.meta?.hideChildrenInMenu, true) && item?.children?.length)
  )
}
</script>

<template>
  <template v-for="item in filterMenus" :key="item.name || item.fullPath">
    <template v-if="isShowSubMenu(item)">
      <a-sub-menu :key="item.name" v-bind="$attrs">
        <template #title>
          <menu-item-content :item="item" />
        </template>
        <template v-if="item.children">
          <menu-item :menus="item.children" />
        </template>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="item.name">
        <menu-item-content :item="item" />
      </a-menu-item>
    </template>
  </template>
</template>
