import { type Router, type RouteLocationNormalized, isNavigationFailure } from 'vue-router'
import NProgress from 'nprogress'

import { useUserStore } from '~/store/modules/user'
import { useKeepAliveStore } from '~/store/modules/keepAlive'
import { getToken } from '~/utils/cache'
import { to as _to } from '~/utils/await-to'

NProgress.configure({ showSpinner: false })

const defaultRoutePath = '/dashboard/workspace'

export const createRouterGuard = (router: Router, whiteNameList: string[]) => {
  router.beforeEach(async (to, _, next) => {
    NProgress.start()

    const userStore = useUserStore()
    const token = getToken()

    if (token) {
      if (to.name === 'Login') {
        next({ path: defaultRoutePath })
      } else {
        const hasRoute = router.hasRoute(to.name!)
        if (userStore.menus.length === 0) {
          const [err] = await _to(userStore.getInfoAndRules())
          if (err) {
            userStore.reset()
            return next({ name: 'Login' })
          }
          if (!hasRoute) {
            next({ ...to, replace: true })
          } else {
            next()
          }
        } else {
          next()
        }
      }
    } else {
      if (whiteNameList.some(n => n === to.name)) {
        next()
      } else {
        next({ name: 'Login', query: { redirect: to.fullPath }, replace: true })
      }
    }
  })

  router.afterEach((to, from, failure) => {
    const keepAliveStore = useKeepAliveStore()
    const token = getToken()
    const toCompName = getComponentName(to)

    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure)
    }
    if (to.meta.isKeepAlive) {
      if (toCompName) {
        keepAliveStore.add(toCompName)
      } else {
        console.warn(`${to.fullPath}页面组件的isKeepAlive为true但未设置组件名，会导致缓存失效`)
      }
    } else {
      if (toCompName) {
        keepAliveStore.remove(toCompName)
      }
    }

    if (to.name === 'Redirect') {
      const fromCompName = getComponentName(from)
      fromCompName && keepAliveStore.remove(fromCompName)
    }

    if (!token) {
      keepAliveStore.clear()
    }

    NProgress.done()
  })

  router.onError(error => {
    console.log(error, '路由错误')
  })
}

const getComponentName = (route: RouteLocationNormalized) => {
  const comp = route.matched.at(-1)?.components?.default
  return comp?.name ?? (comp as any)?.type?.name
}
