const express = require('express')
const path = require('path')
const request = require('./request')

const router = express.Router()

router.get('/api/*', async (req, res) => {
  try {
    const response = await request({ req })
    res.send(response.data)
  } catch (error) {
    res.send({
      errorCode: 500,
      message: 'Internal Server Error',
    })
  }
})

router.post('/api/*', async (req, res) => {
  try {
    const response = await request({ req, method: 'POST', data: req.body })
    res.send(response.data)
  } catch (error) {
    res.send({
      errorCode: 500,
      message: 'Internal Server Error',
    })
  }
})

router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'))
})

module.exports = router
