import { ContentTypeEnum, RequestEnum } from '~/enums/http'
import { RequestOptions, request } from '~/utils/request'

export const userInfo = async (options?: RequestOptions) => {
  return request<API.UserInfoRes>('/user/info', {
    method: RequestEnum.GET,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    ...(options || {})
  })
}
