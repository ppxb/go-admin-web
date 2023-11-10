import request from '~/utils/request'
import { ApiMethod, Result } from './base'

export interface LoginData {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

export interface UserInfoResult {
  user: UserInfo
  menus: RouteMenu[]
  perms: string[]
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  name: string
  status: number
  isAdmin: number
  deptId: number
}

export const login = (data: LoginData) => {
  return request<Result<LoginResult>>({
    url: '/login',
    method: ApiMethod.POST,
    data
  })
}

export const getInfo = () => {
  return request<Result<UserInfoResult>>({
    url: '/user/info',
    method: ApiMethod.GET
  })
}
