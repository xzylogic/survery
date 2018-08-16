import React from 'react'
import { Button } from 'antd-mobile'

class Index extends React.Component {
  render() {
    const { type, ifStart, ifEnd, onClick, disabled } = this.props
    if (type === 'selection' && !ifStart) {
      return (
        <Button type='ghost' onClick={onClick.bind(this, 'previous')}>上一题</Button>
      )
    } else if (type !== 'selection' && ifStart) {
      return (
        <Button type='primary' onClick={onClick.bind(this, 'next')} disabled={disabled}>下一题</Button>
      )
    } else if (type !== 'selection' && !ifStart) {
      return (
        <React.Fragment>
          <Button 
            type='ghost' 
            className='question__botton'
            onClick={onClick.bind(this, 'previous')}
          >上一题</Button>
          <Button 
            type='primary' 
            className='question__botton'
            onClick={onClick.bind(this, ifEnd ? 'submit' : 'next')}
            disabled={disabled}
          >{ ifEnd ? '完成' : '下一题'}</Button>
        </React.Fragment>
      )
    }
  }
}

export default Index
