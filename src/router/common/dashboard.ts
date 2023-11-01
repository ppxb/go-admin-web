import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/welcome',
    meta: {
      title: '控制台',
      icon: 'icon-yibiaopan'
    },
    children: [
      {
        path: 'welcome',
        name: 'dashboard-welcome',
        meta: {
          title: '欢迎',
          icon: 'icon-shouye'
        },
        component: () => import('~/views/dashboard/index.vue')
      }
    ]
  }
]

export default routes
