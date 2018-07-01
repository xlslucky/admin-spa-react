import AsyncComponent from './AsyncComponent'

export default [
  {
    path: '/setting/menu',
    exact: true,
    component: AsyncComponent(() => import('../pages/Setting/Menu')),
  },
]
