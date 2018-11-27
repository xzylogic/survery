import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, WhiteSpace, Checkbox, Radio, Button } from 'antd-mobile'
// import { createForm } from 'rc-form';

import { otherEquipNumber, pipeLevel,level} from './SurveyData'

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

class HeartPipeHardwareCondition extends React.Component {
  state = {
    dsa_id : [1]
  }

  addDsa = () => {
    let id = this.state.dsa_id;
    id.push(id.length + 1);
    this.setState({
      dsa_id: id
    });
    localStorage.setItem('dsa_id', id);
  }

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props;  //getFieldsError

    let dsa_id = localStorage.getItem('dsa_id') && localStorage.getItem('dsa_id').split(',');
    return (
      <React.Fragment>
        <List>
          <p className='info_content'>数字减影血管造影机</p>
          {(dsa_id || this.state.dsa_id).map((index) => {
            return (
              <div key={index}>
                <p className='dsa_id'>{index}</p>
                <p className='dsa_title'>品牌</p>
                <InputItem
                  {...getFieldProps(`dsaBrand${index}`, {onChange: (value) => onChangeHandler('dsaDtos', value, 'survey', `dsaBrand${index}`),
                    initialValue: inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaBrand${index}`]})}
                  type="text"
                  value={inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaBrand${index}`]}
                  // onChange={onChangeHandler.bind(this, 'dsaBrand')}
                />
                <p className='dsa_title'>型号</p>
                <InputItem
                  {...getFieldProps(`dsaModel${index}`, {onChange: (value) => onChangeHandler('dsaDtos', value, 'survey', `dsaModel${index}`),
                    initialValue: inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaModel${index}`]})}
                  type="text"
                  value={inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaModel${index}`]}
                />
                <p className='dsa_title'>安装年月（例：2018.4）</p>
                <InputItem
                  {...getFieldProps(`dsaDate${index}`, {onChange: (value) => onChangeHandler('dsaDtos', value, 'survey', `dsaDate${index}`),
                    initialValue: inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaDate${index}`]})}
                  type="text"
                  value={inputValue['dsaDtos'] && inputValue['dsaDtos'][`dsaDate${index}`]}
                />
              </div>
            )
          })}
          <WhiteSpace size="lg" />
          <Button type='primary' onClick={this.addDsa}>+</Button>

          <WhiteSpace size="lg" />

          <p className='info_content'>其他设备数量<i>（多选）</i> <span>*</span> </p>
          {otherEquipNumber.map((i) => (
            <div key={i.value}>
              <CheckboxItem
                {...getFieldProps('otherEquipNumber', {
                  initialValue: inputValue.otherEquipNumber || '',
                  rules: [{message: '请选择其他设备数量'}]})}
                // checked={i.value === (inputValue.otherEquipNumber && inputValue.otherEquipNumber[i.value])}
                checked={inputValue.otherEquipNumber && Array.isArray(inputValue.otherEquipNumber) && inputValue.otherEquipNumber.indexOf(i.value) > -1}
                onClick={onChangeHandler.bind(this, 'otherEquipNumber', i.value,  'checkbox')}
              >
                {i.label}
              </CheckboxItem>
              {inputValue.otherEquipNumber && inputValue.otherEquipNumber.indexOf(i.value) > -1 ? (
                <div key={i.value}>
                  <InputItem
                    {...getFieldProps(`otherEquipNumber${i.value}`, {onChange: (value) => onChangeHandler(i.value, value),
                      initialValue: inputValue[i.value] || '',
                      // initialValue: inputValue['otherEquipNumberValue'] && inputValue['otherEquipNumberValue'][`otherEquipNumber${i.value}`],
                      rules: [{required: true, message: '请输入其他设备数量'}]})}
                    type="number"
                    placeholder="请输入..."
                    value={inputValue[i.value]}
                  />
                  {getFieldError(`otherEquipNumber${i.value}`) ? <p className='surveyError'>{getFieldError(`otherEquipNumber${i.value}`)}</p>:''}
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
                rules: [{message: '请选择导管室层流级别'}]})}
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
                    rules: [{message: '请选择层流级别'}]})}
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
