declare namespace App {
  type Menu = {
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
    isLink: boolean
    isAffix: boolean
    redirect: string
    path: string
    linkUrl: string
    createAt: Date
    updatedAt: Date
  }
}
