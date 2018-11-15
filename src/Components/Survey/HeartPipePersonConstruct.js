import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, Checkbox, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form';

import {groupSurgeryDoctorsOperationScope} from './SurveyData'

const CheckboxItem = Checkbox.CheckboxItem;

class HeartPipePersonConstruct extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props.form;  //getFieldsError
    const eachGroupNumberLsit = [
      ['PCI小组', 'PCI_TotalNumber', 'PCI_DoctorNumber', 'PCI_MasterNumber', 'PCI_seniorGradeNumber', 'PCI_mediumGradeNumber', 'PCI_SurgeryDoctorsOperationScope', 'PCI_otherSubject', 'PCI_currentInvolveEmergencySurgeryNumber'],
      ['电生理组人数', 'ELE_TotalNumber', 'ELE_DoctorNumber', 'ELE_MasterNumber', 'ELE_seniorGradeNumber', 'ELE_mediumGradeNumber', 'ELE_SurgeryDoctorsOperationScope', 'ELE_otherSubject', 'ELE_currentInvolveEmergencySurgeryNumber'],
      ['结构性心脏病介入组人数', 'CON_TotalNumber', 'CON_DoctorNumber', 'CON_MasterNumber', 'CON_seniorGradeNumber', 'CON_mediumGradeNumber', 'CON_SurgeryDoctorsOperationScope', 'CON_otherSubject', 'CON_currentInvolveEmergencySurgeryNumber']
    ];

    let eachGroupNumber = eachGroupNumberLsit.map((personValue, index) => {
      return (
        <div key={index}>
          <p className='dsa_id'>{personValue[0]}</p>
          <WhiteSpace size="lg" />

          <p className='info_content'>组内共多少人（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(personValue[1], {onChange: (value) => onChangeHandler(personValue[1], value), rules: [{required: true, message: '请输入组内共多少人'}]})}
            type="number"
            value={inputValue[personValue[1]] || ''}
          />
          {isFieldTouched[personValue[1]] && getFieldError[personValue[1]] ? <p className='surveyError'>{getFieldError[personValue[1]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>组内博士多少人（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(personValue[2], {onChange: (value) => onChangeHandler(personValue[2], value), rules: [{required: true, message: '请输入组内博士多少人'}]})}
            type="number"
            value={inputValue[personValue[2]] || ''}
          />
          {isFieldTouched[personValue[2]] && getFieldError[personValue[2]] ? <p className='surveyError'>{getFieldError[personValue[2]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>组内硕士多少人（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(personValue[3], {onChange: (value) => onChangeHandler(personValue[3], value), rules: [{required: true, message: '请输入组内硕士多少人'}]})}
            type="number"
            value={inputValue[personValue[3]] || ''}
          />
          {isFieldTouched[personValue[3]] && getFieldError[personValue[3]] ? <p className='surveyError'>{getFieldError[personValue[3]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>高级职称多少人？（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(personValue[4], {onChange: (value) => onChangeHandler(personValue[4], value), rules: [{required: true, message: '请输入高级职称多少人'}]})}
            type="number"
            value={inputValue[personValue[4]] || ''}
          />
          {isFieldTouched[personValue[4]] && getFieldError[personValue[4]] ? <p className='surveyError'>{getFieldError[personValue[4]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>中级职称多少人？（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(personValue[5], {onChange: (value) => onChangeHandler(personValue[5], value), rules: [{required: true, message: '请输入中级职称多少人'}]})}
            type="number"
            value={inputValue[personValue[5]] || ''}
          />
          {isFieldTouched[personValue[5]] && getFieldError[personValue[5]] ? <p className='surveyError'>{getFieldError[personValue[5]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>组内手术医师的执业范围<i>（可多选）</i> <span>*</span> </p>
          {groupSurgeryDoctorsOperationScope.map((i, index) => (
            <div key={i.value}>
              <CheckboxItem
                // {...getFieldProps('groupSurgeryDoctorsOperationScope', {onChange: () => onChangeHandler('groupSurgeryDoctorsOperationScope', i.value,  'survey', i.value)})}
                // checked={i.value === (inputValue.groupSurgeryDoctorsOperationScope && inputValue.groupSurgeryDoctorsOperationScope[i.value])}
                checked={inputValue[personValue[6]] && Array.isArray(inputValue[personValue[6]]) && inputValue[personValue[6]].indexOf(i.value) > -1}
                onChange={onChangeHandler.bind(this, personValue[6], i.value,  'checkbox')}
              >
                {i.label}
              </CheckboxItem>
              {(inputValue[personValue[6]] && inputValue[personValue[6]][i.value]) === '3' ? (
                <InputItem
                  {...getFieldProps(personValue[7], {onChange: (value) => onChangeHandler(personValue[7], value), rules: [{required: true, message: '请输入其他学科'}]})}
                  type="number"
                  value={inputValue[personValue[7]] || ''}
                />
              ) : ''}
            </div>
          ))}

          <WhiteSpace size="lg" />

          <p className='info_content'>目前参与急诊手术的人数（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(personValue[8], {onChange: (value) => onChangeHandler(personValue[8], value), rules: [{required: true, message: '请输入中级职称多少人'}]})}
            type="number"
            value={inputValue[personValue[8]] || ''}
          />
          {isFieldTouched[personValue[8]] && getFieldError[personValue[8]] ? <p className='surveyError'>{getFieldError[personValue[8]]}</p>:''}

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
        </div>
      )
    });

    return (
      <React.Fragment>
        <p className='info_title'>三、心导管人员结构</p>
        <List>
          <p className='info_content'>科主任姓名 <span>*</span> </p>
          <InputItem
            {...getFieldProps('directorName', {onChange: (value) => onChangeHandler('directorName', value), rules: [{required: true, message: '请输入科主任姓名'}]})}
            type="text"
            value={inputValue.directorName || ''}
          />
          {isFieldTouched('directorName') && getFieldError('directorName') ? <p className='surveyError'>{getFieldError('directorName')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室主任 <span>*</span> </p>
          <InputItem
            {...getFieldProps('pipeDirector', {onChange: (value) => onChangeHandler('pipeDirector', value), rules: [{required: true, message: '请输入导管室主任'}]})}
            type="text"
            value={inputValue.pipeDirector || ''}
          />
          {isFieldTouched('pipeDirector') && getFieldError('pipeDirector') ? <p className='surveyError'>{getFieldError('pipeDirector')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>联系电话 <span>*</span> </p>
          <InputItem
            {...getFieldProps('phone', {onChange: (value) => onChangeHandler('phone', value), rules: [{required: true, message: '请输入联系电话'}]})}
            type="phone"
            value={inputValue.phone || ''}
          />
          {isFieldTouched('phone') && getFieldError('phone') ? <p className='surveyError'>{getFieldError('phone')}</p>:''}

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <p className='dashed' />

          <p className='info_content'>1.医师总人数(单位：人) <span>*</span> </p>
          <InputItem
            {...getFieldProps('doctorTotalNumber', {onChange: (value) => onChangeHandler('doctorTotalNumber', value), rules: [{required: true, message: '请输入医师总人数'}]})}
            type="number"
            value={inputValue.doctorTotalNumber || ''}
          />
          {isFieldTouched('doctorTotalNumber') && getFieldError('doctorTotalNumber') ? <p className='surveyError'>{getFieldError('doctorTotalNumber')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_id'>以下各组均为可独立手术的医师人数，一人可参与多组手术</p>

          <WhiteSpace size="lg" />

          {eachGroupNumber}

          <WhiteSpace size="lg" />
        </List>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createForm()(HeartPipePersonConstruct)))
