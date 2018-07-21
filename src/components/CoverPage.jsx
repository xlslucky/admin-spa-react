import React from 'react'
import { Icon } from 'antd'

export default props => (
  <div className="cover-page">
    <Icon type={props.type || 'loading'} style={{ marginRight: 10 }} />
    {props.children || '正在请求页面...'}
  </div>
)
