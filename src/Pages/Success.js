import React from 'react'

import SuccessComponent from '../Components/Success/SuccessComponent'

class Index extends React.Component {
  componentWillMount() {
    document.title = '已完成100%'
  }

  render() {
    return <SuccessComponent />
  }
}

export default Index
