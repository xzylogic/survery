import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SuccessComponent from '../Components/Success/SuccessComponent'

import { loadJsSDKAction } from '../Store/actions/global.action'

class Index extends React.Component {
  componentWillMount() {
    const store = this.props
    store.dispatch(loadJsSDKAction())
  }

  render() {
    return <SuccessComponent />
  }
}

export default withRouter(connect(state => state)(Index))
