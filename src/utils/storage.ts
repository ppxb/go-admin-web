export const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
  class Storage {
    private storage = storage
    private prefixKey?: string = prefixKey

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    set(key: string, value: any, expire: number | null = null): void {
      const data = {
        value,
        expire: expire !== null ? Date.now() + expire * 1000 : null
      }
      this.storage.setItem(this.getKey(key), JSON.stringify(data))
    }

    get<T = any>(key: string, escape: any = null): T {
      const item = this.storage.getItem(this.getKey(key))

      if (!item) return escape
      try {
        const { value, expire } = JSON.parse(item)
        if (expire === null || expire >= Date.now()) {
          return value
        }
        this.remove(this.getKey(key))
      } catch (error) {
        return escape
      }
      return escape
    }

    remove(key: string): void {
      this.storage.removeItem(key)
    }

    clear(): void {
      this.storage.clear()
    }

    setCookie(name: string, value: any, expire: number | null = null): void {
      document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`
    }

    getCookie(name: string): string {
      const cookies = Object.fromEntries(
        document.cookie.split('; ').map(cookie => cookie.split('='))
      )
      return cookies[this.getKey(name)] || ''
    }

    removeCookie(key: string): void {
      this.setCookie(key, 1, -1)
    }

    clearCookie(): void {
      const keys = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim())
      keys.forEach(key => (document.cookie = `${key}=0;expires=${new Date(0).toUTCString()}`))
    }
  }

  return new Storage()
}

export const storage = createStorage()
