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
    path: '/login',
    exact: true,
    empty: true, // 空Layout
    component: AsyncComponent(() => import('../pages/Login')),
  },
  {
    path: '/users',
    exact: true,
    component: AsyncComponent(() => import('../pages/Users')),
  },
  {
    path: '/user/edit/:userId',
    exact: true,
    component: AsyncComponent(() => import('../pages/Users/UserEdit')),
  },
  {
    path: '/user/:userId',
    exact: true,
    component: AsyncComponent(() => import('../pages/Users/UserDetail')),
  },
  {
    path: '*',
    exact: true,
    empty: true,
    component: AsyncComponent(() => import('../pages/NotFound')),
  },
]
