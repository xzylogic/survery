import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, Toast, Radio, WhiteSpace, Picker } from 'antd-mobile'
import { createForm } from 'rc-form';

import {ifHeartSurgery, ifThoracotomy} from './SurveyData'

const RadioItem = Radio.RadioItem;

class HeartBasicCondition extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props.form;  //getFieldsError

    return (
      <React.Fragment>
        <p className='info_title'>一、心脏科基本情况</p>
        <List>
          <p className='info_content'>病房床位数（单位：张）<span>*</span> </p>
          <InputItem
            {...getFieldProps('wardBedsNumber', {rules: [{required: true, message: '请输入病房床位数'}]})}
            type="text"
            value={inputValue.wardBedsNumber || ''}
            // placeholder="input your phone"
            // error={this.state.hasError}
            // onErrorClick={this.onErrorClick}
            error={isFieldTouched('wardBedsNumber') && getFieldError('wardBedsNumber')}
            onErrorClick={() => Toast.info(getFieldError('wardBedsNumber'))}
            onChange={onChangeHandler.bind(this, 'wardBedsNumber')}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>CCU床位数（单位：张）<span>*</span> </p>
          <InputItem
            {...getFieldProps('CCuBedsNumber', {rules: [{required: true, message: '请输入CCU床位数'}]})}
            type="text"
            value={inputValue.CCuBedsNumber || ''}
            error={isFieldTouched('CCuBedsNumber') && getFieldError('CCuBedsNumber')}
            onErrorClick={() => Toast.info(getFieldError('CCuBedsNumber'))}
            onChange={onChangeHandler.bind(this, 'CCuBedsNumber')}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>医师人数（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps('doctorNumber', {rules: [{required: true, message: '请输入医师人数'}]})}
            type="text"
            value={inputValue.doctorNumber || ''}
            error={isFieldTouched('doctorNumber') && getFieldError('doctorNumber')}
            onErrorClick={() => Toast.info(getFieldError('doctorNumber'))}
            onChange={onChangeHandler.bind(this, 'doctorNumber')}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>护士人数（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps('nurseNumber', {rules: [{required: true, message: '请输入护士人数'}]})}
            type="text"
            value={inputValue.nurseNumber || ''}
            error={isFieldTouched('nurseNumber') && getFieldError('nurseNumber')}
            onErrorClick={() => Toast.info(getFieldError('nurseNumber'))}
            onChange={onChangeHandler.bind(this, 'nurseNumber')}
          />

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

          <WhiteSpace size="lg" />

          {inputValue.ifHeartSurgery === '1' ? (
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

              <WhiteSpace size="lg" />

              <p className='info_title'>二.心导管室硬件情况</p>
            </List>
          ) : ''}
        </List>



      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createForm()(HeartBasicCondition)))
