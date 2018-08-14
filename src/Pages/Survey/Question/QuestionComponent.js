import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { List, InputItem, Radio, DatePicker, Button, Checkbox } from 'antd-mobile'
import * as moment from 'moment'

import './QuestionComponent.css'

import { surveyStoreLocalAction } from '../../../Store/actions/global.action'

const RenderNextButton = (type, id, onPush) => {
  if (type === 'selection') {
    return (
      <Button type='ghost' onClick={onPush.bind(this, `/querys/${id - 1}`)}>上一题</Button>
    )
  } else if (type !== 'selection' && id === 0) {
    return (
      <Button type='primary' onClick={onPush.bind(this, `/querys/${id + 1}`)}>下一题</Button>
    )
  } else if (type !== 'selection' && id !== 0 ) {
    return (
      <div>
        <Button type='ghost' style={{width: '47%', float: 'left'}} onClick={onPush.bind(this, `/querys/${id - 1}`)}>上一题</Button>
        <Button type='primary' style={{width: '47%', float: 'right'}} onClick={onPush.bind(this, `/querys/${id + 1}`)}>下一题</Button>
      </div>
    )
  }
}

const RenderQuestion = ({question, inputValue, onChange, id, onPush}) => {
  switch (question.type) {
    case 'input': 
      return question.category === 'basic' ? (
        <React.Fragment>
          <p className='title_header'>{question.title}</p>
          <List style={{background: '#f5f5f9'}}>
            <InputItem
              type={question.inputType || 'text'}
              value={inputValue[question.key]}
              onChange={onChange}
              extra={question.extra}
            ></InputItem>
          </List>
          <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: '.44rem', height: '1.82rem'}}> 
            {RenderNextButton(question.type, id, onPush)}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className='title_header'>{question.title}</p>
          <List style={{background: '#f5f5f9'}}>
            <InputItem
              type={question.inputType || 'text'}
              value={inputValue[question.key] && inputValue[question.key][question.id]}
              onChange={onChange}
              extra={question.extra}
            ></InputItem>
          </List>
          <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: '.44rem', height: '1.82rem'}}> 
            {RenderNextButton(question.type, id, onPush)}
          </div>
        </React.Fragment>
      );
    case 'date': 
      return (
        <React.Fragment>
          <p className='title_header'>{question.title}</p>
          <List style={{background: '#f5f5f9'}}>
            <DatePicker
              mode="date"
              title=""
              value={inputValue[question.key] && new Date(inputValue[question.key])}
              onChange={onChange.bind(this, true)}
              minDate={question.minDate || new Date(1850,1,1)}
              maxDate={question.maxDate || new Date()}
              >
                <List.Item arrow="horizontal">出生年月</List.Item>
              </DatePicker>
          </List>
          <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: '.44rem', height: '1.82rem'}}> 
            {RenderNextButton(question.type, id, onPush)}
          </div>
        </React.Fragment>
      );
    case 'selection': 
      return question.category === 'basic' ? (
          <React.Fragment>
            <p className='title_header'>{question.title}</p>
            <List style={{background: '#f5f5f9'}}>
              {question.option.map(opt => (
                <Radio.RadioItem 
                  key={opt.score} 
                  checked={opt.score === inputValue[question.key]} 
                  onClick={onChange.bind(this, opt.score)}
                >
                  {opt.degree}
                </Radio.RadioItem>
              ))}
            </List>
            <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: '.44rem', height: '1.82rem'}}> 
              {RenderNextButton(question.type, id, onPush)}
            </div>
          </React.Fragment>) : (
          <React.Fragment>
            <p className='title_header'>{question.title}</p>
            <List style={{background: '#f5f5f9'}}>
              {question.option.map(opt => (
                <Radio.RadioItem 
                  key={opt.score} 
                  checked={opt.score === (inputValue[question.key] && inputValue[question.key][question.id])} 
                  onClick={onChange.bind(this, opt.score)}
                >
                  {opt.degree}
                </Radio.RadioItem>
              ))}
            </List>
            <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: '.44rem', height: '1.82rem'}}> 
              {RenderNextButton(question.type, id, onPush)}
            </div>
          </React.Fragment>)
    case 'checkbox': 
      return (
        <React.Fragment>
          <p className='title_header'>{question.title}</p>
          <List style={{background: '#f5f5f9'}}>
            {question.option.map(opt => {return (
              <Checkbox.CheckboxItem 
                key={opt.score} 
                onClick={onChange.bind(this, opt.score)} 
                checked={inputValue[question.key] && Array.isArray(inputValue[question.key]) && inputValue[question.key].indexOf(opt.score) > -1}
              >
                {opt.degree}
              </Checkbox.CheckboxItem>
            )})}
          </List>
          <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: '.44rem', height: '1.82rem'}}> 
            {RenderNextButton(question.type, id, onPush)}
          </div>
        </React.Fragment>
      );
    default: 
      return ''
  }
}

class Index extends React.Component {
  componentWillMount(){
    const store = this.props
    const question = this.props.question
    const userInfo = this.props.userInfo
    console.log(userInfo.validate)
    if(userInfo.validate){
      if(question.key === "name"){
        store.dispatch(surveyStoreLocalAction('update', question.key, userInfo.name))
      }
      if(question.key === "birthday"){
        store.dispatch(surveyStoreLocalAction('update', question.key, userInfo.birthday))
      }
      if(question.key === "sex"){
        store.dispatch(surveyStoreLocalAction('update', question.key, userInfo.sex))
      }
    }
  }
  handleChange = (value, date) => {
    const store = this.props
    const question = this.props.question
    // const userInfo = this.props.userInfo
    const id = this.props.id
    if (value === true && date) {
      value = moment(date).format('YYYY-MM-DD')
    }
    if (question.category === 'basic') {
      if (question.type === 'checkbox') {
        store.dispatch(surveyStoreLocalAction('append', question.key, value))
      } else {
        store.dispatch(surveyStoreLocalAction('update', question.key, value))
        // if(userInfo.validate){
        //   if(question.key === "name"){
        //     store.dispatch(surveyStoreLocalAction('update', question.key, userInfo.name))
        //   }
        //   if(question.key === "birthday"){
        //     store.dispatch(surveyStoreLocalAction('update', question.key, userInfo.birthday))
        //   }
        //   if(question.key === "sex"){
        //     store.dispatch(surveyStoreLocalAction('update', question.key, userInfo.sex))
        //   }
        // }
      }
      if (question.type === 'selection') {
        this.props.history.push(`/querys/${id + 1}`)
      }
    }
    if (question.category === 'survey') {
      store.dispatch(surveyStoreLocalAction('append', question.key, value, question.id))
      if (question.type === 'selection') {
        this.props.history.push(`/querys/${id + 1}`)
      }
    }
  }

  handlePush = (router) => {
    this.props.history.push(router)
  }

  render() {
    const { globalReducer } = this.props
    const { inputValue } = globalReducer
    const question = this.props.question
    const userInfo = this.props.userInfo
    const id = this.props.id
    return (
        <div>
          { question && inputValue ? 
              <RenderQuestion
                userInfo={userInfo}
                question={question} 
                id={id}
                inputValue={inputValue}
                onChange={this.handleChange}
                onPush={this.handlePush}
              /> : ''}
        </div>
    )
  }
}

export default withRouter(connect(state => state)(Index))
