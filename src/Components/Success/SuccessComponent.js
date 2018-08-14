import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Progress, WhiteSpace } from 'antd-mobile'

import './SuccessComponent.css'

class Index extends React.Component {
  handleComplete = () => {
    console.log('complete')
  }

  handleValidate = () => {
    console.log('validate')
  }

  render() {
    const { globalReducer } = this.props
    const validate = globalReducer.userInfo && globalReducer.userInfo.validate
    return validate ? (
      <div className='success__container'>
        <Progress percent={100} position='normal' /> 
        <div className='success__image'>
          <img src={`${process.env.PUBLIC_URL}/images/img_complete@3x.png`} alt="调查完成"/>
        </div>
        <p className='success__content'>调查已完成，感谢你的参与。</p>
        <div className='success__buttons'>
          <Button type='primary' onClick={this.handleComplete}>确定</Button>
        </div>
      </div>
    ) : (
      <div className='success__container'>
        <Progress percent={100} position='normal' /> 
        <div className='success__image'>
          <img src={`${process.env.PUBLIC_URL}/images/img_unauth@3x.png`} alt="调查完成"/>
        </div>
        <p className='success__content'>调查已完成，你尚未实名，实名后可查阅全部病史。</p>
        <div className='success__buttons'>
          <Button type='primary' onClick={this.handleValidate}>立即实名</Button>
          <WhiteSpace size='lg' />
          <Button type='ghost' onClick={this.handleComplete}>暂不实名</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(Index))
