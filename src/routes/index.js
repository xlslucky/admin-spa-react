import AsyncComponent from './AsyncComponent'

export default [
  {
    path: '/',
    exact: true,
    component: AsyncComponent(() => import('../pages/Home')),
  },
  {
    path: '/github',
    exact: true,
    component: AsyncComponent(() => import('../pages/Github')),
  },
  {
    path: '*',
    exact: true,
    empty: true,
    component: AsyncComponent(() => import('../pages/NotFound')),
  },
]
