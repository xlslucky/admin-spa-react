import initModel from '../init'
import { delay } from '../../utils/fetch'
import { getUser } from '../../utils/user'

export const loginUser = {
  state: {
    user: getUser(),
  },
  reducers: {
    update() {
      return {
        user: getUser(),
      }
    },
  },
}

export const login = initModel('login', {
  payload: {
    username: undefined,
    password: undefined,
    remember: false,
  },
  response: {
    data: undefined,
  },
  effect: async ({ username, password } = {}) => {
    if (!username || !password) {
      throw new Error('400 Bad Request.')
    }
    await delay()
    if (username !== 'admin' || password !== '123456') {
      throw new Error('用户名或密码错误')
    }
    return {
      data: {
        data: {
          name: '管理员',
          uid: 'admin',
          avatar: 'https://avatars3.githubusercontent.com/u/3406222?s=40&v=4',
          token: 'XXXX-YYYY-ZZZZ-HAHA',
        },
        auths: [],
      },
    }
  },
})
