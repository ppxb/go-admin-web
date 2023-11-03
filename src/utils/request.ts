import axios, { AxiosRequestConfig, AxiosError } from 'axios'

import { getToken } from './cache'

const createInstance = () => {
  const instance = axios.create()

  instance.interceptors.request.use(config => {
    const token = getToken()
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    response => {
      const res = response.data
      if (res || response.config.responseType === 'blob') return res
      return null
    },
    async (err: AxiosError<any>) => {}
  )

  return instance
}

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const defaultConfig = {
    timeout: 10000,
    baseURL: 'http://localhost:8100/api/v1'
  } as AxiosRequestConfig
  const instance = createInstance()
  const http = await instance({ ...defaultConfig, ...config })
  return http as unknown as Promise<T>
}

export default request
