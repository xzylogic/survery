import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {List, InputItem, Radio, WhiteSpace} from 'antd-mobile'
// import { createForm } from 'rc-form';

import {ifHeartSurgery, ifThoracotomy} from './SurveyData'

const RadioItem = Radio.RadioItem;

class HeartBasicCondition extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props;  //getFieldsError

    return (
      <React.Fragment>
        <p className='info_title'>一、心脏科基本情况</p>
        <List>
          <p className='info_content'>病房床位数（单位：张）<span>*</span> </p>
          <InputItem
            {...getFieldProps('wardBedsNumber', {onChange: (value) => onChangeHandler('wardBedsNumber', value),
              initialValue: inputValue.wardBedsNumber || '',
              rules: [{required: true, message: '请输入病房床位数'}]})}
            type="number"
            value={inputValue.wardBedsNumber || ''}
          />
          {isFieldTouched('wardBedsNumber') && getFieldError('wardBedsNumber') ? <p className='surveyError'>{getFieldError('wardBedsNumber')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>CCU床位数（单位：张）<span>*</span> </p>
          <InputItem
            {...getFieldProps('CCUBedsNumber', {onChange: (value) => onChangeHandler('CCUBedsNumber', value),
              initialValue: inputValue.CCUBedsNumber || '',
              rules: [{required: true, message: '请输入CCU床位数'}]})}
            type="number"
            value={inputValue.CCUBedsNumber || ''}
          />
          {isFieldTouched('CCUBedsNumber') && getFieldError('CCUBedsNumber') ? <p className='surveyError'>{getFieldError('CCUBedsNumber')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>医师人数（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps('doctorNumber', {onChange: (value) => onChangeHandler('doctorNumber', value),
              initialValue: inputValue.doctorNumber || '',
              rules: [{required: true, message: '请输入医师人数'}]})}
            type="number"
            value={inputValue.doctorNumber || ''}
          />
          {isFieldTouched('doctorNumber') && getFieldError('doctorNumber') ? <p className='surveyError'>{getFieldError('doctorNumber')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>护士人数（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps('nurseNumber', {onChange: (value) => onChangeHandler('nurseNumber', value),
              initialValue: inputValue.nurseNumber || '',
              rules: [{required: true, message: '请输入护士人数'}]})}
            type="number"
            value={inputValue.nurseNumber || ''}
          />
          {isFieldTouched('nurseNumber') && getFieldError('nurseNumber') ? <p className='surveyError'>{getFieldError('nurseNumber')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>是否有心外科 <span>*</span> </p>
          {ifHeartSurgery.map(i => (
            <RadioItem
              {...getFieldProps('ifHeartSurgery', {rules: [{required: true, message: '请选择是否有心外科'}]})}
              key={i.value}
              checked={i.value === inputValue.ifHeartSurgery}
              // error={isFieldTouched('ifHeartSurgery') && getFieldError('ifHeartSurgery')}
              // onErrorClick={() => Toast.info(getFieldError('ifHeartSurgery'))}
              onChange={onChangeHandler.bind(this, 'ifHeartSurgery', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('ifHeartSurgery') && getFieldError('ifHeartSurgery') ? <p className='surveyError'>{getFieldError('ifHeartSurgery')}</p>:''}

          <WhiteSpace size="lg" />

          {inputValue.ifHeartSurgery === '有' ? (
            <List>
              <p className='info_content'>是否开展过开胸手术？<span>*</span></p>
              {ifThoracotomy.map(i => (
                <RadioItem
                  {...getFieldProps('ifThoracotomy', {rules: [{required: true, message: '请选择是否有心外科'}]})}
                  key={i.value}
                  checked={i.value === inputValue.ifThoracotomy}
                  // error={isFieldTouched('ifThoracotomy') && getFieldError('ifThoracotomy')}
                  // onErrorClick={() => Toast.info(getFieldError('ifThoracotomy'))}
                  onChange={onChangeHandler.bind(this, 'ifThoracotomy', i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}
              {isFieldTouched('ifThoracotomy') && getFieldError('ifThoracotomy') ? <p className='surveyError'>{getFieldError('ifThoracotomy')}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_title'>二.心导管室硬件情况</p>
            </List>
          ) : ''}
        </List>

      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(HeartBasicCondition))
