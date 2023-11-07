import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/workspace',
    meta: {
      title: '控制台',
      icon: 'icon-yibiaopan'
    },
    children: [
      {
        path: 'workspace',
        name: 'Workspace',
        meta: {
          title: '欢迎',
          icon: 'icon-shouye'
        },
        component: () => import('~/views/dashboard/workspace/index.vue')
      }
    ]
  }
]

export default routes
