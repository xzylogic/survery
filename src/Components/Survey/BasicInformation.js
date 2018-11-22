import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {List, InputItem, Picker, WhiteSpace, DatePicker, Button} from 'antd-mobile'
// import { createForm } from 'rc-form';
import  createDOMForm  from 'rc-form/lib/createDOMForm';
import moment from 'moment'
import {surveyStoreLocalAction} from "../../Store/actions/survey.action";

import { hospitalLevel, mechanNature, hospitalNature, hospitalType, area} from './SurveyData';
import HeartBasicCondition from './HeartBasicCondition';
import HeartPipeHardwareCondition from './HeartPipeHardwareCondition';
import DSA from './DSA';
import HeartPipePersonConstruct from './HeartPipePersonConstruct';
import WorkLoad2018 from './WorkLoad2018';

class BasicInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  onChangeHandler = (key, value, type, id) => {

    if(key === 'date') {
      value = moment(value).format('YYYY-MM-DD');
    }
    console.log(key, value);
    console.log(typeof key, typeof value);
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

  // checkError = (key) => {
  //   const {isFieldTouched, getFieldError} = this.props.form;
  //   console.log(key)
  //   let errMes = isFieldTouched(key) && getFieldError(key) ? <p className='surveyError'>{getFieldError(key)}</p>:'';
  //   return errMes
  //   isFieldTouched(key) && getFieldError(key);
  // }

  submit = () => {
    // const store = this.props;

    const {validateFieldsAndScroll} = this.props.form; //isFieldTouched, getFieldError, validateFields

    const { inputValue } = this.props.globalReducer;
    let submitData = Object.assign({}, inputValue);

    // console.log(submitData)
    // console.log(submitData.dsaDtos)

    Object.keys(submitData).forEach((key)=>{
      let arr = [];
      let dsaNameArr = [];
      let dsaDateArr = [];
      if(key === 'dsaDtos'){
        Object.keys(submitData[key]).forEach((id) => {

          if(id.indexOf('dsaName') > -1){
            dsaNameArr.push(submitData[key][id]);
          }else{
            dsaDateArr.push(submitData[key][id]);
          }
          arr.push(submitData[key][id]);
        })
        submitData[key] = [];
        submitData[key]['dsaName'] = dsaNameArr.toString();
        submitData[key]['dsaDate'] = dsaDateArr.toString();
      }

      if(key === 'otherEquipNumberValue'){
        submitData['iabp'] = submitData[key]['otherEquipNumber0'];
        submitData['ivus'] = submitData[key]['otherEquipNumber1'];
        submitData['oct'] = submitData[key]['otherEquipNumber2'];
        submitData['ffr'] = submitData[key]['otherEquipNumber3'];
        submitData['elr'] = submitData[key]['otherEquipNumber4'];
        submitData['rgi'] = submitData[key]['otherEquipNumber5'];
        submitData['bm'] = submitData[key]['otherEquipNumber6'];
        submitData['kyky'] = submitData[key]['otherEquipNumber7'];
        submitData['ci'] = submitData[key]['otherEquipNumber8'];
        submitData['carto'] = submitData[key]['otherEquipNumber9'];
        submitData['ensite'] = submitData[key]['otherEquipNumber10'];
        submitData['els'] = submitData[key]['otherEquipNumber11'];
        submitData['pa'] = submitData[key]['otherEquipNumber12'];
        submitData['am'] = submitData[key]['otherEquipNumber13'];
      }
      if(key === 'pciDto'){
        submitData[key]['canSelect'] = submitData['pci_canSelect'];
      }
      if(key === 'esDto'){
        submitData[key]['canSelect'] = submitData['ele_canSelect'];
      }
      if(key === 'shdDto'){
        submitData[key]['canSelect'] = submitData['con_canSelect'];
      }

    })
    console.log(submitData)
    // console.log(submitData)

    // var arr = []
    // for (let i in obj) {
    //   arr.push(obj[i]); //属性
    //   //arr.push(obj[i]); //值
    // }
    // console.log(arr);

    // Object.keys(submitData).forEach((key, index)=>{
    //   // if(key === 'dsaDtos'){
    //   //   console.log(submitData[key])
    //   //
    //   // }
    //   console.log(key, submitData[key])
    // })
    validateFieldsAndScroll({validateFirst: true}, (error, value) => {
        if (!error) {
          // console.log(value);
          console.info('success');
          // store.dispatch()
        } else {
          // console.log(value);
          console.log('false');
        }
      });


  }

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
            {...getFieldProps('hospitalName', {onChange: (value) => this.onChangeHandler('hospitalName', value),
              initialValue: inputValue.hospitalName || '',
              rules: [{required: true, message: '请输入医院名称'}]})}
            type="text"
            value={inputValue.hospitalName || ''}
          />
          {/*{this.checkError('hospitalName')}*/}
          {isFieldTouched('hospitalName') && getFieldError('hospitalName') ? <p className='surveyError'>{getFieldError('hospitalName')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>医院的等级 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalLevel', {onChange: (value) => this.onChangeHandler('hospitalLevel', value),
              initialValue: inputValue.hospitalLevel || '',
              rules: [{required: true, message: '请选择医院的等级'}]})}
            value={inputValue.hospitalLevel || ''}
            data={hospitalLevel}
            // onDismiss={this.checkError.bind(this, 'hospitalLevel')}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('hospitalLevel') && getFieldError('hospitalLevel') ? <p className='surveyError'>{getFieldError('hospitalLevel')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>核定总床位数？（单位：张）<span>*</span></p>
          <InputItem
            {...getFieldProps('totalBedNum', {onChange: (value) => this.onChangeHandler('totalBedNum', value),
              initialValue: inputValue.totalBedNum || '',
              rules: [{required: true, message: '请输入核定总床位数'}]})}
            type="number"
            value={inputValue.totalBedNum || ''}
            // error={isFieldTouched('totalBedNum') && getFieldError('totalBedNum')}
            // onErrorClick={() => Toast.info(getFieldError('totalBedNum'))}
          />
          {isFieldTouched('totalBedNum') && getFieldError('totalBedNum') ? <p className='surveyError'>{getFieldError('totalBedNum')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>实际开放总床位数？（单位：张）<span>*</span></p>
          <InputItem
            {...getFieldProps('openBedNum', {onChange: (value) => this.onChangeHandler('openBedNum', value),
              initialValue: inputValue.openBedNum || '',
              rules: [{required: true, message: '请输入实际开放总床位数'}]})}
            type="number"
            value={inputValue.openBedNum || ''}
          />
          {isFieldTouched('openBedNum') && getFieldError('openBedNum') ? <p className='surveyError'>{getFieldError('openBedNum')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>医院机构性质 <span>*</span></p>
          <Picker
            {...getFieldProps('mechanNature', {onChange: (value) => this.onChangeHandler('mechanNature', value),
              initialValue: inputValue.mechanNature || '',
              rules: [{required: true, message: '请选择医院机构性质'}]})}
            value={inputValue.mechanNature || ''}
            data={mechanNature}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('mechanNature') && getFieldError('mechanNature') ? <p className='surveyError'>{getFieldError('mechanNature')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>医院性质 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalNature', {onChange: (value) => this.onChangeHandler('hospitalNature', value),
              initialValue: inputValue.hospitalNature || '',
              rules: [{required: true, message: '请选择医院性质'}]})}
            value={inputValue.hospitalNature || ''}
            data={hospitalNature}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('hospitalNature') && getFieldError('hospitalNature') ? <p className='surveyError'>{getFieldError('hospitalNature')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>其中属于 <span>*</span></p>
          <Picker
            {...getFieldProps('hospitalType', {onChange: (value) => this.onChangeHandler('hospitalType', value),
              initialValue: inputValue.hospitalType || '',
              rules: [{required: true, message: '请选择其中属于'}]})}
            value={inputValue.hospitalType || ''}
            data={hospitalType}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('hospitalType') && getFieldError('hospitalType') ? <p className='surveyError'>{getFieldError('hospitalType')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>区域划分（旧区）<span>*</span></p>
          <Picker
            {...getFieldProps('area', {onChange: (value) => this.onChangeHandler('area', value),
              initialValue: inputValue.area || '',
              rules: [{required: true, message: '请选择区域划分'}]})}
            value={inputValue.area || ''}
            data={area}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          {isFieldTouched('area') && getFieldError('area') ? <p className='surveyError'>{getFieldError('area')}</p>:''}
        </List>

        <HeartBasicCondition onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError} />
        <HeartPipeHardwareCondition onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError} />
        <DSA onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError}/>
        <HeartPipePersonConstruct onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError}/>
        <WorkLoad2018 onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError}/>

        <WhiteSpace size="lg" />

        <p className='info_content'>填表人 <span>*</span></p>
        <InputItem
          {...getFieldProps('name', {onChange: (value) => this.onChangeHandler('name', value),
            initialValue: inputValue.name || '',
            rules: [{required: true, message: '请输入填表人'}]})}
          type="text"
          value={inputValue.name || ''}
        />
        {isFieldTouched('name') && getFieldError('name') ? <p className='surveyError'>{getFieldError('name')}</p>:''}

        <WhiteSpace size="lg" />

        <p className='info_content'>填表日期 <span>*</span></p>
        <DatePicker
          {...getFieldProps('date', {onChange: (value) => this.onChangeHandler('date', value),
            initialValue: inputValue.date && new Date(inputValue.date),
            rules: [{required: true, message: '请输入填表日期'}]})}
          mode="date"
          title=""
          value={inputValue.date && new Date(inputValue.date)}
          minDate={new Date(`${new Date().getFullYear() - 120}-01-01`)}
          maxDate={new Date()}
        >
          <List.Item arrow="horizontal"> </List.Item>
        </DatePicker>
        {isFieldTouched('date') && getFieldError('date') ? <p className='surveyError'>{getFieldError('date')}</p>:''}

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <Button type='primary' size='large' inline className='submit' onClick={this.submit} >提交</Button>
        {/*disabled={hasErrors(getFieldsError())}*/}
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createDOMForm()(BasicInformation)))
