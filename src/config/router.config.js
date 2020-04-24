import BasicLayout from '@/layouts/BasicLayout'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { icon: 'el-icon-platform-eleme', title: '仪表盘', index: '1', permission: ['dashboard'] },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: '分析页', index: '1-1', permission: ['analysis'] },
            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Analysis.vue')
          },
          {
            path: '/dashboard/analysis2',
            name: 'analysis',
            meta: { title: '分析页2', index: '1-2', permission: ['analysis2'] },
            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Analysis.vue')
          }
        ]
      },
      {
        path: '/codeMapping',
        name: 'codeMapping',
        meta: { icon: 'el-icon-platform-eleme', title: '仪表盘', index: '2', permission: ['codeMapping'] },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/code/CodeMapping.vue')
      }
    ]
  }
]

export const constantRouterMap = [
  {
    path: '/user',
    redirect: '/user/login',
    meta: { hideInMenu: true },
    component: () => import(/* webpackChunkName: "layout" */ '@/layouts/UserLayout.vue'),
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    meta: { title: '403', hideInMenu: true },
    component: () => import(/* webpackChunkName: "exception" */ '@/views/Exception/403')
  },
  {
    path: '*',
    name: '404',
    meta: { title: '404', hideInMenu: true },
    component: () => import(/* webpackChunkName: "exception" */ '@/views/Exception/404')
  }
]
