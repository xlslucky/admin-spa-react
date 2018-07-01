import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Alert, Button, Input, Spin } from 'antd'

import BaseComponent from '../../components/BaseComponent'
import PageHeader from '../../components/PageHeader'

@connect(
  state => ({
    userResp: state.githubUser.response.toJS(),
    userPayload: state.githubUser.payload.toJS(),
    userState: state.githubUser,
    reposResp: state.githubRepos.response.toJS(),
    reposState: state.githubRepos,
  }),
  dispatch => ({
    getUser: dispatch.githubUser.getUser,
    resetUser: dispatch.githubUser.resetUser,
    getRepos: dispatch.githubRepos.getRepos,
    resetRepos: dispatch.githubRepos.resetRepos,
  })
)
export default class Github extends BaseComponent {
  searchUser = (userId) => {
    this.props.getUser({ userId })
  }

  searchRepos = (project) => {
    const { userId } = this.props.userPayload

    this.props.getRepos({
      owner: userId,
      project,
    })
  }

  render() {
    const {
      userResp: { data: user },
      reposResp: { data: repos },
      userState,
      reposState,
    } = this.props
    return (
      <div>
        {this.renderTitle('Github')}
        <PageHeader title="Github" />
        <Row gutter={20} style={{ width: 600 }}>
          <Col span={12}>
            <h3>
              Select Github User &nbsp;
              <Button size="small" onClick={this.props.resetUser}>Reset</Button>
            </h3>
            <Input.Search
              style={{ marginBottom: 20 }}
              placeholder="Input User Id"
              onSearch={this.searchUser}
            />

            <Spin spinning={userState.pending}>
              {
                user ? (
                  <Card
                    cover={<img alt={user.name} src={user.avatar_url} />}
                  >
                    <Card.Meta
                      title={user.name}
                      description={<a href={user.blog}>{user.blog}</a>}
                    />
                  </Card>
                ) : <Alert type={userState.error ? 'error' : 'info'} message={userState.error || 'Input User Id.'} />
              }
            </Spin>
          </Col>
          <Col span={12}>
            <h3>
              Select Current User Repos &nbsp;
              <Button size="small" onClick={this.props.resetRepos}>Reset</Button>
            </h3>
            <Input.Search
              style={{ marginBottom: 20 }}
              placeholder="Input Repos"
              onSearch={this.searchRepos}
            />

            <Spin spinning={reposState.pending}>
              {
                repos ? (
                  <div>{repos.description}</div>
                ) : <Alert type={reposState.error ? 'error' : 'info'} message={reposState.error || 'Input User Id.'} />
              }
            </Spin>
          </Col>
        </Row>
      </div>
    )
  }
}
