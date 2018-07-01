import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, BackTop, Avatar, Dropdown } from 'antd'

import { getUser, clearUser } from '../../utils/user'

import style from './style.css'

const { Header, Sider, Content } = Layout

@connect(
  state => ({
    menuRes: state.menu.response.toJS(),
  }),
  dispatch => ({
    getMenu: dispatch.menu.getMenu,
  })
)
export default class PageLayout extends React.PureComponent {
  state = {
    collapsed: false,
    bodyHeight: 400,
  }

  componentDidMount() {
    this.props.getMenu()
    this.setState({
      bodyHeight: window.innerHeight - 112,
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  doLogout = () => {
    clearUser()
    window.location.replace('/login')
  }

  renderMenuItem(menu) {
    if (menu.url) {
      return (
        <Menu.Item key={menu.name}>
          <Link to={menu.url}>
            <Icon type={menu.icon || 'compass'} />
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      )
    }
    return (
      <Menu.Item key={menu.name}>
        <Icon type={menu.icon || 'compass'} />
        <span>{menu.name}</span>
      </Menu.Item>
    )
  }

  renderMenu = (menu) => {
    if (menu.children && menu.children.length) {
      return (
        <Menu.SubMenu
          key={menu.name}
          title={<span><Icon type="mail" />{menu.name}</span>}
        >
          {menu.children.map(this.renderMenuItem)}
        </Menu.SubMenu>
      )
    }

    return this.renderMenuItem(menu)
  }

  render() {
    const { data: menu = [] } = this.props.menuRes
    const [first = {}] = menu
    const user = getUser()

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={style.logo}>后台管理系统</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[first.name]}>
            {
              menu.map(this.renderMenu)
            }
          </Menu>
        </Sider>
        <Layout>
          <Header className={style.headerbar}>
            <Icon
              className={style.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <Dropdown
              placement="bottomRight"
              overlay={(
                <Menu>
                  <Menu.Item>
                    <a onClick={this.doLogout}><Icon type="logout" /> Log out</a>
                  </Menu.Item>
                </Menu>
              )}
            >
              <Avatar size="large" src={user.avatar} />
            </Dropdown>
          </Header>
          <Content className={style['page-content']} style={{ minHeight: this.state.bodyHeight }}>
            {this.props.children}
          </Content>
        </Layout>
        <BackTop />
      </Layout>
    )
  }
}
