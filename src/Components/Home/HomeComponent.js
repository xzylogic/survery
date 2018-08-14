import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd-mobile'

import './HomeComponent.css'

class Index extends React.Component {
  handleImplant = () => {
    const router = this.props.history
    router.push('/question/0')
  }

  handleUnImplant = () => {
    console.log('close')
  }

  render() {
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

export default withRouter(Index)
