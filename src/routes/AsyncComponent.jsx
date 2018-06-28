import React from 'react'
import Loadable from 'react-loadable'

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
})
