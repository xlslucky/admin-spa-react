import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div style={{ height: 400, paddingTop: 150, textAlign: 'center' }}>
    <h3>404 Not Found</h3>
    <p>对不起，页面不存在，返回<Link to="/">首页</Link></p>
  </div>
)
