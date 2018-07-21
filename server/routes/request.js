const axios = require('axios')
const requestIP = require('request-ip')

const api = process.env.REST_API

module.exports = ({ req, method = 'GET', url, data = {}, header = {} }) => {
  const uip = requestIP.getClientIp(req)
  const headers = {
    'content-type': 'application/json',
    'visit-ip': uip,
    'user-agent': req.headers['user-agent'],
    ...header,
  }

  if (req.headers['u-token']) {
    headers.token = req.headers['u-token']
  }

  const realUrl = url ? (api + url) : (api + req.originalUrl.replace(/^\/api/, ''))

  const options = {
    method,
    headers,
    data: method === 'POST' ? data : undefined,
    url: realUrl,
  }

  const series = Math.random().toString().substr(2, 6)

  /* eslint-disable no-console */
  console.log(`\n[NO.${series}][${new Date()}]\n[API REQUEST][${method}][${realUrl}]`)

  return axios.request(options)
    .catch((err) => {
      console.log(`\n[No.${series}][${new Date()}]\n[API EXCEPTION]`)
      console.log(`[No.${series}][Token] ${headers.token}`)
      console.log(`[No.${series}] ${err.message}\n`)
      const { response: { status = 500 } = {} } = err
      return Promise.resolve({
        data: { code: -2, status: status, msg: '接口调用异常，请联系系统管理员', error: err.message },
      })
    })
}
