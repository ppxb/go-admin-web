<script lang="ts" setup>
import { computed, ref } from 'vue'

import Sidebar from './sidebar/index.vue'
import Content from './content/index.vue'

const collapsed = ref(false)

const sidebarWidth = computed(() => (collapsed.value ? 80 : 220))
</script>

<template>
  <a-layout class="flex h-screen overflow-hidden">
    <a-layout-sider collapsible v-model:collapsed="collapsed" :width="sidebarWidth" :trigger="null">
      <sidebar :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <content />
    </a-layout>
  </a-layout>
</template>
