import React from 'react'
import Loadable from 'react-loadable'
import CoverPage from '../components/CoverPage'
import qs from 'qs'

import Layout from '../pages/Layout'
import Forbidden from '../pages/Forbidden'

const LoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <CoverPage />
  } else if (error) {
    return <CoverPage type="frown-o">页面加载出错，请重试</CoverPage>
  }
  return null
}

const hasAuth = (myAuths = [], auths = []) => {
  let matched = false
  auths.forEach((auth) => {
    if (myAuths.includes(auth)) {
      matched = true
    }
  })
  return matched
}

export default loader => Loadable({
  loader,
  loading: LoadingComponent,
  render(loaded, props) {
    const Component = loaded.default
    const { public: pub, empty, auth } = props.route
    if (!pub && !props.user) {
      const originalUrl = encodeURIComponent(`${props.location.pathname}${props.location.search}`)
      return window.location.replace(`/login?originalUrl=${originalUrl}`)
    }
    if (empty) {
      return <Component {...props} />
    }
    if (auth && auth.length && !hasAuth(props.auths, auth)) {
      return <Forbidden />
    }

    return <Layout><Component {...props} query={qs.parse(window.location.search.replace(/^\?/, ''))} /></Layout>
  },
})
