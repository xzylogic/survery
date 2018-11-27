import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, Radio, WhiteSpace } from 'antd-mobile'
// import { createForm } from 'rc-form';

import {pipeDepartment, pipeLocation} from './SurveyData'

const RadioItem = Radio.RadioItem;

class HeartPipeHardwareCondition extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props;  //getFieldsError

    return (
      <React.Fragment>
        <List>

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室数量（单位：间）<span>*</span> </p>
          <InputItem
            {...getFieldProps('pipeNum', {onChange: (value) => onChangeHandler('pipeNum', value), initialValue: inputValue.pipeNum || '', rules: [{required: true, message: '请输入导管室数量'}]})}
            type="number"
            value={inputValue.pipeNum || ''}
          />
          {getFieldError('pipeNum') ? <p className='surveyError'>{getFieldError('pipeNum')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>手术区域平均使用面积（单位：平米）<span>*</span> </p>
          <InputItem
            {...getFieldProps('averageArea', {onChange: (value) => onChangeHandler('averageArea', value), initialValue: inputValue.averageArea || '', rules: [{required: true, message: '请输入手术区域平均使用面积'}]})}
            type="number"
            value={inputValue.averageArea || ''}
          />
          {getFieldError('averageArea') ? <p className='surveyError'>{getFieldError('averageArea')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室隶属部门 <span>*</span> </p>
          {pipeDepartment.map(i => (
            <div key={i.value}>
              <RadioItem
                {...getFieldProps('pipeDepartment', {
                  initialValue: inputValue.pipeDepartment || '',
                  rules: [{message: '请选择导管室隶属部门'}]})}
                key={i.value}
                checked={i.value === inputValue.pipeDepartment}
                onChange={onChangeHandler.bind(this, 'pipeDepartment', i.value)}
              >
                {i.label}
              </RadioItem>

              {inputValue.pipeDepartment && i.value === '其他科室' && inputValue['pipeDepartment'].indexOf(i.value) > -1 ? (
                <div>
                  <InputItem
                    {...getFieldProps('pipeBelongDepartment_other', {onChange: (value) => onChangeHandler('pipeBelongDepartment_other', value),
                      initialValue: inputValue.pipeBelongDepartment_other || '',
                      rules: [{required: true, message: '请输入其他科室'}]})}
                    type="text"
                    placeholder='请输入...'
                    value={inputValue.pipeBelongDepartment_other || ''}
                  />
                  {getFieldError('pipeBelongDepartment_other') ? <p className='surveyError'>{getFieldError('pipeBelongDepartment_other')}</p>:''}

                  <WhiteSpace size="lg" />
                </div>
              ) : ''}
            </div>
          ))}
          {isFieldTouched('pipeDepartment') && getFieldError('pipeDepartment') ? <p className='surveyError'>{getFieldError('pipeDepartment')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室在医院内的地理位置 <span>*</span> </p>
          {pipeLocation.map(i => (
            <RadioItem
              {...getFieldProps('pipeLocation', {
                initialValue: inputValue.pipeLocation || '',
                rules: [{message: '请选择导管室隶属部门'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeLocation}
              // error={isFieldTouched('pipeLocation') && getFieldError('pipeLocation')}
              // onErrorClick={() => Toast.info(getFieldError('pipeLocation'))}
              onChange={onChangeHandler.bind(this, 'pipeLocation', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('pipeLocation') && getFieldError('pipeLocation') ? <p className='surveyError'>{getFieldError('pipeLocation')}</p>:''}

          <WhiteSpace size="lg" />
        </List>

      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(HeartPipeHardwareCondition))
