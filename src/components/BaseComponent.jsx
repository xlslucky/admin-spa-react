import React from 'react'
import { message } from 'antd'
import { Helmet } from 'react-helmet'

export default class BaseComponent extends React.PureComponent {
  whenFetched = (prevPropState, nextPropState) => new Promise((resolve, reject) => {
    if (prevPropState.pending && !nextPropState.pending) {
      if (nextPropState.error) {
        message.error(nextPropState.error)
        reject(nextPropState.error)
      } else {
        resolve()
      }
    }
  })

  renderTitle(title) {
    return (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    )
  }
}
