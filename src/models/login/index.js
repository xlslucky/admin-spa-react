import initModel from '../init'
import { delay } from '../../utils/fetch'

export const login = initModel('login', {
  action: 'doLogin',
  reset: 'resetLogin',
  payload: {
    username: undefined,
    password: undefined,
    remember: false,
  },
  response: {
    data: undefined,
  },
  reducer: response => ({ data: response.data }),
  effect: async ({ username, password, remember } = {}) => {
    if (!username || !password) {
      throw new Error('400 Bad Request.')
    }
    await delay()
    if (username !== 'admin' || password !== '123456') {
      throw new Error('用户名或密码错误')
    }
    return {
      data: {
        name: '管理员',
        uid: 'admin',
        avatar: 'https://avatars3.githubusercontent.com/u/3406222?s=40&v=4',
        token: 'XXXX-YYYY-ZZZZ-HAHA',
      },
    }
  },
})
