import { jwtDecode } from 'jwt-decode'

export enum CacheType {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refresh_token',
  REFRESH_TOKEN_EXPIRE = 'refresh_token_expire'
}

interface Claims {
  id?: string
  iat: number
  exp: number
}

export const setToken = (token: string, refreshToken: string) => {
  localStorage.setItem(CacheType.TOKEN, token)
  localStorage.setItem(CacheType.REFRESH_TOKEN, refreshToken)
  const expire = (jwtDecode(refreshToken) as Claims)?.exp * 1000
  setExpire(expire)
}

export const getToken = (): string | null => localStorage.getItem(CacheType.TOKEN)

export const getRefreshToken = (): string | null => localStorage.getItem(CacheType.REFRESH_TOKEN)

export const setExpire = (expire: number) =>
  localStorage.setItem(CacheType.REFRESH_TOKEN_EXPIRE, expire.toString())

export const getExpire = () => {
  const expire = localStorage.getItem(CacheType.REFRESH_TOKEN_EXPIRE)
  return expire ? Number(expire) : 0
}

export const clearCache = () => localStorage.clear()
