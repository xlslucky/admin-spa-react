import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import qs from 'qs'

import routes from '../routes'
import { getAuth } from '../utils/user'

@connect(
  state => ({
    user: state.loginUser.user,
  })
)
export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        {
          renderRoutes(routes, {
            user: this.props.user,
            query: qs.parse(window.location.search.replace(/^\?/, '')),
            auths: getAuth(),
          })
        }
      </Router>
    )
  }
}
