declare type RouteMenu = {
  id: number
  parentId: number
  name: string
  router: string
  perms: string
  type: number
  order: number
  icon: string
  component: string
  isKeepAlive: boolean
  isHide: boolean
  isLink?: boolean
  isAffix?: boolean
  redirect?: string
  path?: string
  linkUrl?: string
  createdAt: string
  updatedAt: string
  isExt?: boolean
  openMode?: number
}
