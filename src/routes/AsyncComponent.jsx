import React from 'react'
import Loadable from 'react-loadable'

import Layout from '../pages/Layout'

const LoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>loading...</div>
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  }
  return null
}

export default loader => Loadable({
  loader,
  loading: LoadingComponent,
  render(loaded, props) {
    const Component = loaded.default
    const { public: pub, empty } = props.route
    if (!pub && !props.user) {
      const originalUrl = encodeURIComponent(`${props.location.pathname}${props.location.search}`)
      return window.location.replace(`/login?originalUrl=${originalUrl}`)
    }
    if (empty) {
      return <Component {...props} />
    }
    return <Layout><Component {...props} /></Layout>
  },
})
