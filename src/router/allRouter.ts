/*
 * @Author: LinRenJie xoxosos666@gmail.com
 * @Date: 2023-06-03 20:36:08
 * @Description:
 */
export const allRouter = [
  {
    path: '/data-screen',
    name: 'data-screen',
    redirect: '/data-screen',
    meta: {
      title: '数据大屏'
    },
    children: [
      {
        path: '/data-screen',
        name: 'data-screen',
        component: () => import('@/views/data-screen/index.vue'),
        meta: {
          title: '数据大屏'
        }
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    redirect: '/form-base',
    meta: {
      title: '表单组件'
    },
    children: [
      {
        path: '/form-base',
        name: 'form-base',
        component: () => import('@/views/form/form-base/index.vue'),
        meta: {
          title: '基础表单'
        }
      },
      {
        path: '/advanced-form',
        name: 'form-advanced',
        component: () => import('@/views/form/form-advanced/index.vue'),
        meta: {
          title: '高级表单'
        }
      }
    ]
  },
  {
    path: '/table',
    name: 'table',
    redirect: '/table-base',
    meta: {
      title: '表格组件'
    },
    children: [
      {
        path: '/table-base',
        name: 'table-base',
        component: () => import('@/views/table/table-base/index.vue'),
        meta: {
          title: '基础表格'
        }
      },
      {
        path: '/advanced-table',
        name: 'table-advanced',
        component: () => import('@/views/table/table-advanced/index.vue'),
        meta: {
          title: '高级表格'
        }
      }
    ]
  }
]
