// libs
import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'

// components
import BaseComponent from '../../../components/BaseComponent'
import PageHeader from '../../../components/PageHeader'

import style from './style.css'

const Title = '菜单设置'

@connect(
  state => ({
    menuRes: state.menu.response.toJS(),
  }),
  dispatch => ({
    getMenu: dispatch.menu.getMenu,
  })
)
export default class MenuSetting extends BaseComponent {
  componentDidMount() {
    this.props.getMenu()
  }

  renderMenu = (menu) => {
    const { children = [], name, url, icon } = menu
    return (
      <li className={style['menu-group']} key={menu.id}>
        <div className={style['menu-item-detail']}>
          <Icon type="down" className={style.toggle} />
          <Icon type={icon || 'compass'} />
          <span className={style['menu-name']}>{name}</span>
          <span className={style['menu-url']}>{url}</span>
        </div>

        <ul className={style['menu-items']}>
          {
            children.map(item => (
              <li className={style['menu-item']} key={item.id}>
                <div className={style['menu-item-detail']}>
                  <Icon type={item.icon || 'compass'} />
                  <span className={style['menu-name']}>{item.name}</span>
                  <span className={style['menu-url']}>{item.url}</span>
                </div>
              </li>
            ))
          }
        </ul>
      </li>
    )
  }

  render() {
    const { data: menu = [] } = this.props.menuRes
    return (
      <div>
        {this.renderTitle(Title)}
        <PageHeader title={Title} />

        <ul className={style['menu-setting']}>
          {menu.map(this.renderMenu)}
        </ul>
      </div>
    )
  }
}
