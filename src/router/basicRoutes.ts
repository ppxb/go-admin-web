import { RouteRecordRaw } from 'vue-router'

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]
