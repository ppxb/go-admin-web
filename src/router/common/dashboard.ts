import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/workspace',
    meta: {
      title: '总览',
      icon: 'i-ic:baseline-bar-chart'
    },
    children: [
      {
        path: 'chart',
        name: 'Chart',
        meta: {
          title: '数据面板',
          icon: 'i-ic:baseline-auto-graph'
        },
        component: () => import('~/views/dashboard/workspace/index.vue')
      },
      {
        path: 'workspace',
        name: 'Workspace',
        meta: {
          title: '工作空间',
          icon: 'i-ic:baseline-panorama-wide-angle'
        },
        component: () => import('~/views/dashboard/workspace/index.vue')
      }
    ]
  }
]

export default routes
