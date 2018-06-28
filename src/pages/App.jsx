import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from '../routes'

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        {renderRoutes(routes, { user: 'admin' })}
      </Router>
    )
  }
}
