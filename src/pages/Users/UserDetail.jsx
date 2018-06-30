import React from 'react'
import { connect } from 'react-redux'
import { Spin, Form, Icon, Button } from 'antd'
import moment from 'moment'

import BaseComponent from '../../components/BaseComponent'
import PageHeader from '../../components/PageHeader'

@connect(
  state => ({
    userRes: state.userDetail.response.toJS(),
    userState: state.userDetail,
  }),
  dispatch => ({
    getUser: dispatch.userDetail.getUser,
  })
)
export default class UserDetail extends BaseComponent {
  componentDidMount() {
    const { userId } = this.props.match.params
    this.props.getUser({ userId })
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  edit = () => {
    const {
      userRes: { data = {} },
    } = this.props

    this.props.history.push(`/user/edit/${data.uid}`)
  }

  render() {
    const {
      userRes: { data = {} },
      userState,
    } = this.props
    return (
      <div>
        <PageHeader title="用户详情" />
        <Spin spinning={userState.pending}>
          <Form>
            <Form.Item
              {...this.formItemLayout}
              label="Name"
            >
              {data.name}
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="City"
            >
              <Icon type="environment" /> {data.city}
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="Age"
            >
              {data.age}
            </Form.Item>
            <Form.Item
              {...this.formItemLayout}
              label="Create Date"
            >
              {moment(data.createDate).format('YYYY-MM-DD HH:mm')}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 18, offset: 6 },
              }}
            >
              <Button type="primary" onClick={this.edit}>编辑</Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    )
  }
}
