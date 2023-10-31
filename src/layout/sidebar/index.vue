<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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

const getRouteByName = (name: string) => router.getRoutes().find(n => n.name === name)
</script>

<template>
  <div class="overflow-auto h-[calc(100vh-64px)]">
    <a-menu
      collapsible
      mode="inline"
      v-model:selected-keys="state.selectedKeys"
      :open-keys="state.openKeys"
      :collapsed="props.collapsed"
    ></a-menu>
  </div>
</template>
