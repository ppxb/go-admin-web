import request from '~/utils/request'
import { ApiMethod, Result } from './base'

export interface LoginData {
  username: string
  password: string
}

export interface LoginResult {
  userInfo: UserInfo
  token: string
  menuList: string[]
  permissions: string[]
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
