import React from 'react'

import BaseComponent from '../../components/BaseComponent'

export default class Home extends BaseComponent {
  render() {
    return (
      <div style={{ paddingTop: 24 }}>
        {this.renderTitle('后台管理系统')}
        <h3>后台管理系统</h3>
      </div>
    )
  }
}
