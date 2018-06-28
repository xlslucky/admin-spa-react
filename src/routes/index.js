import AsyncComponent from './AsyncComponent'

export default [
  {
    path: '/',
    exact: true,
    component: AsyncComponent(() => import('../pages/Home')),
  },
  {
    path: '/github',
    component: AsyncComponent(() => import('../pages/Github')),
  },
]
