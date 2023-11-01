import type { RouteRecordRaw } from 'vue-router'

import { RouteType } from '~~/enum'
import { uniqueSlash } from '~/utils'
import { asyncModulesViews } from './modules'
import RouterView from '~/layout/router-view/index.vue'
import { router, routes } from '~/router'
import common from '~/router/common'
import { basicRoutes } from '~/router/basic-routes'

export const generateDynamicRoutes = (asyncMenus: RouteMenu[]) => {
  try {
    const asyncRoutes = filterAsyncRoutes(asyncMenus)
    const layout = routes.find(n => n.name === 'Layout')!
    generateNamedPath(common)
    const menus = [...common, ...asyncRoutes]
    layout.children = menus
    const removeRoutes = router.addRoute(layout)
    const filteredRoutes = router
      .getRoutes()
      .filter(
        item =>
          !(item.children.length || Object.is(item.meta.hideChildrenInMenu, true)) &&
          !basicRoutes.some(n => n.name === item.name)
      )
    removeRoutes()
    layout.children = [...filteredRoutes]
    router.addRoute(layout)

    return Promise.resolve({
      menus,
      routes: layout.children
    })
  } catch (e) {
    console.error('路由生成错误', e)
    return Promise.reject(`路由生成错误：${e}`)
  }
}

export const filterAsyncRoutes = (
  routes: RouteMenu[],
  parentRoute: RouteMenu | null = null,
  lastNamePath: string[] = []
): RouteRecordRaw[] =>
  routes
    .filter(item => {
      return item.type !== RouteType.Butotn && item.isHide && item.parentId == parentRoute?.id
    })
    .map(item => {
      const { router, component, name, icon, order, isKeepAlive } = item
      let fullPath = ''
      const pathPrefix = lastNamePath.at(-1) || ''
      fullPath = router.startsWith('/') ? router : `/${router}`
      fullPath = router.startsWith(pathPrefix) ? fullPath : pathPrefix + fullPath
      fullPath = [...new Set(uniqueSlash(fullPath).split('/'))].join('/')

      let realRoutePath = router
      if (parentRoute) {
        if (fullPath.startsWith(parentRoute.router)) {
          realRoutePath = fullPath.split(parentRoute.router)[1]
        }
      }

      realRoutePath = realRoutePath.startsWith('/') ? realRoutePath.slice(1) : realRoutePath
      realRoutePath = realRoutePath.replace(/http(s)?:\/\//, '')
      const route: Partial<RouteRecordRaw> = {
        path: realRoutePath,
        name: fullPath,
        meta: {
          title: name,
          icon,
          type: item.type,
          perms: [],
          namePath: lastNamePath.concat(fullPath),
          order,
          isKeepAlive
        }
      }

      if (item.type === RouteType.Menu) {
        const children = filterAsyncRoutes(routes, item, lastNamePath.concat(fullPath))
        if (children.length) {
          route.component = RouterView
          route.children = children
          route.redirect = { name: children[0].name }
        }
        return route
      } else if (item.type === RouteType.View) {
        route.component = asyncModulesViews[component]
        return route
      }
      return undefined
    })
    .filter((item): item is RouteRecordRaw => !!item)

export const generateNamedPath = (
  routes: RouteRecordRaw[],
  namePath?: string[],
  parent?: RouteRecordRaw
) => {
  routes.forEach(item => {
    if (item.meta && typeof item.name === 'string') {
      item.meta.namePath = Array.isArray(namePath) ? namePath.concat(item.name) : [item.name]
      item.meta.fullPath = parent?.meta?.fullPath
        ? [parent.meta.fullPath, item.path].join('/')
        : item.path
      item.meta.fullPath = uniqueSlash(item.meta.fullPath)

      if (item.children?.length) {
        generateNamedPath(item.children, item.meta.namePath, item)
      }
    }
  })
}
