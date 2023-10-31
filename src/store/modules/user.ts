import { defineStore } from 'pinia'
import { ref } from 'vue'

import { store } from '~/store'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const menus = ref([])
  const perms = ref([])

  return { userInfo, menus, perms }
})

export const useUserStoreHook = () => useUserStore(store)
