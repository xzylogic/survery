import React from 'react'
import { connect } from 'react-redux'

import HomeComponent from '../Components/Home/HomeComponent'

class Index extends React.Component {
  componentWillMount() {
    document.title = "问卷调查"
  }

  render() {
    return <HomeComponent />
  }
}

export default connect(state => state)(Index)
