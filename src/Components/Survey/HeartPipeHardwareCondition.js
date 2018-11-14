import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, Toast, Radio, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form';

import {pipeBelongDepartment} from './SurveyData'

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
            {...getFieldProps('pipeNumber', {rules: [{required: true, message: '请输入导管室数量'}]})}
            type="number"
            value={inputValue.pipeNumber || ''}
            error={isFieldTouched('pipeNumber') && getFieldError('pipeNumber')}
            onErrorClick={() => Toast.info(getFieldError('pipeNumber'))}
            onChange={onChangeHandler.bind(this, 'pipeNumber')}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>手术区域平均使用面积（单位：平米）<span>*</span> </p>
          <InputItem
            {...getFieldProps('operativeAverageArea', {rules: [{required: true, message: '请输入手术区域平均使用面积'}]})}
            type="number"
            value={inputValue.operativeAverageArea || ''}
            error={isFieldTouched('operativeAverageArea') && getFieldError('operativeAverageArea')}
            onErrorClick={() => Toast.info(getFieldError('operativeAverageArea'))}
            onChange={onChangeHandler.bind(this, 'operativeAverageArea')}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室隶属部门 <span>*</span> </p>
          {pipeBelongDepartment.map(i => (
            <RadioItem
              {...getFieldProps('pipeBelongDepartment', {rules: [{required: true, message: '请选择导管室隶属部门'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeBelongDepartment}
              // error={isFieldTouched('pipeBelongDepartment') && getFieldError('pipeBelongDepartment')}
              // onErrorClick={() => Toast.info(getFieldError('pipeBelongDepartment'))}
              onChange={onChangeHandler.bind(this, 'pipeBelongDepartment', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
        </List>

      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createForm()(HeartPipeHardwareCondition)))
