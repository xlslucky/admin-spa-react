import initModel from '../init'
import fetch from '../../utils/fetch'

export const githubUser = initModel('githubUser', {
  payload: {
    userId: undefined,
  },
  response: {
    data: undefined,
  },
  reducer: response => ({ data: response }),
  effect: async ({ userId } = {}) => {
    if (!userId) {
      throw new Error('userId is undefined')
    }
    const response = await fetch({ url: `https://api.github.com/users/${userId}` })
    return response
  },
})

export const githubRepos = initModel('githubRepos', {
  payload: {
    userId: undefined,
  },
  response: {
    data: undefined,
  },
  reducer: response => ({ data: response }),
  effect: async ({ owner, project } = {}) => {
    if (!owner || !project) {
      throw new Error('400 Bad Request.')
    }
    const response = await fetch({ url: `https://api.github.com/repos/${owner}/${project}` })
    return response
  },
})
