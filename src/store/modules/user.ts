import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

import { store } from '~/store'
import {
  LoginData,
  login as LoginApi,
  getInfo as GetInfoApi,
  LoginResult,
  UserInfo,
  UserInfoResult
} from '~/api/user'
import { generateDynamicRoutes } from '~/router/generator'
import { setToken, removeToken } from '~/utils/cache'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo>()
  const menus = ref<RouteRecordRaw[]>([])
  const perms = ref<string[]>([])

  const login = async (data: LoginData) => {
    try {
      const res = await LoginApi(data)
      if (res.code === 0) {
        const data = res.data as LoginResult
        setToken(data.token)
        await getInfoAndRules()
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getInfoAndRules = async () => {
    try {
      const res = await GetInfoApi()
      if (res.code === 0) {
        const data = res.data as UserInfoResult
        user.value = data.user
        perms.value = data.perms
        const r = await generateDynamicRoutes(data.menus)
        menus.value = r.menus
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const reset = () => {
    user.value = undefined
    menus.value = []
    perms.value = []
    removeToken()
  }

  return { user, menus, perms, login, getInfoAndRules, reset }
})

export const useUserStoreHook = () => useUserStore(store)
