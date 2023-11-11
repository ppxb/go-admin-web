<script lang="ts" setup>
import Sidebar from './sidebar/index.vue'
import Content from './content/index.vue'
import Logo from './logo/index.vue'
import AppHeader from './header/index.vue'
</script>

<template>
  <a-layout class="flex h-screen overflow-hidden">
    <a-layout-sider theme="light" width="300" :trigger="null">
      <logo />
      <sidebar />
    </a-layout-sider>
    <a-layout>
      <app-header />
      <content />
    </a-layout>
  </a-layout>
</template>
