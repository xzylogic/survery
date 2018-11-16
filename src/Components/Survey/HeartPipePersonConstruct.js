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
    const nurse_skill_personKindList = [
      ['总护士人数（单位：人）', 'totalNurseNumber', '护士人才架构（单位：人）', 'nurse_juniorDegree', 'nurse_bachelorDegree', 'nurse_masterDegree', 'nurse_doctorDegree', 'nurse_seniorDegree', 'nurse_mediumDegree',
        '隶属学科及人数（可多选）', 'nurse_cardiovascular', 'nurse_cardiac', 'nurse_radiology', 'nurse_otherSubject', 'nurse_option1'],
      ['技术员人数', 'totalSkillNumber', '技术员人才架构（单位：人）', 'skill_juniorDegree', 'skill_bachelorDegree', 'skill_masterDegree', 'skill_doctorDegree', 'skill_seniorDegree', 'skill_mediumDegree',
        '隶属学科及人数（可多选）', 'skill_cardiovascular', 'skill_cardiac', 'skill_radiology', 'skill_otherSubject', 'skill_option1'],
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
    let nurse_skill_person = nurse_skill_personKindList.map((personValue, index) => {
      return (
        <div key={index}>
          <p className='info_content'>{personValue[0]}<span>*</span> </p>
          <InputItem
            {...getFieldProps(personValue[1], {onChange: (value) => onChangeHandler(personValue[1], value), rules: [{required: true, message: '请输入总护士人数'}]})}
            type="number"
            value={inputValue[personValue[1]] || ''}
          />
          {isFieldTouched[personValue[1]] && getFieldError[personValue[1]] ? <p className='surveyError'>{getFieldError[personValue[1]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>{personValue[2]}<span>*</span> </p>
          <p className='dsa_title'>专科</p>
          <InputItem
            {...getFieldProps(personValue[3], {onChange: (value) => onChangeHandler(personValue[3], value), rules: [{required: true, message: '请输入专科人数'}]})}
            type="number"
            value={inputValue[personValue[3]] || ''}
          />
          {isFieldTouched[personValue[3]] && getFieldError[personValue[3]] ? <p className='surveyError'>{getFieldError[personValue[3]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>本科</p>
          <InputItem
            {...getFieldProps(personValue[4], {onChange: (value) => onChangeHandler(personValue[4], value), rules: [{required: true, message: '请输入本科人数'}]})}
            type="number"
            value={inputValue[personValue[4]] || ''}
          />
          {isFieldTouched[personValue[4]] && getFieldError[personValue[4]] ? <p className='surveyError'>{getFieldError[personValue[4]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>硕士</p>
          <InputItem
            {...getFieldProps(personValue[5], {onChange: (value) => onChangeHandler(personValue[5], value), rules: [{required: true, message: '请输入硕士人数'}]})}
            type="number"
            value={inputValue[personValue[5]] || ''}
          />
          {isFieldTouched[personValue[5]] && getFieldError[personValue[5]] ? <p className='surveyError'>{getFieldError[personValue[5]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>博士</p>
          <InputItem
            {...getFieldProps(personValue[6], {onChange: (value) => onChangeHandler(personValue[6], value), rules: [{required: true, message: '请输入博士人数'}]})}
            type="number"
            value={inputValue[personValue[6]] || ''}
          />
          {isFieldTouched[personValue[6]] && getFieldError[personValue[6]] ? <p className='surveyError'>{getFieldError[personValue[6]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>高级职称</p>
          <InputItem
            {...getFieldProps(personValue[7], {onChange: (value) => onChangeHandler(personValue[7], value), rules: [{required: true, message: '请输入高级职称人数'}]})}
            type="number"
            value={inputValue[personValue[7]] || ''}
          />
          {isFieldTouched[personValue[7]] && getFieldError[personValue[7]] ? <p className='surveyError'>{getFieldError[personValue[7]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>中级职称</p>
          <InputItem
            {...getFieldProps(personValue[8], {onChange: (value) => onChangeHandler(personValue[8], value), rules: [{required: true, message: '请输入中级职称人数'}]})}
            type="number"
            value={inputValue[personValue[8]] || ''}
          />
          {isFieldTouched[personValue[8]] && getFieldError[personValue[8]] ? <p className='surveyError'>{getFieldError[personValue[8]]}</p>:''}

          <WhiteSpace size="lg" />


          <p className='info_content'>{personValue[9]}</p>
          <p className='dsa_title'>心血管内科</p>
          <InputItem
            {...getFieldProps(personValue[10], {onChange: (value) => onChangeHandler(personValue[10], value), rules: [{required: true, message: '请输入专科人数'}]})}
            type="number"
            value={inputValue[personValue[10]] || ''}
          />
          {isFieldTouched[personValue[10]] && getFieldError[personValue[10]] ? <p className='surveyError'>{getFieldError[personValue[10]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>心外科</p>
          <InputItem
            {...getFieldProps(personValue[11], {onChange: (value) => onChangeHandler(personValue[11], value), rules: [{required: true, message: '请输入本科人数'}]})}
            type="number"
            value={inputValue[personValue[11]] || ''}
          />
          {isFieldTouched[personValue[11]] && getFieldError[personValue[11]] ? <p className='surveyError'>{getFieldError[personValue[11]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>放射科</p>
          <InputItem
            {...getFieldProps(personValue[12], {onChange: (value) => onChangeHandler(personValue[12], value), rules: [{required: true, message: '请输入硕士人数'}]})}
            type="number"
            value={inputValue[personValue[12]] || ''}
          />
          {isFieldTouched[personValue[12]] && getFieldError[personValue[12]] ? <p className='surveyError'>{getFieldError[personValue[12]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>其他学科：</p>
          <InputItem
            {...getFieldProps(personValue[13], {onChange: (value) => onChangeHandler(personValue[13], value), rules: [{required: true, message: '请输入中级职称人数'}]})}
            type="number"
            value={inputValue[personValue[13]] || ''}
          />
          {isFieldTouched[personValue[13]] && getFieldError[personValue[13]] ? <p className='surveyError'>{getFieldError[personValue[13]]}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>选项1</p>
          <InputItem
            {...getFieldProps(personValue[14], {onChange: (value) => onChangeHandler(personValue[14], value), rules: [{required: true, message: '请输入中级职称人数'}]})}
            type="number"
            value={inputValue[personValue[14]] || ''}
          />
          {isFieldTouched[personValue[14]] && getFieldError[personValue[14]] ? <p className='surveyError'>{getFieldError[personValue[14]]}</p>:''}

          <WhiteSpace size="lg" />
        </div>
      )
    })


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

          {nurse_skill_person}

          {/*<p className='info_content'>总护士人数（单位：人）<span>*</span> </p>
          <InputItem
              {...getFieldProps('totalNurseNumber', {onChange: (value) => onChangeHandler('totalNurseNumber', value), rules: [{required: true, message: '请输入总护士人数'}]})}
            type="number"
            value={inputValue.totalNurseNumber || ''}
          />
          {isFieldTouched('totalNurseNumber') && getFieldError('totalNurseNumber') ? <p className='surveyError'>{getFieldError('totalNurseNumber')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>护士人才架构（单位：人）<span>*</span> </p>
          <p className='dsa_title'>专科</p>
          <InputItem
            {...getFieldProps('nurse_juniorDegree', {onChange: (value) => onChangeHandler('nurse_juniorDegree', value), rules: [{required: true, message: '请输入专科人数'}]})}
            type="number"
            value={inputValue.nurse_juniorDegree || ''}
          />
          {isFieldTouched('nurse_juniorDegree') && getFieldError('nurse_juniorDegree') ? <p className='surveyError'>{getFieldError('nurse_juniorDegree')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>本科</p>
          <InputItem
            {...getFieldProps('nurse_bachelorDegree', {onChange: (value) => onChangeHandler('nurse_bachelorDegree', value), rules: [{required: true, message: '请输入本科人数'}]})}
            type="number"
            value={inputValue.nurse_bachelorDegree || ''}
          />
          {isFieldTouched('nurse_bachelorDegree') && getFieldError('nurse_bachelorDegree') ? <p className='surveyError'>{getFieldError('nurse_bachelorDegree')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>硕士</p>
          <InputItem
            {...getFieldProps('nurse_masterDegree', {onChange: (value) => onChangeHandler('nurse_masterDegree', value), rules: [{required: true, message: '请输入硕士人数'}]})}
            type="number"
            value={inputValue.nurse_masterDegree || ''}
          />
          {isFieldTouched('nurse_masterDegree') && getFieldError('nurse_masterDegree') ? <p className='surveyError'>{getFieldError('nurse_masterDegree')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>博士</p>
          <InputItem
            {...getFieldProps('nurse_doctorDegree', {onChange: (value) => onChangeHandler('nurse_doctorDegree', value), rules: [{required: true, message: '请输入博士人数'}]})}
            type="number"
            value={inputValue.nurse_doctorDegree || ''}
          />
          {isFieldTouched('nurse_doctorDegree') && getFieldError('nurse_doctorDegree') ? <p className='surveyError'>{getFieldError('nurse_doctorDegree')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>高级职称</p>
          <InputItem
            {...getFieldProps('nurse_seniorDegree', {onChange: (value) => onChangeHandler('nurse_seniorDegree', value), rules: [{required: true, message: '请输入高级职称人数'}]})}
            type="number"
            value={inputValue.nurse_seniorDegree || ''}
          />
          {isFieldTouched('nurse_seniorDegree') && getFieldError('nurse_seniorDegree') ? <p className='surveyError'>{getFieldError('nurse_seniorDegree')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>中级职称</p>
          <InputItem
            {...getFieldProps('nurse_mediumDegree', {onChange: (value) => onChangeHandler('nurse_mediumDegree', value), rules: [{required: true, message: '请输入中级职称人数'}]})}
            type="number"
            value={inputValue.nurse_mediumDegree || ''}
          />
          {isFieldTouched('nurse_mediumDegree') && getFieldError('nurse_mediumDegree') ? <p className='surveyError'>{getFieldError('nurse_mediumDegree')}</p>:''}

          <WhiteSpace size="lg" />



          <p className='info_content'>隶属学科及人数（可多选）</p>
          <p className='dsa_title'>心血管内科</p>
          <InputItem
            {...getFieldProps('belong_cardiovascular', {onChange: (value) => onChangeHandler('belong_cardiovascular', value), rules: [{required: true, message: '请输入专科人数'}]})}
            type="number"
            value={inputValue.belong_cardiovascular || ''}
          />
          {isFieldTouched('belong_cardiovascular') && getFieldError('belong_cardiovascular') ? <p className='surveyError'>{getFieldError('belong_cardiovascular')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>心外科</p>
          <InputItem
            {...getFieldProps('belong_cardiac', {onChange: (value) => onChangeHandler('belong_cardiac', value), rules: [{required: true, message: '请输入本科人数'}]})}
            type="number"
            value={inputValue.belong_cardiac || ''}
          />
          {isFieldTouched('belong_cardiac') && getFieldError('belong_cardiac') ? <p className='surveyError'>{getFieldError('belong_cardiac')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>放射科</p>
          <InputItem
            {...getFieldProps('belong_radiology', {onChange: (value) => onChangeHandler('belong_radiology', value), rules: [{required: true, message: '请输入硕士人数'}]})}
            type="number"
            value={inputValue.belong_radiology || ''}
          />
          {isFieldTouched('belong_radiology') && getFieldError('belong_radiology') ? <p className='surveyError'>{getFieldError('belong_radiology')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>其他学科：</p>
          <InputItem
            {...getFieldProps('belong_otherSubject', {onChange: (value) => onChangeHandler('belong_otherSubject', value), rules: [{required: true, message: '请输入中级职称人数'}]})}
            type="number"
            value={inputValue.belong_otherSubject || ''}
          />
          {isFieldTouched('belong_otherSubject') && getFieldError('belong_otherSubject') ? <p className='surveyError'>{getFieldError('belong_otherSubject')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>选项1</p>
          <InputItem
            {...getFieldProps('belong_option1', {onChange: (value) => onChangeHandler('belong_option1', value), rules: [{required: true, message: '请输入中级职称人数'}]})}
            type="number"
            value={inputValue.belong_option1 || ''}
          />
          {isFieldTouched('belong_option1') && getFieldError('belong_option1') ? <p className='surveyError'>{getFieldError('belong_option1')}</p>:''}

          <WhiteSpace size="lg" />*/}

        </List>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createForm()(HeartPipePersonConstruct)))
