import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { CanceledError } from 'axios'
import { message as $message, Modal } from 'ant-design-vue'

import { storage } from '~/utils/storage'
import { ACCESS_TOKEN_KEY } from '~/constants/cache'
import { UNKNOWN_ERROR } from '~/constants/http'
import { ResultEnum } from '~/enums/http'

export interface RequestOptions extends AxiosRequestConfig {
  isReturnResult?: boolean
  successMsg?: string
  errorMsg?: string
  showSuccessMsg?: boolean
  showErrorMsg?: boolean
  requestType?: 'json' | 'form'
}

export const baseApiUrl = import.meta.env.VITE_BASE_API_URL

const controller = new AbortController()
const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 6000,
  signal: controller.signal
})

service.interceptors.request.use(
  config => {
    const token = storage.get(ACCESS_TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

type BaseResponse<T = any> = Omit<API.ResObj, 'data'> & {
  data: T
}

service.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    const res = response.data
    if (res.code !== ResultEnum.SUCCESS) {
      $message.error(res.message || UNKNOWN_ERROR)

      if ([1101, 1102].includes(res.code)) {
        controller.abort()
        Modal.confirm({
          title: '警告',
          content: res.message || '账号异常或令牌失效，建议您重新登录',
          okText: '重新登录',
          cancelText: '取消',
          onOk: () => {
            storage.clear()
            window.location.reload()
          }
        })
      }

      const error = new Error(res.message || UNKNOWN_ERROR) as Error & {
        code: any
      }
      error.code = res.code
      return Promise.reject(error)
    } else {
      return response
    }
  },
  error => {
    if (!(error instanceof CanceledError)) {
      const errorMsg = error?.response?.data?.message ?? UNKNOWN_ERROR
      $message.error({ content: errorMsg, key: errorMsg })
      error.message = errorMsg
    }
    return Promise.reject(error)
  }
)

export const request = async <T = BaseResponse>(url: string, config: RequestOptions = {}) => {
  try {
    const { requestType, isReturnResult = true, ...rest } = config

    const response = (await service.request<T>({
      url,
      ...rest,
      headers: {
        ...rest.headers,
        ...(requestType === 'form' ? { 'Content-Type': 'multipart/form-data' } : {})
      }
    })) as AxiosResponse<BaseResponse>

    const { data } = response
    const { code, message } = data || {}
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS

    if (hasSuccess) {
      const { successMsg, showSuccessMsg } = config
      if (successMsg) {
        $message.success(successMsg)
      } else if (showSuccessMsg && message) {
        $message.success(message)
      }
    }

    if (!isReturnResult) {
      return data
    } else {
      return data.data
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
