import React from 'react'

export default props => (
  <header className="page-header">
    <h3>{props.title}</h3>

    <div className="page-operate">
      {props.children}
    </div>
  </header>
)
