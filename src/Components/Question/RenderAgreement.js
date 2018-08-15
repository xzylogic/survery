import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd-mobile'

import { submitAgreementAction } from '../../Store/actions/global.action'
import { GetBrowserType } from '../../Utilities'

class Index extends React.Component {
  handleAgree = () => {
    const store = this.props
    store.dispatch(submitAgreementAction())
  }

  handleReject = () => {
    console.log('reject')
    switch(GetBrowserType()) {
      case 'wechat': 
        window.wx.closeWindow()
        return
      case 'app':
        window.location.href = 'patientpci://patient/main'
        return
      default:
        return
    }
  }

  render() {
    return (
      <div className='agree__container'>
        <p className="agree__content">
          此次调查主要目的是了解冠心病支架术后人群的生活质量特征，探讨处于术后不同病程阶段的生活质量变化趋势。在调查过程中，我们将严格遵守保护个人的私密信息，任何文章或调查研究结果中，不会出现姓名、住院号等个人信息，也严禁任何人公开或是用于商业行为。
        </p>
        <p className="agree__content">
          调查表一人一卷，以现场问卷方式和网络填写为主，取得填表人同意后，住院期间收回纸质问卷，电子问卷直接进入数据库留存。
        </p>
        <div className='agree__extra'>
          <p><strong>调查单位:</strong></p>
          <p>上海交通大学医学院附属瑞金医院 心脏科</p>
          <p>上海交通大学医学院 公共卫生学院</p>
        </div>
        <div className='agree__buttons'>
          <Button type='ghost' className='agree__button' onClick={this.handleReject}>拒绝</Button>
          <Button type='primary' className='agree__button' onClick={this.handleAgree}>同意</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(Index))
