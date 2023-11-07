import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'

import { store } from '~/store'
import { LoginData, login as LoginApi, LoginResult, UserInfo } from '~/api/user'
import { generateDynamicRoutes } from '~/router/generator'
import { useMessage } from '~/composables/use-message'
import { setToken } from '~/utils/cache'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo>()
  const menus = ref<RouteRecordRaw[]>([])
  const perms = ref<string[]>([])
  const { httpMessage } = useMessage()

  const login = async (data: LoginData): Promise<boolean> => {
    const res = await LoginApi(data)
    httpMessage(res.code, res.message)
    if (res.code === 0) {
      const data = res.data as LoginResult
      setToken(data.token)
      await getInfoAndRules(data)
      return true
    }
    return false
  }

  const getInfoAndRules = async (data: LoginResult) => {
    user.value = data.user
    perms.value = data.perms
    const r = await generateDynamicRoutes(data.menus)
    menus.value = r.menus
  }

  return { user, menus, perms, login, getInfoAndRules }
})

export const useUserStoreHook = () => useUserStore(store)
