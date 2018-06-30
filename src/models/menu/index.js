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
          url: '/',
          icon: 'home',
        },
        {
          name: 'Github',
          url: '/github',
          icon: 'github',
        },
        {
          name: 'Users',
          url: '/users',
          icon: 'user',
        },
        {
          name: 'Settings',
          icon: 'setting',
          children: [
            {
              name: 'Menu',
              url: '/setting/menu',
            },
          ],
        },
      ],
    }
  },
})
