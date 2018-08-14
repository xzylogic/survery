import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 
import { Progress } from 'antd-mobile'
import * as moment from 'moment'

import './QuestionComponent.css'

import RenderAgreement from './RenderAgreement'
import RenderButtons from './RenderButtons'
import RenderQuestions from './RenderQuestions'
import { surveyStoreLocalAction, saveSurveyAction } from '../../Store/actions/global.action'

const formatData = (data) => {
  let keys = Object.keys(data)
  let arr = []
  keys.forEach(key => {
    arr.push({
      id: key,
      score: data[key]
    })
  })
 return  arr
}

class Index extends React.Component {
  handleChange = (value, date) => {
    const store = this.props
    const router = this.props.history
    const { question, id } = this.props

    if (value === true && date) {
      value = moment(date).format('YYYY-MM-DD')
    }

    if (question.category === 'basic') {

      question.type === 'checkbox' ?
        store.dispatch(surveyStoreLocalAction('append', question.key, value)) :
        store.dispatch(surveyStoreLocalAction('update', question.key, value))

      question.type === 'selection' && router.push(`/question/${id + 1}`)
    }

    if (question.category === 'survey') {

      store.dispatch(surveyStoreLocalAction('append', question.key, value, question.id))

      question.type === 'selection' && router.push(`/question/${id + 1}`)
    }
  }

  handleSubmit = () => {
    console.log('complete')
    const store = this.props
    const { inputValue } = store.globalReducer
    let submitData = Object.assign({}, inputValue)

    submitData.saq && (submitData.saq = formatData(submitData.saq))
    submitData.sf && (submitData.sf = formatData(submitData.sf))
    submitData.phq && (submitData.phq = formatData(submitData.phq))
    submitData.eq && (submitData.eq = formatData(submitData.eq))

    submitData.userId = '2419'
    store.dispatch(saveSurveyAction(submitData))
  }

  handleClick = (type) => {
    const { id } = this.props
    const router = this.props.history
    switch(type) {
      case 'previous':
        router.push(`/question/${id - 1}`)
        return
      case 'next':
        router.push(`/question/${id + 1}`)
        return
      case 'submit':
        this.handleSubmit()
        return
      default:
       return
    }
  }

  render() {
    const { question, inputValue, ifStart, ifEnd, agree, percent } = this.props
    return agree ? (
      <div className='question__container'>
        <Progress percent={percent} position='normal'/>
        <RenderQuestions
          question={question} 
          inputValue={inputValue}
          onChange={this.handleChange}
          onClicK={this.handleClick}
        />
        <div className='question__bottons'>
          <RenderButtons type={question.type} ifStart={ifStart} ifEnd={ifEnd} onClick={this.handleClick} />
        </div>
      </div>
    ) : (
      <RenderAgreement />
    )
  }
}

export default withRouter(connect(state => state)(Index))
