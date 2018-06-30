import React from 'react'
import { message } from 'antd'

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
}
