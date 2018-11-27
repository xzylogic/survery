import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, Checkbox, WhiteSpace } from 'antd-mobile'
// import { createForm } from 'rc-form';

import {groupSurgeryDoctorsOperationScope} from './SurveyData'

const CheckboxItem = Checkbox.CheckboxItem;

class HeartPipePersonConstruct extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError } = this.props;  //getFieldsError, isFieldTouched
    const eachGroupNumberLsit = [
      ['PCI小组', 'totalNum', 'doctorNum', 'masterNum', 'seniorNum', 'mediumNum', 'canSelect', 'otherSubject', 'surgeryNum', 'pciDto'],
      ['电生理组人数', 'totalNum', 'doctorNum', 'masterNum', 'seniorNum', 'mediumNum', 'canSelect', 'otherSubject', 'surgeryNum', 'esDto'],
      ['结构性心脏病介入组人数', 'totalNum', 'doctorNum', 'masterNum', 'seniorNum', 'mediumNum', 'canSelect', 'otherSubject', 'surgeryNum', 'shdDto']
    ];
    const nurse_skill_personKindList = [
      ['总护士人数（单位：人）', 'totalNum', '护士人才架构（单位：人）', 'juniorNum', 'bachelorNum', 'masterNum', 'doctorNum', 'seniorNum', 'mediumNum',
        '隶属学科及人数（可多选）', 'cmNum', 'casNum', 'rdNum', 'otherName', 'otherNum', 'nurseDto'],
      ['技术员人数', 'totalNum', '技术员人才架构（单位：人）', 'juniorNum', 'bachelorNum', 'masterNum', 'doctorNum', 'seniorNum', 'mediumNum',
        '隶属学科及人数（可多选）', 'cmNum', 'casNum', 'rdNum', 'otherName', 'otherNum', 'techDto'],
    ];

    let eachGroupNumber = eachGroupNumberLsit.map((personValue, index) => {
      return (
        <div key={index}>
          <p className='dsa_id'>{personValue[0]}</p>
          <WhiteSpace size="lg" />

          <p className='info_content'>组内共多少人（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(`${personValue[1]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[1]),
              initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[1]],
              rules: [{required: true, message: '请输入组内共多少人'}]})}
            type="number"
            value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[1]]}
          />
          {getFieldError(`${personValue[1]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[1]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>组内博士多少人（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(`${personValue[2]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[2]),
              initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[2]],
              rules: [{required: true, message: '请输入组内博士多少人'}]})}
            type="number"
            value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[2]]}
          />
          {getFieldError(`${personValue[2]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[2]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>组内硕士多少人（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(`${personValue[3]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[3]),
              initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[3]],
              rules: [{required: true, message: '请输入组内硕士多少人'}]})}
            type="number"
            value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[3]]}
          />
          {getFieldError(`${personValue[3]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[3]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>高级职称多少人？（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(`${personValue[4]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[4]),
              initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[4]],
              rules: [{required: true, message: '请输入高级职称多少人'}]})}
            type="number"
            value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[4]]}
          />
          {getFieldError(`${personValue[4]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[4]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>中级职称多少人？（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(`${personValue[5]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[5]),
              initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[5]],
              rules: [{required: true, message: '请输入中级职称多少人'}]})}
            type="number"
            value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[5]]}
          />
          {getFieldError(`${personValue[5]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[5]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>组内手术医师的执业范围<i>（可多选）</i> <span>*</span> </p>
          {groupSurgeryDoctorsOperationScope.map(i => (
            <div key={i.value}>
              <CheckboxItem
                {...getFieldProps(`${personValue[6]}${index}`, {
                  initialValue: inputValue[`${personValue[6]}${index}`] || ''})}
                // checked={i.value === (inputValue.groupSurgeryDoctorsOperationScope && inputValue.groupSurgeryDoctorsOperationScope[i.value])}
                checked={inputValue[`${personValue[6]}${index}`] && Array.isArray(inputValue[`${personValue[6]}${index}`]) && inputValue[`${personValue[6]}${index}`].indexOf(i.value) > -1}
                onChange={onChangeHandler.bind(this, `${personValue[6]}${index}`, i.value,  'checkbox')}
              >
                {i.label}
              </CheckboxItem>
              {/*{console.log(personValue[6], '++++++++++++++',inputValue[personValue[6]])}*/}
              {inputValue[`${personValue[6]}${index}`] && i.value === '其他学科' && inputValue[`${personValue[6]}${index}`].indexOf(i.value) > -1 ? (
                <div>
                  <InputItem
                    {...getFieldProps(`${personValue[7]}${index}`, {onChange: (value) => onChangeHandler(`${personValue[7]}${index}`, value),
                      initialValue: inputValue[`${personValue[7]}${index}`] || '',
                      rules: [{required: true, message: '请输入其他学科'}]})}
                    type="text"
                    placeholder='请输入...'
                    value={inputValue[`${personValue[7]}${index}`] || ''}
                  />
                  {getFieldError(`${personValue[7]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[7]}${index}`)}</p>:''}
                </div>
              ) : ''}
            </div>
          ))}
          {getFieldError(`${personValue[6]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[6]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>目前参与急诊手术的人数（单位：人）<span>*</span> </p>
          <InputItem
            {...getFieldProps(`${personValue[8]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[8]),
              initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[8]],
              rules: [{required: true, message: '请输入目前参与急诊手术的人数'}]})}
            type="number"
            value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[8]]}
          />
          {getFieldError(`${personValue[8]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[8]}${index}`)}</p>:''}

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
            {...getFieldProps(`ns_${personValue[1]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[1]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[1]],
              rules: [{required: true, message: '请输入总护士人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[1]]}
          />
          {getFieldError(`ns_${personValue[1]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[1]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>{personValue[2]}<span>*</span> </p>
          <p className='dsa_title'>专科</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[3]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[3]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[3]],
              rules: [{required: true, message: '请输入专科人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[3]]}
          />
          {getFieldError(`ns_${personValue[3]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[3]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>本科</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[4]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[4]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[4]],
              rules: [{required: true, message: '请输入本科人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[4]]}
          />
          {getFieldError(`ns_${personValue[4]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[4]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>硕士</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[5]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[5]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[5]],
              rules: [{required: true, message: '请输入硕士人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[5]]}
          />
          {getFieldError(`ns_${personValue[5]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[5]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>博士</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[6]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[6]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[6]],
              rules: [{required: true, message: '请输入博士人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[6]]}
          />
          {getFieldError(`ns_${personValue[6]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[6]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>高级职称</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[7]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[7]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[7]],
              rules: [{required: true, message: '请输入高级职称人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[7]]}
          />
          {getFieldError(`ns_${personValue[7]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[7]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>中级职称</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[8]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[8]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[8]],
              rules: [{required: true, message: '请输入中级职称人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[8]]}
          />
          {getFieldError(`ns_${personValue[8]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[8]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />


          <p className='info_content'>{personValue[9]}</p>
          <p className='dsa_title'>心血管内科</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[10]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[10]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[10]],
              rules: [{required: true, message: '请输入专科人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[10]]}
          />
          {getFieldError(`ns_${personValue[10]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[10]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>心外科</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[11]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[11]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[11]],
              rules: [{required: true, message: '请输入本科人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[11]]}
          />
          {getFieldError(`ns_${personValue[11]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[11]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>放射科</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[12]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[12]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[12]],
              rules: [{required: true, message: '请输入硕士人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[12]]}
          />
          {getFieldError(`ns_${personValue[12]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[12]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          <p className='dsa_title'>其他学科：</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[13]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[13]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[13]],
              rules: [{required: true, message: '请输入其他学科'}]})}
            type="text"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[13]]}
          />
          {getFieldError(`ns_${personValue[13]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[13]}${index}`)}</p>:''}

          <p className='dsa_title'>（人数）</p>
          <InputItem
            {...getFieldProps(`ns_${personValue[14]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[14]),
              initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[14]],
              rules: [{required: true, message: '请输入其他学科的人数'}]})}
            type="number"
            value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[14]]}
          />
          {getFieldError(`ns_${personValue[14]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[14]}${index}`)}</p>:''}

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
            {...getFieldProps('directorName', {onChange: (value) => onChangeHandler('directorName', value),
              initialValue: inputValue.directorName || '',
              rules: [{required: true, message: '请输入科主任姓名'}]})}
            type="text"
            value={inputValue.directorName || ''}
          />
          {getFieldError('directorName') ? <p className='surveyError'>{getFieldError('directorName')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室主任 <span>*</span> </p>
          <InputItem
            {...getFieldProps('pipeDirector', {onChange: (value) => onChangeHandler('pipeDirector', value),
              initialValue: inputValue.pipeDirector || '',
              rules: [{required: true, message: '请输入导管室主任'}]})}
            type="text"
            value={inputValue.pipeDirector || ''}
          />
          {getFieldError('pipeDirector') ? <p className='surveyError'>{getFieldError('pipeDirector')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>联系电话 <span>*</span> </p>
          <InputItem
            {...getFieldProps('phone', {onChange: (value) => onChangeHandler('phone', value),
              initialValue: inputValue.phone || '',
              rules: [{required: true, message: '请输入联系电话'}]})}
            type="phone"
            value={inputValue.phone || ''}
          />
          {getFieldError('phone') ? <p className='surveyError'>{getFieldError('phone')}</p>:''}

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <p className='dashed' />

          <p className='info_content'>1.医师总人数(单位：人) <span>*</span> </p>
          <InputItem
            {...getFieldProps('surgeonNum', {onChange: (value) => onChangeHandler('surgeonNum', value),
              initialValue: inputValue.surgeonNum || '',
              rules: [{required: true, message: '请输入医师总人数'}]})}
            type="number"
            value={inputValue.surgeonNum || ''}
          />
          {getFieldError('surgeonNum') ? <p className='surveyError'>{getFieldError('surgeonNum')}</p>:''}

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

export default withRouter(connect(state => state)(HeartPipePersonConstruct))
