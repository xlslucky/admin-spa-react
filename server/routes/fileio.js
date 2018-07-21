const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const uuid = require('uuid/v4')
const xlsx = require('node-xlsx').default
const qs = require('qs')

const request = require('./request')

const upload = multer({ dest: path.resolve(__dirname, '../../_upload') })
const fileStorePath = path.resolve(__dirname, '../../attachments')
const router = express.Router()

function name(suffix) {
  const random = uuid()
  return `${random}.${suffix}`
}

function getSuffix(file) {
  return file.split('.').pop()
}

// 文件上传
router.post('/files', upload.any(), (req, res) => {
  const file = req.files[0]
  const size = file.size
  const filename = file.originalname
  const newFileName = name(getSuffix(filename))
  const newPath = `${fileStorePath}/${newFileName}`
  fs.readFile(file.path, (err, buffer) => {
    if (!err) {
      fs.writeFile(newPath, buffer, () => {
        fs.unlink(file.path)
        res.send({ code: 0, url: newFileName, size, name: filename })
      })
    } else {
      res.send({ code: -2, msg: '上传失败' })
    }
  })
})

// 文件下载
router.get('/download/:filename', (req, res) => {
  const { filename } = req.params
  const { realname } = req.query
  const filepath = `${fileStorePath}/${filename}`

  fs.readFile(filepath, (err, buffer) => {
    if (!err) {
      res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-disposition': `attachment filename=${encodeURIComponent(realname)};filename*=UTF-8''${encodeURIComponent(realname)}`,
      })
      res.end(buffer)
    } else {
      res.send({ code: -1, msg: '下载失败，请重试' })
    }
  })
})

router.get('/excel/:type', async (req, res) => {
  try {
    const { token, ...params } = req.query
    const response = await request({ req, url: `export-url?${qs.stringify(params)}`, header: { token } })
    if (req.query.rest === '1') {
      res.send(response.data)
      return
    }
    const name = '报表'
    const { data = [] } = response.data
    const buffer = xlsx.build([{
      name,
      data: [
        ['col 1', 'col2'],
        ...data,
      ],
    }])

    const filename = encodeURIComponent(name)
    res.writeHead(200, {
      'Content-Type': 'application/force-download',
      'Content-disposition': `attachment filename=${filename}.xlsx;filename*=UTF-8''${filename}.xlsx`,
    })
    res.end(buffer)
  } catch (error) {
    res.send({
      code: -2,
      msg: '导出异常，请重试',
      error,
    })
  }
})

module.exports = router
