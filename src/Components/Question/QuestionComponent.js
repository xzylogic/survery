import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 
import { Progress, Toast, Modal } from 'antd-mobile'
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
  state = {
    submit: false
  }

  handleChange = (value, date) => {
    const store = this.props
    const router = this.props.history
    const { question, id } = this.props
    const { userId } = store.globalReducer

    if (value === true && date) {
      value = moment(date).format('YYYY-MM-DD')
    }

    if (question.category === 'basic') {

      question.type === 'checkbox' ?
        store.dispatch(surveyStoreLocalAction('append', question.key, value)) :
        store.dispatch(surveyStoreLocalAction('update', question.key, value))

      question.type === 'selection' && router.push(`/question/${id + 1}${userId ? `?userId=${userId}`: ''}`)
    }

    if (question.category === 'survey') {

      store.dispatch(surveyStoreLocalAction('append', question.key, value, question.id))

      question.type === 'selection' && router.push(`/question/${id + 1}${userId ? `?userId=${userId}`: ''}`)
    }
  }

  handleSubmit = () => {
    console.log('complete')
    const store = this.props
    const router = this.props.history
    const { inputValue, userId, openId } = store.globalReducer
    let submitData = Object.assign({}, inputValue)

    submitData.saq && (submitData.saq = formatData(submitData.saq))
    submitData.sf && (submitData.sf = formatData(submitData.sf))
    submitData.phq && (submitData.phq = formatData(submitData.phq))
    submitData.eq && (submitData.eq = formatData(submitData.eq))

    userId && (submitData.userId = userId)
    openId && (submitData.openId = openId)

    if (userId || openId) {
      store.dispatch(saveSurveyAction(submitData, () => {
        router.push(`/success${userId ? `?userId=${userId}`: ''}`)
      }, error => {
        Toast.info(error)
        this.setState({submit: false})
      }))
    } else {

      Modal.alert('页面出错啦', '点击确定刷新重试', [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '确定', onPress: () => window.location.href = '/survey' },
      ])

    }
  }

  handleClick = (type, event) => {
    event.preventDefault()
    event.stopPropagation()
    const store = this.props
    const { id } = this.props
    const router = this.props.history
    const { userId } = store.globalReducer
    console.log(type)
    switch(type) {
      case 'previous':
        router.push(`/question/${id - 1}${userId ? `?userId=${userId}`: ''}`)
        return false
      case 'next':
        router.push(`/question/${id + 1}${userId ? `?userId=${userId}`: ''}`)
        return false
      case 'submit':
        this.state.submit === false && this.handleSubmit()
        this.setState({submit: true})
        return false
      default:
       return false
    }
  }

  render() {
    const { question, inputValue, ifStart, ifEnd, agree, percent } = this.props
    document.title = agree ? `已完成${percent}%` : '调查知情说明'
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
