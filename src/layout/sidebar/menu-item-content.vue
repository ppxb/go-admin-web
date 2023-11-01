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
  <div>{{ props.item.meta?.title }}</div>
</template>
