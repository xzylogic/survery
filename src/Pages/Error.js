import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, WingBlank, WhiteSpace, Icon } from 'antd-mobile'

class Index extends React.Component {

  render() {
    const router = this.props.history
    return (
      <div style={{padding: '.6rem'}}>
        <div style={{color: 'red', textAlign: 'center'}}>
          <Icon type='cross-circle' size='lg' />
        </div>
        <h3 style={{color: 'red', textAlign: 'center', padding: '.3rem', fontSize: '.38rem'}}>页面出错了</h3>
        <WingBlank>
          <WhiteSpace size='lg' />
          <Button type='primary' onClick={() => router.push('/')}>重试</Button>
          <WhiteSpace size='lg' />
        </WingBlank>
      </div>
    )
  }
}

export default withRouter(Index)
