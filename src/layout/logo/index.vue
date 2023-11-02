<script lang="ts" setup>
const props = defineProps({
  collapsed: {
    type: Boolean
  }
})
</script>

<template>
  <div class="flex overflow-hidden whitespace-nowrap justify-center items-center h-64px">
    <img
      class="h-32px mr-2"
      src="https://buqiyuan.gitee.io/vue3-antdv-admin/assets/logo-3503d5cd.png"
      alt=""
    />
    <h2 v-show="!props.collapsed" class="text-xl">Turbo Admin</h2>
  </div>
</template>
