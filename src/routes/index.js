import AsyncComponent from './AsyncComponent'

import user from './user'
import setting from './setting'

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
    path: '/login',
    exact: true,
    empty: true, // 空Layout
    public: true,
    component: AsyncComponent(() => import('../pages/Login')),
  },
  ...setting,
  ...user,
  {
    path: '*',
    exact: true,
    empty: true,
    public: true,
    component: AsyncComponent(() => import('../pages/NotFound')),
  },
]
