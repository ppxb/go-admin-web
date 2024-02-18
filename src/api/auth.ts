import { RequestEnum, ContentTypeEnum } from '~/enums/http'
import { RequestOptions, request } from '~/utils/request'

export const login = async (data: API.LoginReq, options?: RequestOptions) => {
  return request<API.LoginRes>('/login', {
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    data,
    ...(options || {})
  })
}

export const logout = async (options?: RequestOptions) => {
  return request<any>('/logout', {
    method: RequestEnum.GET,
    ...(options || {})
  })
}
