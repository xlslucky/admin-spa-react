// libs
import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

// components
import BaseComponent from '../../../components/BaseComponent'
import PageHeader from '../../../components/PageHeader'

import style from './style.css'

const Title = '菜单设置'

const SortableItem = SortableElement(({ children }) =>
  <li className={style['menu-item']}>
    {children}
  </li>
)

const SortableList = SortableContainer(({ items, className, renderItem }) => (
  <ul className={className}>
    {items.map((data, index) => (
      <SortableItem key={`item-${index}`} index={index}>
        {renderItem(data)}
      </SortableItem>
    ))}
  </ul>
))

@connect(
  state => ({
    menuRes: state.menu.response.toJS(),
  }),
  dispatch => ({
    getMenu: dispatch.menu.getMenu,
  })
)
export default class MenuSetting extends BaseComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.moved) {
      return {
        menu: nextProps.menuRes.data || [],
      }
    }
    return null
  }

  state = {
    menu: [],
    moved: false,
  }

  componentDidMount() {
    this.props.getMenu()
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      moved: true,
      menu: arrayMove(this.state.menu, oldIndex, newIndex),
    }, this.forceUpdate)
  }

  onChildrenSortEnd = menu => () => {

  }

  render() {
    const { menu } = this.state
    return (
      <div>
        {this.renderTitle(Title)}
        <PageHeader title={Title} />

        <SortableList
          items={menu}
          className={style['menu-setting']}
          onSortEnd={this.onSortEnd}
          renderItem={menu => (
            <React.Fragment>
              <div className={style['menu-item-detail']}>
                <Icon type="down" className={style.toggle} />
                <Icon type={menu.icon || 'compass'} />
                <span className={style['menu-name']}>{menu.name}</span>
                <span className={style['menu-url']}>{menu.url}</span>
                <span className={style.operate}>
                  <Icon type="plus" />
                  <Icon type="edit" />
                  <Icon type="delete" />
                </span>
              </div>

              <SortableList
                items={menu.children || []}
                className={style['menu-items']}
                onSortEnd={this.onChildrenSortEnd(menu)}
                renderItem={item => (
                  <React.Fragment>
                    <div className={style['menu-item-detail']}>
                      <Icon type={item.icon || 'compass'} />
                      <span className={style['menu-name']}>{item.name}</span>
                      <span className={style['menu-url']}>{item.url}</span>
                      <span className={style.operate}>
                        <Icon type="edit" />
                        <Icon type="delete" />
                      </span>
                    </div>
                  </React.Fragment>
                )}
              />
            </React.Fragment>
          )}
        />
      </div>
    )
  }
}
