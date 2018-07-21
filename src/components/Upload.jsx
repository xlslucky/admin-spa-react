import React from 'react'
import { Upload as CoreUpload, Button, Icon, message } from 'antd'

const API_PREFIX = (process.env.NODE_ENV === 'production') ? '' : 'http://127.0.0.1:3000'

export const getFullFileUrl = file => (
  `${API_PREFIX}/fileio/download/${file.url}?realname=${encodeURIComponent(file.name)}`
)

export const formatFiles = (files = []) => files.map((file, index) => ({
  uid: index + 1,
  name: file.name,
  status: 'done',
  url: getFullFileUrl(file),
  response: { code: 0, ...file },
}))

export default class Upload extends React.PureComponent {
  onChange = ({ file, fileList }) => {
    if (file.status !== 'uploading') {
      this.props.onChange(fileList.map(item => item.response))
    }
    if (file.status === 'done') {
      message.success(`${file.name} 上传成功`)
    } else if (file.status === 'error') {
      message.error(`${file.name} 上传失败.`)
    }
  }

  render() {
    return (
      <CoreUpload
        name="file"
        action={`${API_PREFIX}/fileio/files`}
        onChange={this.onChange}
        multiple={this.props.multiple}
        accept={this.props.accept}
        defaultFileList={this.props.defaultFileList}
      >
        <Button>
          <Icon type="upload" /> 选择文件
        </Button>
      </CoreUpload>
    )
  }
}
