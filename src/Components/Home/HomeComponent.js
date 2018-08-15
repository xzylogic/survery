import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd-mobile'

import './HomeComponent.css'

class Index extends React.Component {
  handleImplant = () => {
    const store = this.props
    const router = this.props.history
    const { userId } = store.globalReducer
    router.push(`/question/0${userId ? `?userId=${userId}`: ''}`)
  }

  handleUnImplant = () => {
    console.log('close')
  }

  render() {
    document.title = "问卷调查"
    return (
      <div className='home__container'>
        <p className='home__title'>本次调查<br/>仅针对曾植入过心脏支架的用户</p>
        <div className='home__button'>
          <Button type='primary' onClick={this.handleImplant}>已植入</Button>
        </div>
        <div className='home__button'>
          <Button type='ghost' onClick={this.handleUnImplant}>未植入</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(Index))
