<script lang="ts" setup>
import type { PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({})
  }
})
</script>

<template>
  <div class="flex items-center">
    <i class="h-5 w-5 mr-2" :class="item.meta?.icon" />
    {{ props.item.meta?.title }}
  </div>
</template>
