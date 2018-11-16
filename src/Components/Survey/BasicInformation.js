import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {List, InputItem, Picker, WhiteSpace, DatePicker, Button} from 'antd-mobile'
import { createForm } from 'rc-form';
import moment from 'moment'
import {surveyStoreLocalAction} from "../../Store/actions/global.action";

import HeartBasicCondition from './HeartBasicCondition';
import HeartPipeHardwareCondition from './HeartPipeHardwareCondition';
import DSA from './DSA';
import HeartPipePersonConstruct from './HeartPipePersonConstruct';
import WorkLoad2017 from './WorkLoad2017';
import { hospitalGrade, hospitalOrganizationKind, hospitalKind, hospitalKindBelong, hospitalOldArea} from './SurveyData';

class BasicInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  onChangeHandler = (key, value, type, id) => {

    if(key === 'signatureDate') {
      value = moment(value).format('YYYY-MM-DD');
    }
    console.log(key, value);
    const store = this.props;
    console.log(type)

    if(type === 'survey') {
      store.dispatch(surveyStoreLocalAction('append', key, value, id));
    }else if(type === 'checkbox') {
      store.dispatch(surveyStoreLocalAction('append', key, value));
    }else {
      store.dispatch(surveyStoreLocalAction('update', key, value));
    }
  }

  submit = () => {
    // const store = this.props;
    const {validateFields} = this.props.form; //isFieldTouched, getFieldError
    validateFields((error, value) => {
      if (!error) {
        console.info('success');
        // store.dispatch()
      } else {
        console.log(value);
        // console.log(getFieldError('hospitalGrade') );
        // Object.keys(value).forEach((key, index)=>{
        //   if(value[key] === undefined) {
        //     console.log(key)
        //     isFieldTouched(key) && getFieldError(key);
        //   }
        //   // console.log(key, value[key])
        // })
        // console.log(error);
      }
    });
  }

  // checkError = (key) => {
  //   const { getFieldError, isFieldTouched } = this.props.form;  //getFieldsError
  //   return (
  //     <div>
  //       {isFieldTouched[key] && getFieldError[key] ? <p className='surveyError'>{getFieldError[key]}</p>:''}
  //     </div>
  //   )
  // }

  render() {
    const { globalReducer:{ inputValue } } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props.form;  //getFieldsError
    // console.log(inputValue);
    return (
      <React.Fragment>
        <p className='info_title'>基本信息</p>

        <List>
          <p className='info_content'>医院名称 <span>*</span> </p>
          <InputItem
            {...getFieldProps('hospitalName', {onChange: (value) => this.onChangeHandler('hospitalName', value), rules: [{required: true, message: '请输入医院名称'}]})}
            type="text"
            value={inputValue.hospitalName || ''}
          />
          {/*{this.checkError('hospitalName')}*/}
          {isFieldTouched('hospitalName') && getFieldError('hospitalName') ? <p className='surveyError'>{getFieldError('hospitalName')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>医院的等级 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalGrade', {onChange: (value) => this.onChangeHandler('hospitalGrade', value), rules: [{required: true, message: '请选择医院的等级'}]})}
            value={inputValue.hospitalGrade || ''}
            data={hospitalGrade}
            onDismiss={getFieldError('hospitalGrade')}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('hospitalGrade') && getFieldError('hospitalGrade') ? <p className='surveyError'>{getFieldError('hospitalGrade')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>核定总床位数？（单位：张）<span>*</span></p>
          <InputItem
            {...getFieldProps('approvedTotalBeds', {onChange: (value) => this.onChangeHandler('approvedTotalBeds', value), rules: [{required: true, message: '请输入核定总床位数'}]})}
            type="number"
            value={inputValue.approvedTotalBeds || ''}
            // error={isFieldTouched('approvedTotalBeds') && getFieldError('approvedTotalBeds')}
            // onErrorClick={() => Toast.info(getFieldError('approvedTotalBeds'))}
          />
          {isFieldTouched('approvedTotalBeds') && getFieldError('approvedTotalBeds') ? <p className='surveyError'>{getFieldError('approvedTotalBeds')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>实际开放总床位数？（单位：张）<span>*</span></p>
          <InputItem
            {...getFieldProps('realTotalBeds', {onChange: (value) => this.onChangeHandler('realTotalBeds', value), rules: [{required: true, message: '请输入实际开放总床位数'}]})}
            type="number"
            value={inputValue.realTotalBeds || ''}
          />
          {isFieldTouched('realTotalBeds') && getFieldError('realTotalBeds') ? <p className='surveyError'>{getFieldError('realTotalBeds')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>医院机构性质 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalOrganizationKind', {onChange: (value) => this.onChangeHandler('hospitalOrganizationKind', value), rules: [{required: true, message: '请选择医院机构性质'}]})}
            value={inputValue.hospitalOrganizationKind || ''}
            data={hospitalOrganizationKind}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('hospitalOrganizationKind') && getFieldError('hospitalOrganizationKind') ? <p className='surveyError'>{getFieldError('hospitalOrganizationKind')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>医院性质 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalKind', {onChange: (value) => this.onChangeHandler('hospitalKind', value), rules: [{required: true, message: '请选择医院性质'}]})}
            value={inputValue.hospitalKind || ''}
            data={hospitalKind}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('hospitalKind') && getFieldError('hospitalKind') ? <p className='surveyError'>{getFieldError('hospitalKind')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>其中属于 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalKindBelong', {onChange: (value) => this.onChangeHandler('hospitalKindBelong', value), rules: [{required: true, message: '请选择其中属于'}]})}
            value={inputValue.hospitalKindBelong || ''}
            data={hospitalKindBelong}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('hospitalKindBelong') && getFieldError('hospitalKindBelong') ? <p className='surveyError'>{getFieldError('hospitalKindBelong')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>区域划分（旧区）<span>*</span></p>
          <Picker
            {...getFieldProps('hospitalOldArea', {onChange: (value) => this.onChangeHandler('hospitalOldArea', value), rules: [{required: true, message: '请选择区域划分'}]})}
            value={inputValue.hospitalOldArea || ''}
            data={hospitalOldArea}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('hospitalOldArea') && getFieldError('hospitalOldArea') ? <p className='surveyError'>{getFieldError('hospitalOldArea')}</p>:''}
        </List>

        <HeartBasicCondition onChangeHandler={this.onChangeHandler} />
        <HeartPipeHardwareCondition onChangeHandler={this.onChangeHandler} />
        <DSA onChangeHandler={this.onChangeHandler} />
        <HeartPipePersonConstruct onChangeHandler={this.onChangeHandler} />
        <WorkLoad2017 onChangeHandler={this.onChangeHandler} />

        <WhiteSpace size="lg" />

        <p className='info_content'>填表人 <span>*</span></p>
        <InputItem
          {...getFieldProps('signatureName', {onChange: (value) => this.onChangeHandler('signatureName', value), rules: [{required: true, message: '请输入填表人'}]})}
          type="text"
          value={inputValue.signatureName || ''}
        />
        {isFieldTouched('signatureName') && getFieldError('signatureName') ? <p className='surveyError'>{getFieldError('signatureName')}</p>:''}

        <WhiteSpace size="lg" />

        <p className='info_content'>填表日期 <span>*</span></p>
        <DatePicker
          {...getFieldProps('signatureDate', {onChange: (value) => this.onChangeHandler('signatureDate', value), rules: [{required: true, message: '请输入填表日期'}]})}
          mode="date"
          title=""
          value={inputValue.signatureDate && new Date(inputValue.signatureDate)}
          minDate={new Date(`${new Date().getFullYear() - 120}-01-01`)}
          maxDate={new Date()}
        >
          <List.Item arrow="horizontal"> </List.Item>
        </DatePicker>
        {isFieldTouched('signatureDate') && getFieldError('signatureDate') ? <p className='surveyError'>{getFieldError('signatureDate')}</p>:''}

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <Button type='primary' size='large' inline className='submit' onClick={this.submit}>提交</Button>
        {/*disabled={hasErrors(getFieldsError())}*/}
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createForm()(BasicInformation)))
