import type { RouteMeta as VRouteMeta } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta extends VRouteMeta {
    title: string
    type?: App.RouteType
    perms?: string[]
    fullPath?: string
    namePath?: string[]
    transitionName?: string
    affix?: boolean
    icon?: string
    hideInMenu?: boolean
    hideChildrenInMenu?: boolean
    hideInBreadcrumb?: boolean
    hideInTabs?: boolean
    activeMenu?: string
    order?: number
    isKeepAlive?: boolean
  }
}
