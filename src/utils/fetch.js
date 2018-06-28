import axios from 'axios'

export default ({ url, method = 'GET', data }) => axios({
  url,
  method,
  data,
})
