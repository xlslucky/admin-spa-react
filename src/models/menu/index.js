import initModel from '../init'
import { delay } from '../../utils/fetch'

export const menu = initModel('menu', {
  action: 'getMenu',
  reset: 'resetMenu',
  payload: {},
  response: {
    data: undefined,
  },
  reducer: response => ({ data: response.data }),
  effect: async () => {
    await delay()
    return {
      data: [
        {
          name: 'Home',
          id: 101,
          url: '/',
          icon: 'home',
        },
        {
          name: 'Github',
          id: 102,
          url: '/github',
          icon: 'github',
        },
        {
          name: 'Users',
          id: 103,
          url: '/users',
          icon: 'user',
        },
        {
          name: 'Settings',
          id: 104,
          icon: 'setting',
          children: [
            {
              name: 'Menu',
              id: 10401,
              url: '/setting/menu',
            },
          ],
        },
      ],
    }
  },
})
