import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div style={{ height: 400, paddingTop: 150, textAlign: 'center' }}>
    <h3>403 Forbidden</h3>
    <p>对不起，没有权限访问该页面，返回<Link to="/">首页</Link></p>
  </div>
)
