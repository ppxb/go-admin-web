import { ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'

import { store } from '~/store'
import { menus as staticMenus } from '~/router/constant'
import { generateDynamicRoutes } from '~/router/generator'
import { LoginData, login as LoginApi, LoginResult } from '~/api/user'
import { useMessage } from '~/composables/use-message'
import { setToken } from '~/utils/cache'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const menus = ref<RouteRecordRaw[]>([])
  const perms = ref([])
  const { httpMessage } = useMessage()

  const login = async (data: LoginData): Promise<boolean> => {
    const res = await LoginApi(data)
    httpMessage(res.code, res.message)
    if (res.code === 0) {
      const data = res.data as LoginResult
      setToken(data.token, data.token)
      return true
    }
    return false
  }

  const setMenus = async () => {
    const r = await generateDynamicRoutes(staticMenus)
    menus.value = r.menus
  }

  return { userInfo, menus, perms, login, setMenus }
})

export const useUserStoreHook = () => useUserStore(store)
