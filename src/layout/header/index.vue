<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

import { useUserStore } from '~/store/modules/user'
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean
  }
})
const emit = defineEmits(['update:collapsed'])

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const menus = computed(() => {
  if (route.meta.namePath) {
    let children = userStore.menus
    const paths = route.meta.namePath.map(item => {
      const a = children.find(n => n.name === item)
      children = a?.children || []
      return a
    })

    return [
      {
        name: '__index',
        meta: {
          title: '首页'
        },
        children: userStore.menus
      },
      ...paths
    ]
  }
  return route.matched
})

const getSelectedKeys = (index: number) => {
  return [menus.value[index + 1]?.name] as string[]
}

const getRouteByName = (name: string) => router.getRoutes().find(n => n.name === name)

const clickMenuItem = (item: RouteRecordRaw) => {
  const lastChild = findLastChild(item)
  const targetRoute = getRouteByName(lastChild.name)
  router.push({ name: lastChild.name })
}

const findLastChild = (route: RouteRecordRaw) => {
  if (typeof route?.redirect === 'object') {
    const redirectVal = Object.values(route.redirect)
    if (route.children?.length) {
      const target = route.children.find(n =>
        redirectVal.some(m => [n.name, n.path, n.meta?.fullPath].some(v => v === m))
      )
      return findLastChild(target)
    }
    return redirectVal.find(n => typeof n === 'string')
  } else if (typeof route?.redirect === 'string') {
    if (route.children?.length) {
      const target = route.children?.find(n =>
        [n.name, n.path, n.meta?.fullPath].some(m => m === route.redirect)
      )
      return findLastChild(target)
    }
    return route.redirect
  }
  return route
}
</script>

<template>
  <a-page-header class="flex sticky z-10 top-0 items-center justify-between h-60px px-20px">
    <a-space :size="20">
      <slot>
        <a-space :size="20">
          <span @click="() => emit('update:collapsed', !props.collapsed)">
            <component :is="props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </span>
          <a-breadcrumb>
            <template v-for="(item, index) in menus" :key="item.name">
              <a-breadcrumb-item>
                {{ item?.meta?.title }}
                <template v-if="item?.children?.length" #overlay>
                  <a-menu :selected-keys="getSelectedKeys(index)">
                    <template v-for="child in item.children" :key="child.name">
                      <a-menu-item
                        v-if="!child.meta?.hideInMenu && !child.meta?.hideInBreadcrumb"
                        :key="child.name"
                        @click="clickMenuItem(child)"
                      >
                        <div>{{ child.meta?.title }}</div>
                      </a-menu-item>
                    </template>
                  </a-menu>
                </template>
              </a-breadcrumb-item>
            </template>
          </a-breadcrumb>
        </a-space>
      </slot>
    </a-space>
  </a-page-header>
</template>