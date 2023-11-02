import type { RouteRecordRaw } from 'vue-router'

import { router, routes } from '~/router'
import { RouteType } from '~~/enum'
import { uniqueSlash } from '~/utils'
import { basicRoutes } from '~/router/basic-routes'
import { asyncModulesViews } from './modules'
import common from '~/router/common'
import RouterView from '~/layout/router-view/index.vue'

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
    .filter(
      item => item.type !== RouteType.Butotn && !item.isHide && item.parentId == parentRoute?.id
    )
    .map(item => {
      const { router, component, name, icon, order, isKeepAlive, perms } = item
      const pathPrefix = lastNamePath.at(-1) || ''

      let fullPath = ''
      fullPath = router?.startsWith('/') ? router : `/${router}`
      fullPath = router?.startsWith(pathPrefix) ? fullPath : pathPrefix + fullPath
      fullPath = [...new Set(uniqueSlash(fullPath).split('/'))].join('/')

      let realRoutePath = router
      if (parentRoute) {
        if (fullPath.startsWith(parentRoute.router as string)) {
          realRoutePath = fullPath.split(parentRoute.router as string)[1]
        }
      }
      realRoutePath = realRoutePath?.startsWith('/') ? realRoutePath.slice(1) : realRoutePath
      realRoutePath = realRoutePath?.replace(/http(s)?:\/\//, '')

      const route: Partial<RouteRecordRaw> = {
        path: realRoutePath,
        name: fullPath,
        meta: {
          title: name,
          icon,
          type: item.type,
          perms: perms?.split(','),
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
        route.component = asyncModulesViews[component as string]
        return route
      }
      return undefined
    })
    .filter((item): item is RouteRecordRaw => !!item)

export const generateNamedPath = (
  routes: RouteRecordRaw[],
  namePath: string[] = [],
  parent?: RouteRecordRaw
) => {
  routes.forEach(item => {
    if (item.meta && typeof item.name === 'string') {
      const { name, path } = item
      const { fullPath } = parent?.meta || {}
      const meta = item.meta
      meta.namePath = [...namePath, name]
      meta.fullPath = fullPath ? `${fullPath}/${path}` : path
      meta.fullPath = uniqueSlash(meta.fullPath)

      if (item.children?.length) {
        generateNamedPath(item.children, meta.namePath, item)
      }
    }
  })
}
