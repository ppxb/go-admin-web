import type { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import { basicRoutes } from './basicRoutes'

export const WHITE_NAME_LIST = ['/login']

const routes: RouteRecordRaw[] = [...basicRoutes]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export const resetRouter = () =>
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.some(n => n === name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })

export const setupRouter = async (app: App) => {
  app.use(router)

  await router.isReady()
}
