import { defineStore } from 'pinia'
import { ref } from 'vue'

import { store } from '~/store'
import { menus as staticMenus } from '~/router/constant'
import { generateDynamicRoutes } from '~/router/generator'
import { RouteRecordRaw } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const menus = ref<RouteRecordRaw[]>([])
  const perms = ref([])

  const setMenus = async () => {
    const r = await generateDynamicRoutes(staticMenus)
    menus.value = r.menus
  }

  return { userInfo, menus, perms, setMenus }
})

export const useUserStoreHook = () => useUserStore(store)
