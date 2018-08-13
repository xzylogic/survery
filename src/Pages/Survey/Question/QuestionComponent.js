import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, InputItem } from 'antd-mobile'

import './QuestionComponent.css'

import { updateInputValueAction, appendInputValueAction } from '../../../Store/actions/global.action'

const RenderQuestion = (question, inputValue, onChange) => {
  console.log(inputValue[question.key])
  switch (question.type) {
    case 'input': 
      return (
        <React.Fragment>
          <p className='title_header'>{question.title}</p>
          <List style={{background: '#f5f5f9'}}>
            <InputItem
              type={question.inputType || 'text'}
              value={inputValue[question.key]}
              onChange={onChange}
            ></InputItem>
          </List>
        </React.Fragment>
      );
    default: 
      return ''
  }
}

class Index extends React.Component {
  componentDidUpdate(){
    //获取数据
    let getValue = localStorage.getItem('inputValue'+[this.props.id]);
    let inputVal = document.getElementsByTagName("input");
    for(let i=0;i<inputVal.length;i++){
      inputVal[i].checked=false;
      if(inputVal[i].value === getValue){
        inputVal[i].checked=true;
      }
    }
  }

  handleChange = (value) => {
    console.log(value)
    const store = this.props
    const question = this.props.question
    if (question.category === 'basic') {
      store.dispatch(updateInputValueAction(question.key, value))
    }
  }

  render() {
    const { globalReducer } = this.props
    const { inputValue } = globalReducer
    const question = this.props.question
    return (
        <div>
          { question && inputValue ? RenderQuestion(question, inputValue, this.handleChange) : ''}
        </div>
    )
  }
}

export default connect(state => state)(Index)
