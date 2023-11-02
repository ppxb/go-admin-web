<script lang="ts" setup>
import { computed, ref } from 'vue'

import Sidebar from './sidebar/index.vue'
import Content from './content/index.vue'
import Logo from './logo/index.vue'

const collapsed = ref(false)

const sidebarWidth = computed(() => (collapsed.value ? 80 : 256))
</script>

<template>
  <a-layout class="flex h-screen overflow-hidden">
    <a-layout-sider
      collapsible
      theme="light"
      v-model:collapsed="collapsed"
      :width="sidebarWidth"
      :trigger="null"
    >
      <logo :collapsed="collapsed" />
      <sidebar :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <content />
    </a-layout>
  </a-layout>
</template>
