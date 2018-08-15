import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import HomeComponent from '../Components/Home/HomeComponent'

class Index extends React.Component {

  componentDidMount() {
    const store = this.props
    console.log(store.globalReducer)
  }

  render() {
    const store = this.props
    const { location } = this.props
    const { userInfo } = store.globalReducer
    return userInfo.research === true ? <Redirect to={{pathname: '/success', search: location.search}} /> : <HomeComponent />
  }
}

export default withRouter(connect(state => state)(Index))
