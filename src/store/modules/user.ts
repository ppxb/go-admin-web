import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'

import Api from '~/api'
import { store } from '~/store'
import { resetRouter } from '~/router'
import { generateDynamicRoutes } from '~/router/generator'
import { storage } from '~/utils/storage'
import { ACCESS_TOKEN_KEY } from '~/constants/cache'

export const useUserStore = defineStore('user', () => {
  const token = ref(storage.get(ACCESS_TOKEN_KEY, null))
  const user = ref<Partial<API.UserEntity>>({})
  const menus = ref<RouteRecordRaw[]>([])
  const perms = ref<string[]>([])

  const setToken = (t: string): void => {
    token.value = t
    storage.set(ACCESS_TOKEN_KEY, token.value)
  }

  const reset = () => {
    token.value = ''
    perms.value = []
    menus.value = []
    user.value = {}
    storage.clear()
  }

  const login = async (params: API.LoginReq) => {
    try {
      const data = await Api.auth.login(params)
      setToken(data.token)
      await afterLogin()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const logout = async () => {
    await Api.auth.logout()
    resetRouter()
    reset()
  }

  const afterLogin = async () => {
    try {
      const data = await Api.user.userInfo()
      user.value = data.user
      perms.value = data.perms
      const r = await generateDynamicRoutes(data.menus)
      menus.value = r.menus
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { token, user, menus, perms, login, logout, afterLogin, reset }
})

export const useUserStoreHook = () => useUserStore(store)
