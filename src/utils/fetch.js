import axios from 'axios'

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
  url,
  method,
  data,
})
