import AsyncComponent from './AsyncComponent'

export default [
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
]
