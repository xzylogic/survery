import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, WhiteSpace, Checkbox, Radio } from 'antd-mobile'
// import { createForm } from 'rc-form';

import { otherEquipNumber, pipeLevel,level} from './SurveyData'

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

class HeartPipeHardwareCondition extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props;  //getFieldsError

    const DSANumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
      <React.Fragment>
        <List>
          <p className='info_content'>数字减影血管造影机</p>
          {/*<div>*/}
            {/*<p className='dsa_id'>1</p>*/}
            {/*<p className='dsa_title'>品牌、型号</p>*/}
            {/*<InputItem*/}
              {/*{...getFieldProps(`DSABrandModel1`)}*/}
              {/*type="text"*/}
              {/*value={inputValue.DSABrandModel1 || ''}*/}
              {/*onChange={onChangeHandler.bind(this, `DSABrandModel1`)}*/}
            {/*/>*/}
            {/*<p className='dsa_title'>安装年月（例：2018.4）</p>*/}
            {/*<InputItem*/}
              {/*{...getFieldProps(`DSAInstallTime1`)}*/}
              {/*type="text"*/}
              {/*value={inputValue.DSAInstallTime1 || ''}*/}
              {/*onChange={onChangeHandler.bind(this, `DSAInstallTime1`)}*/}
            {/*/>*/}
          {/*</div>*/}
          {DSANumber.map((index) => {
            return (
              <div key={index}>
                <p className='dsa_id'>{index}</p>
                <p className='dsa_title'>品牌、型号</p>
                <InputItem
                  {...getFieldProps(`dsaName${index}`, {onChange: (value) => onChangeHandler('dsaDtos', value, 'survey', `dsaName${index}`),
                    initialValue: inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaName${index}`]})}
                  type="text"
                  value={inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaName${index}`]}
                  // onChange={onChangeHandler.bind(this, 'dsaName')}
                />
                <p className='dsa_title'>安装年月（例：2018.4）</p>
                <InputItem
                  {...getFieldProps(`dsaDate${index}`, {onChange: (value) => onChangeHandler('dsaDtos', value, 'survey', `dsaDate${index}`),
                    initialValue: inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaDate${index}`]})}
                  type="text"
                  value={inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaDate${index}`]}
                  // onChange={onChangeHandler.bind(this, 'dsaDate')}
                />
              </div>
            )
          })}

          <WhiteSpace size="lg" />

          <p className='info_content'>其他设备数量<i>（多选）</i> <span>*</span> </p>
          {otherEquipNumber.map((i) => (
            <div key={i.value}>
              <CheckboxItem
                {...getFieldProps('otherEquipNumber', {
                  initialValue: inputValue.otherEquipNumber || '',
                  rules: [{required: true, message: '请选择其他设备数量'}]})}
                // checked={i.value === (inputValue.otherEquipNumber && inputValue.otherEquipNumber[i.value])}
                checked={inputValue.otherEquipNumber && Array.isArray(inputValue.otherEquipNumber) && inputValue.otherEquipNumber.indexOf(i.value) > -1}
                onClick={onChangeHandler.bind(this, 'otherEquipNumber', i.value,  'checkbox')}
              >
                {i.label}
              </CheckboxItem>
              {inputValue.otherEquipNumber && inputValue.otherEquipNumber.indexOf(i.value) > -1 ? (
                <div key={i.value}>
                  <InputItem
                    {...getFieldProps(`otherEquipNumber${i.value}`, {onChange: (value) => onChangeHandler('otherEquipNumberValue', value, 'survey', `otherEquipNumber${i.value}`),
                      initialValue: inputValue['otherEquipNumberValue'] && inputValue['otherEquipNumberValue'][`otherEquipNumber${i.value}`],
                      rules: [{required: true, message: '请输入其他设备数量'}]})}
                    type="number"
                    value={inputValue['otherEquipNumberValue'] && inputValue['otherEquipNumberValue'][`otherEquipNumber${i.value}`]}
                  />
                  {isFieldTouched(`otherEquipNumber${i.value}`) && getFieldError(`otherEquipNumber${i.value}`) ? <p className='surveyError'>{getFieldError(`otherEquipNumber${i.value}`)}</p>:''}
                </div>
              ) : ''}
            </div>
          ))}
          {isFieldTouched('otherEquipNumber') && getFieldError('otherEquipNumber') ? <p className='surveyError'>{getFieldError('otherEquipNumber')}</p>:''}

          {/*<p className='info_content'>其他设备数量<i>（多选）</i> <span>*</span> </p>*/}
          {/*{otherEquipNumber.map(i => (*/}
            {/*<div key={i.value}>*/}
              {/*<CheckboxItem*/}
                {/*// {...getFieldProps('otherEquipNumber', {onChange: () => onChangeHandler('otherEquipNumber', i.value,  'survey', i.value)})}*/}
                {/*// checked={i.value === (inputValue.otherEquipNumber && inputValue.otherEquipNumber[i.value])}  //  (typeof inputValue['otherEquipNumber'] === "object")*/}
                {/*checked={inputValue.otherEquipNumber && inputValue['otherEquipNumber'][i.value]}*/}
                {/*onClick={onChangeHandler.bind(this, 'otherEquipNumber', i.value, 'survey', i.value)}*/}
              {/*>*/}
                {/*{i.label}*/}
              {/*</CheckboxItem>*/}
              {/*{*/}
                {/*Object.keys(inputValue['otherEquipNumber']).forEach(key => {*/}
                  {/*return key === i.value ? (*/}
                    {/*<div>*/}
                      {/*{console.log('true')}*/}
                      {/*<InputItem*/}
                        {/*{...getFieldProps(`otherEquipNumber${i.value}`, {onChange: (value) => onChangeHandler('otherEquipNumber', value, 'survey', i.value), rules: [{required: true, message: '请输入其他设备数量'}]})}*/}
                        {/*type="number"*/}
                        {/*value={inputValue['otherEquipNumber'] && inputValue['otherEquipNumber'][i.value]}*/}
                      {/*/>*/}
                      {/*{isFieldTouched(`otherEquipNumber${i.value}`) && getFieldError(`otherEquipNumber${i.value}`) ? <p className='surveyError'>{getFieldError(`otherEquipNumber${i.value}`)}</p>:''}*/}
                    {/*</div>*/}
                  {/*) : ''*/}
                {/*})*/}
              {/*}*/}
            {/*</div>*/}
          {/*))}*/}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室层流级别 <span>*</span> </p>
          {pipeLevel.map(i => (
            <RadioItem
              {...getFieldProps('pipeLevel', {
                initialValue: inputValue.pipeLevel || '',
                rules: [{required: true, message: '请选择导管室层流级别'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeLevel}
              onChange={onChangeHandler.bind(this, 'pipeLevel', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('pipeLevel') && getFieldError('pipeLevel') ? <p className='surveyError'>{getFieldError('pipeLevel')}</p>:''}

          <WhiteSpace size="lg" />

          {inputValue.pipeLevel === '有' ? (
            <List>
              <p className='info_content'>层流级别 <span>*</span></p>
              {level.map(i => (
                <RadioItem
                  {...getFieldProps('level', {
                    initialValue: inputValue.level || '',
                    rules: [{required: true, message: '请选择层流级别'}]})}
                  key={i.value}
                  checked={i.value === inputValue.level}
                  onChange={onChangeHandler.bind(this, 'level', i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}
              {isFieldTouched('level') && getFieldError('level') ? <p className='surveyError'>{getFieldError('level')}</p>:''}

              <WhiteSpace size="lg" />
            </List>
          ) : ''}
        </List>

      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(HeartPipeHardwareCondition))
