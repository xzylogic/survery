import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {List, InputItem, Picker, WhiteSpace, DatePicker, Button, Toast} from 'antd-mobile'
// import { createForm } from 'rc-form';
import  createDOMForm  from 'rc-form/lib/createDOMForm';
import moment from 'moment'
import {surveyStoreLocalAction, saveSurveyAction} from "../../Store/actions/survey.action";

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
    // console.log(key, value);
    // console.log(typeof key, typeof value);
    const store = this.props;
    // console.log(type)

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


    validateFieldsAndScroll({scroll:{offsetTop: 200}}, (error) => {
      const store = this.props;
      const {getFieldError} = this.props.form;  //isFieldTouched
      const router = this.props.history;
      if (!error) {

        Object.keys(submitData).forEach((key)=>{
          let arr = [];
          let dsaBrandArr = [];
          let dsaModelArr = [];
          let dsaDateArr = [];
          if(key === 'dsaDtos'){
            Object.keys(submitData[key]).forEach((id) => {

              if(id.indexOf('dsaBrand') > -1){
                dsaBrandArr.push(submitData[key][id]);
              }else if(id.indexOf('dsaModel') > -1){
                dsaModelArr.push(submitData[key][id]);
              }else{
                dsaDateArr.push(submitData[key][id]);
              }
              arr.push(submitData[key][id]);
            })
            submitData[key] = [];
            submitData[key]['dsaBrand'] = dsaBrandArr.toString();
            submitData[key]['dsaModel'] = dsaModelArr.toString();
            submitData[key]['dsaDate'] = dsaDateArr.toString();
          }

          if(key === 'pipeDepartment' && submitData[key] === '其他科室'){
            submitData[key] = submitData['pipeBelongDepartment_other'];
          }
          if(key === 'medium' && submitData[key] === '其他'){
            submitData[key] = submitData['medium_other'];
          }

          if(key === 'pciDto'){
            submitData[key]['canSelect'] = [...submitData['canSelect0']];
          }
          if(key === 'esDto'){
            submitData[key]['canSelect'] = [...submitData['canSelect1']];
          }
          if(key === 'shdDto'){
            submitData[key]['canSelect'] = [...submitData['canSelect2']];
          }

          if(key === 'otherSubject0'){
            if(submitData['pciDto']['canSelect'].indexOf('其他学科') > -1){
              submitData['pciDto']['canSelect'].splice(submitData['pciDto']['canSelect'].indexOf('其他学科'), 1);
              submitData['pciDto']['canSelect'].push(submitData['otherSubject0']);
            }
            submitData['pciDto'].canSelect = submitData['pciDto']['canSelect'].toString();
          }

          if(key === 'otherSubject1'){
            if(submitData['esDto']['canSelect'].indexOf('其他学科') > -1){
              submitData['esDto']['canSelect'].splice(submitData['esDto']['canSelect'].indexOf('其他学科'), 1);
              submitData['esDto']['canSelect'].push(submitData['otherSubject1']);
            }
            submitData['esDto'].canSelect = submitData['esDto']['canSelect'].toString();
          }

          if(key === 'otherSubject2'){
            if(submitData['shdDto']['canSelect'].indexOf('其他学科') > -1){
              submitData['shdDto']['canSelect'].splice(submitData['shdDto']['canSelect'].indexOf('其他学科'), 1);
              submitData['shdDto']['canSelect'].push(submitData['otherSubject2']);
            }
            submitData['shdDto'].canSelect = submitData['shdDto']['canSelect'].toString();
          }

          if(key === 'area' || key === 'hospitalLevel' || key === 'hospitalNature' || key === 'hospitalType' || key === 'mechanNature' || key === 'pcCheckWay' || key === 'lack'){
            submitData[key] = submitData[key].toString();
          }
        })
        delete submitData['canSelect0'];
        delete submitData['canSelect1'];
        delete submitData['canSelect2'];
        delete submitData['otherSubject0'];
        delete submitData['otherSubject1'];
        delete submitData['otherSubject2'];
        delete submitData['otherSubject'];
        delete submitData['medium_other'];
        delete submitData['otherEquipNumber'];
        delete submitData['pipeBelongDepartment_other'];
        // console.log(submitData);

        store.dispatch(saveSurveyAction(submitData, () => {
          console.log('提交成功');
          router.push('/surveySuccess');
        }, err => {
          Toast.info(err);
        }))
        // console.log(value);
        // console.info('success');
      } else {
        Object.keys(submitData).forEach((key)=>{
          getFieldError(key)
        })
        // console.log(error);
        // console.log(error.surgeryNum1.errors[0].message);
        // console.log(value);
        // Toast.info('请输入完后提交~');
        // console.log('false');
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
          {getFieldError('hospitalName') ? <p className='surveyError'>{getFieldError('hospitalName')}</p>:''}

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
          {getFieldError('hospitalLevel') ? <p className='surveyError'>{getFieldError('hospitalLevel')}</p>:''}

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
          {getFieldError('totalBedNum') ? <p className='surveyError'>{getFieldError('totalBedNum')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>实际开放总床位数？（单位：张）<span>*</span></p>
          <InputItem
            {...getFieldProps('openBedNum', {onChange: (value) => this.onChangeHandler('openBedNum', value),
              initialValue: inputValue.openBedNum || '',
              rules: [{required: true, message: '请输入实际开放总床位数'}]})}
            type="number"
            value={inputValue.openBedNum || ''}
          />
          {getFieldError('openBedNum') ? <p className='surveyError'>{getFieldError('openBedNum')}</p>:''}

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
          {getFieldError('mechanNature') ? <p className='surveyError'>{getFieldError('mechanNature')}</p>:''}

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
          {getFieldError('hospitalNature') ? <p className='surveyError'>{getFieldError('hospitalNature')}</p>:''}

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
          {getFieldError('hospitalType') ? <p className='surveyError'>{getFieldError('hospitalType')}</p>:''}

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
          {getFieldError('area') ? <p className='surveyError'>{getFieldError('area')}</p>:''}
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
        {getFieldError('name') ? <p className='surveyError'>{getFieldError('name')}</p>:''}

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
        {getFieldError('date') ? <p className='surveyError'>{getFieldError('date')}</p>:''}

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <Button type='primary' size='large' inline className='submit' onClick={this.submit} >提交</Button>
        {/*disabled={hasErrors(getFieldsError())}*/}
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createDOMForm()(BasicInformation)))
