import type { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import 'nprogress/nprogress.css'

import { basicRoutes } from './basic-routes'
import { createRouterGuard } from './guard'

export const WHITE_NAME_LIST = ['Login']

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard/workspace',
    component: () => import('~/layout/index.vue'),
    meta: {
      title: '首页'
    },
    children: []
  },
  ...basicRoutes
]

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
  createRouterGuard(router, WHITE_NAME_LIST)

  app.use(router)

  await router.isReady()
}
