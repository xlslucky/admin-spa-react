import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spin, Table, Icon, Divider, Modal, message, Button } from 'antd'
import moment from 'moment'

import BaseComponent from '../../components/BaseComponent'
import PageHeader from '../../components/PageHeader'

@connect(
  state => ({
    usersRes: state.users.response.toJS(),
    usersState: state.users,
    userDeleteState: state.userDelete,
  }),
  dispatch => ({
    getUsers: dispatch.users.getUserPage,
    removeUser: dispatch.userDelete.removeUser,
  })
)
export default class Users extends BaseComponent {
  componentDidMount() {
    this.props.getUsers()
  }

  componentDidUpdate(prevProps, prevState) {
    this.whenFetched(prevProps.userDeleteState, this.props.userDeleteState)
      .then(() => {
        message.success('删除成功')
        this.props.getUsers()
      })
  }

  addUser = () => {
    this.props.history.push('/user/edit/new')
  }

  removeUser = user => () => {
    Modal.confirm({
      title: '是否确认删除该用户?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.removeUser({ userId: user.uid })
      },
      onCancel() {},
    })
  }

  columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: (name, user) => <Link to={`/user/${user.uid}`}>{name}</Link>,
  }, {
    title: 'City',
    dataIndex: 'city',
    render: city => <span><Icon type="environment" /> {city}</span>,
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Create Date',
    dataIndex: 'createDate',
    render: date => moment(date).format('YYYY-MM-DD HH:mm'),
  }, {
    title: 'Action',
    key: 'action',
    render: (_, user) => (
      <span>
        <Link to={`/user/edit/${user.uid}`}>Edit</Link>
        <Divider type="vertical" />
        <a onClick={this.removeUser(user)}>Delete</a>
      </span>
    ),
  }];

  render() {
    const {
      usersRes: { list = [] },
      usersState,
    } = this.props
    return (
      <div>
        <PageHeader title="用户列表">
          <Button type="primary" onClick={this.addUser}><Icon type="plus" /> 添加用户</Button>
        </PageHeader>
        <Spin spinning={usersState.pending}>
          <Table
            dataSource={list}
            columns={this.columns}
            pagination={false}
            rowKey="uid"
            bordered
          />
        </Spin>
      </div>
    )
  }
}
