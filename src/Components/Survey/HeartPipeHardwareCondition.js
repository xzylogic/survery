import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, Radio, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form';

import {pipeBelongDepartment, pipeHospitalLocation} from './SurveyData'

const RadioItem = Radio.RadioItem;

class HeartPipeHardwareCondition extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props.form;  //getFieldsError

    return (
      <React.Fragment>
        <List>

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室数量（单位：间）<span>*</span> </p>
          <InputItem
            {...getFieldProps('pipeNumber', {onChange: (value) => onChangeHandler('pipeNumber', value), rules: [{required: true, message: '请输入导管室数量'}]})}
            type="number"
            value={inputValue.pipeNumber || ''}
          />
          {isFieldTouched('pipeNumber') && getFieldError('pipeNumber') ? <p className='surveyError'>{getFieldError('pipeNumber')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>手术区域平均使用面积（单位：平米）<span>*</span> </p>
          <InputItem
            {...getFieldProps('operativeAverageArea', {onChange: (value) => onChangeHandler('operativeAverageArea', value), rules: [{required: true, message: '请输入手术区域平均使用面积'}]})}
            type="number"
            value={inputValue.operativeAverageArea || ''}
          />
          {isFieldTouched('operativeAverageArea') && getFieldError('operativeAverageArea') ? <p className='surveyError'>{getFieldError('operativeAverageArea')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室隶属部门 <span>*</span> </p>
          {pipeBelongDepartment.map(i => (
            <RadioItem
              {...getFieldProps('pipeBelongDepartment', {rules: [{required: true, message: '请选择导管室隶属部门'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeBelongDepartment}
              onChange={onChangeHandler.bind(this, 'pipeBelongDepartment', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('pipeBelongDepartment') && getFieldError('pipeBelongDepartment') ? <p className='surveyError'>{getFieldError('pipeBelongDepartment')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室在医院内的地理位置 <span>*</span> </p>
          {pipeHospitalLocation.map(i => (
            <RadioItem
              {...getFieldProps('pipeHospitalLocation', {rules: [{required: true, message: '请选择导管室隶属部门'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeHospitalLocation}
              // error={isFieldTouched('pipeHospitalLocation') && getFieldError('pipeHospitalLocation')}
              // onErrorClick={() => Toast.info(getFieldError('pipeHospitalLocation'))}
              onChange={onChangeHandler.bind(this, 'pipeHospitalLocation', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('pipeHospitalLocation') && getFieldError('pipeHospitalLocation') ? <p className='surveyError'>{getFieldError('pipeHospitalLocation')}</p>:''}

          <WhiteSpace size="lg" />
        </List>

      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createForm()(HeartPipeHardwareCondition)))
