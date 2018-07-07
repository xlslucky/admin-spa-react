import axios from 'axios'
import { getToken } from './user'

const API_PREFIX = process.env.API || 'http://127.0.0.1:3000'

/**
 * 延迟后面代码执行
 * @param {number} seconds 秒
 */
export const delay = (seconds = 1) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, seconds * 1000)
})

export default ({ url, method = 'GET', data }) => axios({
  url: /^https?:/.test(url) ? url : `${API_PREFIX}${url}`,
  method,
  data,
  headers: {
    'u-token': getToken(),
  },
})
