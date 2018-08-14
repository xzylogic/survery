import React from 'react'
import { List, InputItem, DatePicker, Radio, Checkbox } from 'antd-mobile'

class Index extends React.Component {
  render() {
    const { question, inputValue, onChange } = this.props
    switch(question.type) {
      case 'input': 
        return question.category === 'basic' ? (
          <React.Fragment>
            <p className='question__title'>{question.title}</p>
            <List style={{background: '#f5f5f9'}}>
              <InputItem
                type={question.inputType || 'text'}
                value={inputValue[question.key]}
                onChange={onChange}
                extra={question.extra}
              ></InputItem>
            </List>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className='question__title'>{question.title}</p>
            <List style={{background: '#f5f5f9'}}>
              <InputItem
                type={question.inputType || 'text'}
                value={inputValue[question.key] && inputValue[question.key][question.id]}
                onChange={onChange}
                extra={question.extra}
              ></InputItem>
            </List>
          </React.Fragment>
        )
      case 'date': 
        return (
          <React.Fragment>
            <p className='question__title'>{question.title}</p>
            <List style={{background: '#f5f5f9'}}>
              <DatePicker
                mode="date"
                title=""
                value={inputValue[question.key] && new Date(inputValue[question.key])}
                onChange={onChange.bind(this, true)}
                minDate={question.minDate || new Date(1850,1,1)}
                maxDate={question.maxDate || new Date()}
                >
                  <List.Item arrow="horizontal">{question.extra}</List.Item>
                </DatePicker>
            </List>
          </React.Fragment>
        )
      case 'selection': 
        return question.category === 'basic' ? (
          <React.Fragment>
            <p className='question__title'>{question.title}</p>
            <List style={{background: '#f5f5f9'}}>
              {
                question.option.map(opt => (
                  <Radio.RadioItem 
                    key={opt.score} 
                    checked={opt.score === inputValue[question.key]} 
                    onClick={onChange.bind(this, opt.score)}
                  >
                    {opt.degree}
                  </Radio.RadioItem>
                ))
              }
            </List>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className='question__title'>{question.title}</p>
            <List style={{background: '#f5f5f9'}}>
              {
                question.option.map(opt => (
                  <Radio.RadioItem 
                    key={opt.score} 
                    checked={opt.score === (inputValue[question.key] && inputValue[question.key][question.id])} 
                    onClick={onChange.bind(this, opt.score)}
                  >
                    {opt.degree}
                  </Radio.RadioItem>
                ))}
            </List>
          </React.Fragment>
        )
      case 'checkbox': 
        return (
          <React.Fragment>
            <p className='question__title'>{question.title}</p>
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
          </React.Fragment>
        )
      default: 
        return ''
    }
  }
}

export default Index
