import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {List, InputItem, Toast, Picker, WhiteSpace, DatePicker} from 'antd-mobile'
import { createForm } from 'rc-form';
import moment from 'moment'
import {surveyStoreLocalAction, ifShowSurveyQuestions} from "../../Store/actions/global.action";

import HeartBasicCondition from './HeartBasicCondition';
import HeartPipeHardwareCondition from './HeartPipeHardwareCondition';
import { hospitalGrade, hospitalOrganizationKind, hospitalKind, hospitalKindBelong, hospitalOldArea} from './SurveyData';


class BasicInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      // hospitalName: '',
      // hospitalGrade: '',
      // approvedTotalBeds: '',
      // realTotalBeds: '',
      // hospitalOrganizationKind: '',
      // hospitalKind: '',
      // hospitalKindBelong: '',
      // hospitalOldArea: '',
      // ifHeartSurgeryState: false
    };
  }

  // onErrorClick = () => {
  //   if (this.state.hasError) {
  //     Toast.info('Please enter 11 digits');
  //   }
  // }

  // onChange = (value) => {
  //   if (value.replace(/\s/g, '').length < 11) {
  //     this.setState({
  //       hasError: true,
  //     });
  //   } else {
  //     this.setState({
  //       hasError: false,
  //     });
  //   }
  //   this.setState({
  //     hospitalGrade: value,
  //   });
  // }

  onChangeHandler = (key, value) => {

    // if(!value) {
    //   this.setState({
    //     hasError: true,
    //   });
    // }else {
    //   this.setState({
    //     hasError: false,
    //   });
    // }
    if(key === 'signatureDate') {
      value = moment(value).format('YYYY-MM-DD');
    }
    console.log(key, value);
    const store = this.props;
    store.dispatch(surveyStoreLocalAction('update', key, value));
    // if(key === 'ifHeartSurgery' || 'ifThoracotomy') {
    //   console.log('append')
    //   store.dispatch(surveyStoreLocalAction('append', key, value));
    // }else {
    //   console.log('update')
    //   store.dispatch(surveyStoreLocalAction('update', key, value));
    // }
    // if (value.replace(/\s/g, '').length < 11) {
    //   this.setState({
    //     hasError: true,
    //   });
    // } else {
    //   this.setState({
    //     hasError: false,
    //   });
    // }
    // console.log(key)
    // console.log(value)
    // this.setState({ [key]: value });
    // const form =  this.props.form;
    // form.setFieldsValue({
    //   [key]: value
    // });

  }

  render() {
    const { globalReducer:{ inputValue } } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props.form;  //getFieldsError
    // const {ifHeartSurgeryState} = this.state;
    // console.log(inputValue);
    return (
      <React.Fragment>
        <p className='info_title'>基本信息</p>

        <List>
          <p className='info_content'>医院名称 <span>*</span> </p>
          <InputItem
            {...getFieldProps('hospitalName', {rules: [{required: true, message: '请输入医院名称'}]})}
            type="text"
            value={inputValue.hospitalName || ''}
            // placeholder="input your phone"
            // error={this.state.hasError}
            // onErrorClick={this.onErrorClick}
            error={isFieldTouched('hospitalName') && getFieldError('hospitalName')}
            onErrorClick={() => Toast.info(getFieldError('hospitalName'))}
            onChange={this.onChangeHandler.bind(this, 'hospitalName')}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>医院的等级 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalGrade', {rules: [{required: true, message: '请选择医院的等级'}]})}
            value={inputValue.hospitalGrade || ''}
            data={hospitalGrade}
            cols={1}
            onChange={this.onChangeHandler.bind(this, 'hospitalGrade')}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>

          <WhiteSpace size="lg" />

          <p className='info_content'>核定总床位数？（单位：张）<span>*</span></p>
          <InputItem
            {...getFieldProps('approvedTotalBeds', {rules: [{required: true, message: '请输入核定总床位数'}]})}
            type="number"
            value={inputValue.approvedTotalBeds || ''}
            error={isFieldTouched('approvedTotalBeds') && getFieldError('approvedTotalBeds')}
            onErrorClick={() => Toast.info(getFieldError('approvedTotalBeds'))}
            onChange={this.onChangeHandler.bind(this, 'approvedTotalBeds')}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>实际开放总床位数？（单位：张）<span>*</span></p>
          <InputItem
            {...getFieldProps('realTotalBeds', {rules: [{required: true, message: '请输入实际开放总床位数'}]})}
            type="number"
            value={inputValue.realTotalBeds || ''}
            error={isFieldTouched('realTotalBeds') && getFieldError('realTotalBeds')}
            onErrorClick={() => Toast.info(getFieldError('realTotalBeds'))}
            onChange={this.onChangeHandler.bind(this, 'realTotalBeds')}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>医院机构性质 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalOrganizationKind', {rules: [{required: true, message: '请选择医院机构性质'}]})}
            value={inputValue.hospitalOrganizationKind || ''}
            data={hospitalOrganizationKind}
            cols={1}
            onChange={this.onChangeHandler.bind(this, 'hospitalOrganizationKind')}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>

          <WhiteSpace size="lg" />

          <p className='info_content'>医院性质 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalKind', {rules: [{required: true, message: '请选择医院机构性质'}]})}
            value={inputValue.hospitalKind || ''}
            data={hospitalKind}
            cols={1}
            onChange={this.onChangeHandler.bind(this, 'hospitalKind')}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>

          <WhiteSpace size="lg" />

          <p className='info_content'>其中属于 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalKindBelong', {rules: [{required: true, message: '请选择医院机构性质'}]})}
            value={inputValue.hospitalKindBelong || ''}
            data={hospitalKindBelong}
            cols={1}
            onChange={this.onChangeHandler.bind(this, 'hospitalKindBelong')}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>

          <WhiteSpace size="lg" />

          <p className='info_content'>区域划分（旧区）<span>*</span></p>
          <Picker
            {...getFieldProps('hospitalOldArea', {rules: [{required: true, message: '请选择医院机构性质'}]})}
            value={inputValue.hospitalOldArea || ''}
            data={hospitalOldArea}
            cols={1}
            onChange={this.onChangeHandler.bind(this, 'hospitalOldArea')}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
        </List>

        <HeartBasicCondition onChangeHandler={this.onChangeHandler} />
        <HeartPipeHardwareCondition onChangeHandler={this.onChangeHandler} />

        <WhiteSpace size="lg" />

        <p className='info_content'>填表人 <span>*</span></p>
        <InputItem
          {...getFieldProps('signatureName', {rules: [{required: true, message: '请输入填表人'}]})}
          type="text"
          value={inputValue.signatureName || ''}
          error={isFieldTouched('signatureName') && getFieldError('signatureName')}
          onErrorClick={() => Toast.info(getFieldError('signatureName'))}
          onChange={this.onChangeHandler.bind(this, 'signatureName')}
        />

        <WhiteSpace size="lg" />

        <p className='info_content'>填表日期 <span>*</span></p>
        <DatePicker
          mode="date"
          title=""
          value={inputValue.signatureDate && new Date(inputValue.signatureDate)}
          onChange={this.onChangeHandler.bind(this, 'signatureDate')}
          minDate={new Date(`${new Date().getFullYear() - 120}-01-01`)}
          maxDate={new Date()}
        >
          <List.Item arrow="horizontal"> </List.Item>
        </DatePicker>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createForm()(BasicInformation)))
