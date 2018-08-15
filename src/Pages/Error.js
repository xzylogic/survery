import React from 'react'
import { connect } from 'react-redux'

class Index extends React.Component {

  render() {
    return (
      <div>
        error page
      </div>
    )
  }
}

export default connect(state => state)(Index)
