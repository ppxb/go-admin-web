import type { RouteRecordRaw } from 'vue-router'

export const generateDynamicRoutes = (asyncMenus: App.Menu[]) => {}

export const filterAsyncRoutes = (
  routes: App.Menu[],
  parentRoute: App.Menu,
  lastNamePath: string[] = []
): RouteRecordRaw[] =>
  routes
    .filter(item => item.type !== 2 && !item.isHide && item.parentId === parentRoute.id)
    .map(item => {})
