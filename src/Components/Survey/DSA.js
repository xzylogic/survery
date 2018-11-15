import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, WhiteSpace, Checkbox, Radio } from 'antd-mobile'
import { createForm } from 'rc-form';

import {pipeFlowLevel, otherEquipNumber, ifThoracotomy, flowLevel} from './SurveyData'

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

class HeartPipeHardwareCondition extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props.form;  //getFieldsError

    const DSANumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <React.Fragment>
        <List>
          <p className='info_content'>数字减影血管造影机</p>
          {/*<div>
            <p className='dsa_id'>1</p>
            <p className='dsa_title'>品牌、型号</p>
            <InputItem
              {...getFieldProps(`DSABrandModel`, {rules: [{required: true}]})}
              type="text"
              value={inputValue.DSABrandModel || ''}
              onChange={onChangeHandler.bind(this, `DSABrandModel`)}
            />
            <p className='dsa_title'>安装年月（例：2018.4）</p>
            <InputItem
              {...getFieldProps(`DSAInstallTime`, {rules: [{required: true}]})}
              type="text"
              value={inputValue.DSAInstallTime || ''}
              onChange={onChangeHandler.bind(this, `DSAInstallTime`)}
            />
          </div>*/}
          {DSANumber.map((index) => {
            return (
              <div key={index}>
                <p className='dsa_id'>{index}</p>
                <p className='dsa_title'>品牌、型号</p>
                <InputItem
                  type="text"
                  value={inputValue.DSABrandModel && inputValue.DSABrandModel[index]}
                  onChange={onChangeHandler.bind(this, `DSABrandModel${index}`)}
                />
                <p className='dsa_title'>安装年月（例：2018.4）</p>
                <InputItem
                  type="text"
                  value={inputValue.DSAInstallTime && inputValue.DSAInstallTime[index]}
                  onChange={onChangeHandler.bind(this, `DSAInstallTime${index}`)}
                />
              </div>
            )
          })}

          <WhiteSpace size="lg" />

          <p className='info_content'>其他设备数量<i>（多选）</i> <span>*</span> </p>
          {otherEquipNumber.map((i, index) => (
            <div key={i.value}>
              <CheckboxItem
                // {...getFieldProps('otherEquipNumber', {onChange: () => onChangeHandler('otherEquipNumber', i.value,  'survey', i.value)})}
                // checked={i.value === (inputValue.otherEquipNumber && inputValue.otherEquipNumber[i.value])}
                checked={inputValue.otherEquipNumber && Array.isArray(inputValue.otherEquipNumber) && inputValue.otherEquipNumber.indexOf(i.value) > -1}
                onClick={onChangeHandler.bind(this, 'otherEquipNumber', i.value,  'checkbox')}
              >
                {i.label}
              </CheckboxItem>
              {(inputValue.otherEquipNumber && inputValue.otherEquipNumber[i.value]) === i.value ? (
                <InputItem
                  {...getFieldProps('otherSubject', {onChange: (value) => onChangeHandler('otherSubject', value), rules: [{required: true, message: '请输入其他学科'}]})}
                  type="number"
                  value={inputValue.otherSubject || ''}
                />
              ) : ''}
            </div>
          ))}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室层流级别 <span>*</span> </p>
          {pipeFlowLevel.map(i => (
            <RadioItem
              {...getFieldProps('pipeFlowLevel', {rules: [{required: true, message: '请选择导管室层流级别'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeFlowLevel}
              onChange={onChangeHandler.bind(this, 'pipeFlowLevel', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('pipeFlowLevel') && getFieldError('pipeFlowLevel') ? <p className='surveyError'>{getFieldError('pipeFlowLevel')}</p>:''}

          <WhiteSpace size="lg" />

          {inputValue.pipeFlowLevel === '1' ? (
            <List>
              <p className='info_content'>层流级别 <span>*</span></p>
              {flowLevel.map(i => (
                <RadioItem
                  {...getFieldProps('flowLevel', {rules: [{required: true, message: '请选择层流级别'}]})}
                  key={i.value}
                  checked={i.value === inputValue.flowLevel}
                  onChange={onChangeHandler.bind(this, 'flowLevel', i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}
              {isFieldTouched('flowLevel') && getFieldError('flowLevel') ? <p className='surveyError'>{getFieldError('flowLevel')}</p>:''}

              <WhiteSpace size="lg" />
            </List>
          ) : ''}
        </List>

      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createForm()(HeartPipeHardwareCondition)))
