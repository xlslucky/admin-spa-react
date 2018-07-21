import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, BackTop, Avatar, Dropdown } from 'antd'

import BaseComponent from '../../components/BaseComponent'

import { getUser, clearUser } from '../../utils/user'

import style from './style.css'

const { Header, Sider, Content } = Layout
const defaultAvatar = 'https://s1.ax1x.com/2018/07/07/PeZcQS.png'

@withRouter
@connect(
  state => ({
    menuRes: state.menu.response.toJS(),
    menuState: state.menu,
  }),
  dispatch => ({
    getMenu: dispatch.menu.getMenu,
  })
)
export default class PageLayout extends BaseComponent {
  state = {
    collapsed: false,
    bodyHeight: 400,
    paths: [],
    openKeys: [],
    menuloaded: false,
    showMenu: false,
  }

  componentDidMount() {
    if (!this.props.menuRes.loaded) {
      this.props.getMenu()
    } else {
      this.setState({ menuloaded: true })
      this.findMappedMenu(this.props.menuRes.data || [])
    }
    this.setState({
      bodyHeight: window.innerHeight - 112,
    })
  }

  componentDidUpdate(prevProps) {
    this.whenFetched(prevProps.menuState, this.props.menuState)
      .then(() => {
        const { data: menu = [] } = this.props.menuRes
        this.findMappedMenu(menu)
        this.setState({ menuloaded: true })
      }, () => {
        this.setState({ menuloaded: true })
      })
  }

  findMappedMenu = (menu) => {
    const { pathname = '/' } = this.props.location

    const mapped = pathname.match(/\/\w*/g)
      .reduce((result, pathnode) => ([...result, `${result[result.length - 1]}${pathnode}`]), [''])
      .slice(1)
    const paths = []
    const opened = []
    menu.reduce((arr, sub) => {
      const contain = mapped.includes(sub.url)
      if (contain) {
        arr.push(`${sub.id}`)
      }
      if (sub.children) {
        const [first] = sub.children.filter(item => mapped.includes(item.url))
        if (first) {
          opened.push(`${sub.id}`)
          arr.push(`${first.id}`)
        }
      }
      return arr
    }, paths)
    this.setState({ paths, openKeys: opened, showMenu: true })
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
        <Menu.Item key={`${menu.id}`}>
          <Link to={menu.url}>
            <Icon type={menu.icon || 'compass'} />
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      )
    }
    return (
      <Menu.Item key={`${menu.id}`}>
        <a>
          <Icon type={menu.icon || 'compass'} />
          <span>{menu.name}</span>
        </a>
      </Menu.Item>
    )
  }

  renderMenu = (menu) => {
    if (menu.children && menu.children.length) {
      return (
        <Menu.SubMenu
          key={`${menu.id}`}
          title={<React.Fragment><Icon type={menu.icon || 'compass'} /><span>{menu.name}</span></React.Fragment>}
        >
          {menu.children.map(this.renderMenuItem)}
        </Menu.SubMenu>
      )
    }

    return this.renderMenuItem(menu)
  }

  render() {
    const { data: menu = [] } = this.props.menuRes
    const user = getUser()
    /* eslint-disable no-console */
    console.log(menu, user)

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={style.logo}>后台管理系统</div>
          {
            this.state.showMenu &&
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={this.state.paths}
              defaultOpenKeys={this.state.openKeys}
            >
              {
                menu.map(this.renderMenu)
              }
            </Menu>
          }
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
                    <Link to="/uc/updatepwd"><Icon type="hdd" /> 修改密码</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={this.doLogout}><Icon type="logout" /> 退出登录</a>
                  </Menu.Item>
                </Menu>
              )}
            >
              <span>
                {user.name}&nbsp;
                <Avatar size="large" src={user.avatar || defaultAvatar} />
              </span>
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
