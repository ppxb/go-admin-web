import type { RouteRecordRaw } from 'vue-router'

import RouterView from '~/layout/router-view/index.vue'

export const notFound: RouteRecordRaw = {
  path: '/:catchAll(.*)',
  meta: {
    title: 'Not Found',
    hideInMenu: true,
    hideInTabs: true
  },
  redirect: '/error/404',
  component: () => import('~/views/error/404.vue'),
  children: []
}

export const errorRoute: RouteRecordRaw = {
  path: '/error',
  redirect: '/error/404',
  component: RouterView,
  meta: {
    title: '错误页',
    hideInMenu: true,
    hideInTabs: true
  },
  children: [
    {
      path: '404',
      name: 'PageNotFound',
      meta: {
        title: '404',
        hideInMenu: true
      },
      component: () => import('~/views/error/404.vue')
    }
  ]
}

export default [notFound, errorRoute]
