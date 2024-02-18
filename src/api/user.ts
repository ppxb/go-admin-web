import { ContentTypeEnum, RequestEnum } from '~/enums/http'
import { RequestOptions, request } from '~/utils/request'

export const userWithPerms = async (options?: RequestOptions) => {
  return request<API.UserWithPermsRes>('/user/info', {
    method: RequestEnum.GET,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    ...(options || {})
  })
}
