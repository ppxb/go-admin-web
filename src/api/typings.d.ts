declare namespace API {
  type ResObj = {
    code: number
    message: string
    data: Record<string, any>
  }

  type LoginReq = {
    username: string
    password: string
  }

  type LoginRes = {
    token: string
  }

  type UserEntity = {
    id: number
    username: string
    nickname: string
    avatar: string
    name: string
    status: number
    isAdmin: number
    deptId: number
  }

  type UserInfoRes = {
    user: UserEntity
    menus: RouteMenu[]
    perms: string[]
  }
}
