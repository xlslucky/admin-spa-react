import React from 'react'

import BaseComponent from '../../../components/BaseComponent'
import PageHeader from '../../../components/PageHeader'

const Title = '菜单设置'

export default class MenuSetting extends BaseComponent {
  render() {
    return (
      <div>
        {this.renderTitle(Title)}
        <PageHeader title={Title} />
      </div>
    )
  }
}
