import initModel from '../init'
import { delay } from '../../utils/fetch'

let Users = new Array(20).join(',').split(',').map((item, index) => ({
  uid: 2018001 + index,
  name: Math.random().toString(36).substr(2)
    .replace(/\d+/g, '')
    .substr(0, 4 + Math.floor(Math.random() * 6))
    .replace(/^\w{1}/, m => m.toUpperCase()),
  city: Math.random().toString(36).substr(2).replace(/\d+/g, '').substr(0, 6).toUpperCase(),
  age: Math.floor(16 + Math.random() * 30),
  createDate: new Date(Math.floor(Date.now() - Math.random() * 90000000000)) - 0,
}))

export const users = initModel('users', {
  payload: {
    pageNo: undefined,
    pageSize: undefined,
    userName: undefined,
  },
  response: {
    list: undefined,
    pageInfo: undefined,
  },
  reducer: response => ({ list: response.list, pageInfo: response.pageInfo }),
  effect: async () => {
    await delay()
    return {
      data: {
        list: Users,
        pageInfo: {
          pageNo: 1,
          pageSize: 20,
          totalPages: 10,
          total: 190,
        },
      },
    }
  },
})

export const userDelete = initModel('userDelete', {
  payload: {
    userId: undefined,
  },
  response: {
    data: undefined,
  },
  reducer: response => ({ data: response }),
  effect: async ({ userId }) => {
    if (!userId) {
      throw new Error('parameter userId is required.')
    }
    await delay()
    Users = Users.filter(item => item.uid !== userId)
    return {
      data: {
        success: true,
      },
    }
  },
})

export const userDetail = initModel('userDetail', {
  payload: {
    userId: undefined,
  },
  response: {
    data: undefined,
  },
  reducer: response => ({ data: response }),
  effect: async ({ userId }) => {
    if (!userId) {
      throw new Error('parameter userId is required.')
    }
    await delay()
    const [user] = Users.filter(item => `${item.uid}` === userId)
    if (user) {
      return {
        data: user,
      }
    }
    throw new Error('invalid user.')
  },
})

export const userEdit = initModel('userEdit', {
  payload: {
    uid: undefined,
    name: undefined,
    age: undefined,
    city: undefined,
  },
  response: {
    data: undefined,
  },
  reducer: response => ({ data: response }),
  effect: async ({ uid, name, age, city }) => {
    await delay()
    if (uid) {
      const [user] = Users.filter(item => item.uid === uid)
      user.name = name
      user.age = age
      user.city = city
    } else {
      uid = Users[Users.length - 1].uid + 1
      Users.push({
        uid,
        name,
        age,
        city,
        createDate: Date.now(),
      })
    }
    return {
      data: uid,
    }
  },
})
