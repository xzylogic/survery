import React from 'react'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import { Button } from 'antd-mobile'

import './SurveyComponent.css'
import BasicInformation from './BasicInformation'
import {loadQuestionsAction} from "../../Store/actions/survey.action";
// import { GetBrowserType } from '../../Utilities'

class Index extends React.Component {

  componentDidMount() {
    document.title = "2018年上海市心血管介入治疗数据统计";
    const store = this.props;
    const { questions } = store.globalReducer;
    if (Array.isArray(questions) && questions.length === 0) {
      store.dispatch(loadQuestionsAction())
    }
  }

  render() {
    const { questions, inputValue } = this.props.globalReducer;
    
    return (
      <React.Fragment>
        <div className='survey'>
          <h3 className='survey_title'>2018年上海市心血管介入治疗数据统计</h3>
          <div style={{position: 'relative'}}>
            <p
              className='survey_container'>根据国家心血管介入质控中心、上海市卫计委、上海市卫生监督所的要求，请心脏科负责人填写“2018年上海（经皮）心血管介入治疗”数据，截至1月16日完成。</p>
            <img src={`${process.env.PUBLIC_URL}/images/WechatIMG8.png`} alt="印章"/>
            <p className='survey_noUnit'>填写数字时请直接填写数量，<span>不用填写计量单位（不能有空格，否者无法提交）</span></p>
          </div>
          {questions ? <BasicInformation questions={questions} inputValue={inputValue}/> : ''}
        </div>
        <div className='survey_logo'>
          <img src={`${process.env.PUBLIC_URL}/images/WechatIMG5.jpeg`} alt="调查表logo"/>
          <p className='survey_support'>本问卷由全程心管家提供支持</p>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Index)
