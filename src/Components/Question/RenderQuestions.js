import React from 'react'
import { List, InputItem, DatePicker, Radio, Checkbox, Modal, Toast } from 'antd-mobile'

class Index extends React.Component {
  state = {
    modal: false
  }

  onErrorClick = (question) => {
    if (question.error === true) {
      Toast.info(question.isNull ? question.nullMsg : question.validationMsg)
    }
  }
  
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
                maxLength={question.maxLength || 100}
                error={question.error === true}
                onErrorClick={this.onErrorClick.bind(this, question)}
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
                maxLength={question.maxLength || 100}
                error={question.error === true}
                onErrorClick={this.onErrorClick.bind(this, question)}
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
            <p className='question__title'>
              {question.title}
              {question.extraTitle ? 
                <a onClick={() => this.setState({modal: true})}>
                  <i style={{
                    textDecoration: 'underline', 
                    background: `url(${process.env.PUBLIC_URL}/images/icon_tip@3x.png) no-repeat right center`,
                    backgroundSize: '.45rem',
                    display: 'inline-block',
                    paddingRight: '.6rem'
                    }}
                  >{question.extraTitle}</i>
                </a> : ''}
            </p>
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
            <Modal
              visible={this.state.modal}
              transparent
              maskClosable
              onClose={() => this.setState({modal: false})}
              footer={[{ text: '我知道了', onPress: () => this.setState({modal: false}) }]}
              >
                <div style={{textAlign: 'left', fontSize: '.36rem', color: '#666'}}>
                  <p style={{color: '#333'}}>重度受限</p>
                  <p style={{paddingBottom: '.3rem'}}>由于心绞痛导致不能活动</p>
                  <p style={{color: '#333'}}>中度受限</p>
                  <p style={{paddingBottom: '.3rem'}}>由于心绞痛导致活动减少，甚至放弃</p>
                  <p style={{color: '#333'}}>轻度受限</p>
                  <p style={{paddingBottom: '.3rem'}}>由于心绞痛导致活动出现改变，但不到“中度”的程度</p>
                  <p style={{color: '#333'}}>稍受限</p>
                  <p style={{paddingBottom: '.3rem'}}>有心绞痛，但是活动的量和方式几乎没有改变</p>
                </div>
            </Modal>
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
