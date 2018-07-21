import axios from 'axios'
import { getToken } from './user'
import qs from 'qs'

const API_PREFIX = (process.env.NODE_ENV === 'production') ? '' : 'http://127.0.0.1:3000'

/**
 * 延迟后面代码执行
 * @param {number} seconds 秒
 */
export const delay = (seconds = 1) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, seconds * 1000)
})

export const getExportUrl = (type, query = {}) => {
  const token = getToken()
  query.token = token
  return `/fileio/excel/${type}?${qs.stringify(query)}`
}

export default ({ url, method = 'GET', data }) => axios({
  url: /^https?:/.test(url) ? url : `${API_PREFIX}${url}`,
  method,
  data,
  headers: {
    'u-token': getToken() || undefined,
  },
}).then((response) => {
  const { data } = response
  if (data.status === 401) {
    const originalUrl = encodeURIComponent(`${window.location.pathname}${window.location.search}`)
    return window.location.replace(`/login?originalUrl=${originalUrl}`)
  }
  return response
})
