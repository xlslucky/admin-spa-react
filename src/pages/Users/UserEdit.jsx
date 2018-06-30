import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, InputNumber, message } from 'antd'

import BaseComponent from '../../components/BaseComponent'
import PageHeader from '../../components/PageHeader'

@Form.create()
@connect(
  state => ({
    userRes: state.userDetail.response.toJS(),
    userState: state.userDetail,
    userSaveRes: state.userEdit.response.toJS(),
    userSaveState: state.userEdit,
  }),
  dispatch => ({
    getUser: dispatch.userDetail.getUser,
    saveUser: dispatch.userEdit.saveUser,
  })
)
export default class UserEdit extends BaseComponent {
  componentDidMount() {
    const { userId } = this.props.match.params
    if (userId !== 'new') {
      this.props.getUser({ userId })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.whenFetched(prevProps.userSaveState, this.props.userSaveState)
      .then(() => {
        message.success('保存成功')
        this.props.history.go(-1)
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
        const {
          userRes: { data = {} },
        } = this.props
        if (data && data.uid) {
          this.props.saveUser({
            ...data,
            ...values,
          })
        } else {
          this.props.saveUser(values)
        }
      }
    })
  }

  cancel = () => {
    this.props.history.go(-1)
  }

  render() {
    const {
      userRes: { data = {} },
      userSaveState,
    } = this.props
    const { getFieldDecorator } = this.props.form
    const { userId } = this.props.match.params
    const isNew = userId === 'new'

    return (
      <div>
        <PageHeader title="新建/编辑用户" />
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...this.formItemLayout}
            label="Name"
          >
            {getFieldDecorator('name', {
              initialValue: isNew ? '' : data.name,
              rules: [
                { required: true },
              ],
            })(
              <Input placeholder="Input Name" />
            )}
          </Form.Item>
          <Form.Item
            {...this.formItemLayout}
            label="City"
          >
            {getFieldDecorator('city', {
              initialValue: isNew ? '' : data.city,
              rules: [
                { required: true },
              ],
            })(
              <Input placeholder="Input City" />
            )}
          </Form.Item>
          <Form.Item
            {...this.formItemLayout}
            label="Age"
          >
            {getFieldDecorator('age', {
              initialValue: isNew ? 18 : data.age,
              rules: [
                { required: true },
              ],
            })(
              <InputNumber placeholder="Input Age" min={18} max={114} />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 18, offset: 6 },
            }}
          >
            <Button htmlType="submit" type="primary" loading={userSaveState.pending}>保存</Button>
            <Button onClick={this.cancel} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
