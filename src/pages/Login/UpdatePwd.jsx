import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, message } from 'antd'

import BaseComponent from '../../components/BaseComponent'
import PageHeader from '../../components/PageHeader'

import { saveUser } from '../../utils/user'

const Title = '修改密码'

@Form.create()
@connect(
  state => ({
    requestRes: state.updatePwd.response.toJS(),
    requestState: state.updatePwd,
  }),
  dispatch => ({
    updatePwd: dispatch.updatePwd.updatePwd,
    resetPwd: dispatch.updatePwd.resetPwd,
  })
)
export default class UpdatePwd extends BaseComponent {
  componentDidUpdate(prevProps, prevState) {
    this.whenFetched(prevProps.requestState, this.props.requestState)
      .then(() => {
        const { data = {} } = this.props.requestRes
        saveUser(data)
        this.props.resetPwd()
        message.success('修改密码成功')
        this.props.history.go(-1)
      }, () => {
        this.props.resetPwd()
      })
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
  };

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { newPwd, confirmPwd } = values
        if (newPwd !== confirmPwd) {
          message.error('两次密码输入不一致')
          return
        }
        this.props.updatePwd(values)
      }
    })
  }

  cancel = () => {
    this.props.history.go(-1)
  }

  render() {
    const {
      requestState,
    } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        {this.renderTitle(Title)}
        <PageHeader title={Title} />
        <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
          <Form.Item
            {...this.formItemLayout}
            label="原密码"
          >
            {getFieldDecorator('oldPwd', {
              rules: [
                { required: true, message: '请输入原密码' },
              ],
            })(
              <Input type="password" placeholder="请输入原密码" />
            )}
          </Form.Item>
          <Form.Item
            {...this.formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('newPwd', {
              rules: [
                { required: true, message: '请输入新密码' },
              ],
            })(
              <Input type="password" placeholder="请输入新密码" />
            )}
          </Form.Item>
          <Form.Item
            {...this.formItemLayout}
            label="确认新密码"
          >
            {getFieldDecorator('confirmPwd', {
              rules: [
                { required: true, message: '请再次输入新密码' },
              ],
            })(
              <Input type="password" placeholder="请再次输入新密码" />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 18, offset: 6 },
            }}
          >
            <Button htmlType="submit" type="primary" loading={requestState.pending}>保存</Button>
            <Button onClick={this.cancel} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
