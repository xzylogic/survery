import React from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import { Button } from 'antd-mobile'

import './SurveyComponent.css'
import BasicInformation from './BasicInformation'
// import { GetBrowserType } from '../../Utilities'

class Index extends React.Component {

  componentDidMount() {
    document.title = "调查表";
  }

  render() {
    return (
      <div>
        <div className='survey'>
          <h3 className='survey_title'>调查表</h3>
          <div style={{position: 'relative'}}>
            <p
              className='survey_container'>申明：遵照上海市卫计委的指示和要求，现对全市开展心脏介入治疗的机构（包括民营、部队医院）进行调研。调查表的内容涉及硬件设施、人员结构、工作开展等情况，同时听取基层人员的意见和建议，最终形成调研报告。调查表内容不纳入考核指标，不批评，不公开，其中医疗机构名称或个人信息将不会出现在报告中。</p>
            <img src={`${process.env.PUBLIC_URL}/images/WechatIMG8.png`} alt="印章"/>
            <p className='survey_noUnit'>填写数字时请直接填写数量，<span>不用填写计量单位</span></p>
          </div>
          <BasicInformation />
        </div>
        <div className='survey_logo'>
          <img src={`${process.env.PUBLIC_URL}/images/WechatIMG5.jpeg`} alt="调查表logo"/>
          <p className='survey_support'>本问卷由全程心管家提供支持</p>
        </div>
      </div>
    )
  }
}

// export default withRouter(connect(state => state)(Index))
export default Index
