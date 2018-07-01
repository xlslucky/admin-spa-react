// libs
import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

// components
import BaseComponent from '../../components/BaseComponent'

// utils
import { saveUser } from '../../utils/user'

import style from './login.css'

const FormItem = Form.Item

@Form.create()
@connect(
  state => ({
    loginRes: state.login.response.toJS(),
    loginState: state.login,
  }),
  dispatch => ({
    login: dispatch.login.doLogin,
  })
)
export default class Login extends BaseComponent {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null
  // }

  componentDidUpdate(prevProps) {
    this.whenFetched(prevProps.loginState, this.props.loginState)
      .then(() => {
        const { data = {} } = this.props.loginRes
        saveUser(data)
        window.location.replace('/')
      })
  }

  componentDidMount() {
    document.body.classList.add(style['login-body'])
  }

  componentWillUnmount() {
    document.body.classList.remove(style['login-body'])
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
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                style={{ height: 40 }}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                style={{ height: 40 }}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className={style['login-form-forgot']} href="">Forgot password</a>
            <Button
              type="primary"
              htmlType="submit"
              className={style['login-form-button']}
              disabled={pending}
              loading={pending}
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
