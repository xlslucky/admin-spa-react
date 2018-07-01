import React from 'react'

import BaseComponent from '../../components/BaseComponent'

export default class Home extends BaseComponent {
  render() {
    return (
      <div>
        {this.renderTitle('后台管理系统')}

        <h3>Home</h3>
      </div>
    )
  }
}
