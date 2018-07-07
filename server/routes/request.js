const axios = require('axios')
const requestIP = require('request-ip')

const api = process.env.REST_API

module.exports = ({ req, method = 'GET', url, data = {} }) => {
  const uip = requestIP.getClientIp(req)
  const headers = {
    'content-type': 'application/json',
    'visit-ip': uip,
    'user-agent': req['user-agent'],
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
  console.log(`\n[NO.${series}][${new Date()}][API REQUEST][${method}][${realUrl}]`)

  return axios.request(options)
    .catch((err) => {
      console.log(`\n[No.${series}][${new Date()}][API EXCEPTION]`)
      console.log(err.toString())
      return Promise.resolve({ errorCode: 500 })
    })
}
