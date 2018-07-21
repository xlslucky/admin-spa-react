// libs
import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, notification } from 'antd'

// components
import BaseComponent from '../../components/BaseComponent'

// utils
import { saveUser, saveAuth } from '../../utils/user'

import style from './login.css'

const FormItem = Form.Item

@Form.create()
@connect(
  state => ({
    loginRes: state.login.response.toJS(),
    loginState: state.login,
  }),
  dispatch => ({
    login: dispatch.login.request,
  })
)
export default class Login extends BaseComponent {
  componentDidUpdate(prevProps) {
    this.whenFetched(prevProps.loginState, this.props.loginState)
      .then(() => {
        const { data = {}, auths = [] } = this.props.loginRes
        const { query = {} } = this.props
        saveUser(data)
        saveAuth(auths)
        window.location.replace(query.originalUrl || '/')
      })
  }

  componentDidMount() {
    document.body.classList.add(style['login-body'])
  }

  componentWillUnmount() {
    document.body.classList.remove(style['login-body'])
  }

  forget = () => {
    notification.open({
      message: '忘记密码？',
      description: '请联系系统管理员修改密码',
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { pending } = this.props.loginState
    return (
      <div className={style.login}>
        <Form onSubmit={this.handleSubmit} className={style['login-form']}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入登录用户名!' }],
            })(
              <Input
                style={{ height: 40 }}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入登录密码!' }],
            })(
              <Input
                style={{ height: 40 }}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            <a className={style['login-form-forgot']} onClick={this.forget}>忘记密码？</a>
            <Button
              type="primary"
              htmlType="submit"
              className={style['login-form-button']}
              disabled={pending}
              loading={pending}
            >
              登 录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
