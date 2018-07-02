import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import qs from 'query-string'

import routes from '../routes'

@connect(
  state => ({
    user: state.loginUser.user,
  })
)
export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        {renderRoutes(routes, { user: this.props.user, query: qs.parse(window.location.search) })}
      </Router>
    )
  }
}
