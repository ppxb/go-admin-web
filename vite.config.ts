import { resolve } from 'path'
import dayjs from 'dayjs'

import type { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

import pkg from './package.json'

const r = (dir: string) => resolve(__dirname, '.', dir)

const alias: Record<string, string> = {
  '~': r('src'),
  '~~': r('types')
}

const info = {
  pkg,
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

export default ({}: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      UnoCSS(),
      Components({
        dts: 'types/components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          })
        ]
      })
    ],
    resolve: {
      alias
    },
    define: {
      __APP_INFO__: JSON.stringify(info)
    }
  }
}
