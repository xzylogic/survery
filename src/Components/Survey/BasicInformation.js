import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  List,
  InputItem,
  Picker,
  WhiteSpace,
  DatePicker,
  Button,
  Toast,
  TextareaItem,
  Radio,
  Checkbox
} from 'antd-mobile'
// import { createForm } from 'rc-form';
import  createDOMForm  from 'rc-form/lib/createDOMForm';
import moment from 'moment'
import {surveyStoreLocalAction, saveSurveyAction} from "../../Store/actions/survey.action";

import {
  hospitalLevel,
  mechanNature,
  hospitalNature,
  hospitalType,
  area,
  ifHeartSurgery,
  ifThoracotomy,
  pipeDepartment,
  pipeLocation,
  otherEquipNumber,
  pipeLevel,
  level,
  groupSurgeryDoctorsOperationScope,
  pciOperation, operaCheckWay, pcCheckWay, imageManage, medium, satisfied, lack, overtime, ca, pci
} from './SurveyData';
// import HeartBasicCondition from './HeartBasicCondition';
// import HeartPipeHardwareCondition from './HeartPipeHardwareCondition';
// import DSA from './DSA';
// import HeartPipePersonConstruct from './HeartPipePersonConstruct';
// import WorkLoad2018 from './WorkLoad2018';

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;

class BasicInformation extends React.Component {
  state = {
    dsa_id : [1]
  }

  addDsa = () => {
    let dsa_id = localStorage.getItem('dsa_id') && localStorage.getItem('dsa_id').split(',');
    let id = dsa_id || this.state.dsa_id;
    id.push(id.length + 1);
    this.setState({
      dsa_id: id
    });
    localStorage.setItem('dsa_id', id);
  }

  onChangeHandler = (key, value, type, id, i) => {
    const {setFieldsValue} = this.props.form;
    switch (key) {
      case 'ifHeartSurgery':
        setFieldsValue({
          ifHeartSurgery: value,
        });
        break;
      case 'ifThoracotomy':
        setFieldsValue({
          ifThoracotomy: value,
        });
        break;
      case 'pipeDepartment':
        setFieldsValue({
          pipeDepartment: value,
        });
        break;
      case 'pipeLocation':
        setFieldsValue({
          pipeLocation: value,
        });
        break;
      case 'pipeLevel':
        setFieldsValue({
          pipeLevel: value,
        });
        break;
      case 'level':
        setFieldsValue({
          level: value,
        });
        break;
      case 'canSelect0':
        setFieldsValue({
          canSelect0: value,
        });
        break;
      case 'canSelect1':
        setFieldsValue({
          canSelect1: value,
        });
        break;
      case 'canSelect2':
        setFieldsValue({
          canSelect2: value,
        });
        break;
      case 'pciCommonDto':
        setFieldsValue({
          op_ifHave0: value,
        });
        break;
      case 'poCommonDto':
        setFieldsValue({
          op_ifHave1: value,
        });
        break;
      case 'rfCommonDto':
        setFieldsValue({
          op_ifHave2: value,
        });
        break;
      case 'chdCommonDto':
        setFieldsValue({
          op_ifHave3: value,
        });
        break;
      case 'laacCommonDto':
        setFieldsValue({
          op_ifHave4: value,
        });
        break;
      case 'pavCommonDto':
        setFieldsValue({
          op_ifHave5: value,
        });
        break;
      case 'operaCheckWay':
        setFieldsValue({
          operaCheckWay: value,
        });
        break;
      case 'pcCheckWay':
        setFieldsValue({
          pcCheckWay: value,
        });
        break;
      case 'imageManage':
        setFieldsValue({
          imageManage: value,
        });
        break;
      case 'medium':
        setFieldsValue({
          medium: value,
        });
        break;
      case 'satisfied':
        setFieldsValue({
          satisfied: value,
        });
        break;
      case 'lack':
        setFieldsValue({
          lack: value,
        });
        break;
      case 'overtime':
        setFieldsValue({
          overtime: value,
        });
        break;
      case 'ca':
        setFieldsValue({
          ca: value,
        });
        break;
      case 'pci':
        setFieldsValue({
          pci: value,
        });
        break;
      default:
        break;
    }
    if(key === 'date') {
      value = moment(value).format('YYYY-MM-DD');
    }
    if(id && typeof id === 'string' && id.indexOf('dsaDate') > -1) {
      value = moment(value).format('YYYY-MM');
    }

    // console.log(key, value);
    // console.log(typeof key, typeof value);
    // console.log(type)
    const store = this.props;
    if(type === 'arrObj') {
      store.dispatch(surveyStoreLocalAction('append', key, value, id, i));
    }else if(type === 'survey') {
      store.dispatch(surveyStoreLocalAction('append', key, value, id));
    }else if(type === 'checkbox') {
      store.dispatch(surveyStoreLocalAction('append', key, value));
    }else {
      store.dispatch(surveyStoreLocalAction('update', key, value));
    }
  }

  formatDate = (date) => {
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
    // const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${dateStr}`;
  }

  submit = () => {
    // const store = this.props;

    const {validateFieldsAndScroll} = this.props.form; //isFieldTouched, getFieldError, validateFields

    const { inputValue } = this.props.globalReducer;
    let submitData = Object.assign({}, inputValue);

    // console.log(submitData)
    validateFieldsAndScroll({first: true, force: true, scroll:{offsetTop: 200}}, (error) => {
      const store = this.props;
      const {getFieldError} = this.props.form;
      const router = this.props.history;
      if (!error) {
        Object.keys(submitData).forEach((key)=>{
          if(key === 'pipeDepartment' && submitData[key] === '其他科室'){
            submitData[key] = submitData['pipeBelongDepartment_other'];
          }
          if(key === 'medium' && submitData[key] === '其他'){
            submitData[key] = submitData['medium_other'];
          }

          if(key === 'pciDto'){
            submitData[key]['canSelect'] = [...submitData['canSelect0']].toString();
          }
          if(key === 'esDto'){
            submitData[key]['canSelect'] = [...submitData['canSelect1']].toString();
          }
          if(key === 'shdDto'){
            submitData[key]['canSelect'] = [...submitData['canSelect2']].toString();
          }

          if(key === 'otherSubject0'){
            let os0 = submitData['pciDto']['canSelect'];
            if(os0.split(',').indexOf('其他学科') > -1){
              os0.split(',').splice(submitData['pciDto']['canSelect'].indexOf('其他学科'), 1);
              os0.split(',').push(submitData['otherSubject0']);
            }
            submitData['pciDto'].canSelect = submitData['pciDto']['canSelect'].toString();
          }

          if(key === 'otherSubject1'){
            let os1 = submitData['esDto']['canSelect'];
            if(os1.split(',').indexOf('其他学科') > -1){
              os1.split(',').splice(submitData['esDto']['canSelect'].indexOf('其他学科'), 1);
              os1.split(',').push(submitData['otherSubject1']);
            }
            submitData['esDto'].canSelect = submitData['esDto']['canSelect'].toString();
          }

          if(key === 'otherSubject2'){
            let os2 = submitData['shdDto']['canSelect'];
            if(os2.split(',').indexOf('其他学科') > -1){
              os2.split(',').splice(submitData['shdDto']['canSelect'].indexOf('其他学科'), 1);
              os2.split(',').push(submitData['otherSubject2']);
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
        // console.log(value);
        // Toast.info('请输入完后提交~');
      }
    });
  }

  render() {
    const { globalReducer:{ inputValue } } = this.props;
    const { getFieldProps, getFieldError } = this.props.form;  //getFieldsError, isFieldTouched
    let dsa_id = localStorage.getItem('dsa_id') && localStorage.getItem('dsa_id').split(',');
    let onChangeHandler = this.onChangeHandler;

    const eachGroupNumberLsit = [
      ['（1）PCI小组', 'totalNum', 'doctorNum', 'masterNum', 'seniorNum', 'mediumNum', 'canSelect', 'otherSubject', 'surgeryNum', 'pciDto'],
      ['（2）电生理组人数', 'totalNum', 'doctorNum', 'masterNum', 'seniorNum', 'mediumNum', 'canSelect', 'otherSubject', 'surgeryNum', 'esDto'],
      ['（3）结构性心脏病介入组人数', 'totalNum', 'doctorNum', 'masterNum', 'seniorNum', 'mediumNum', 'canSelect', 'otherSubject', 'surgeryNum', 'shdDto']
    ];
    const nurse_skill_personKindList = [
      ['2.护士人数（单位：人）', 'totalNum', '护士人才架构（单位：人）', 'juniorNum', 'bachelorNum', 'masterNum', 'doctorNum', 'seniorNum', 'mediumNum',
        '隶属学科及人数（可多选）', 'cmNum', 'casNum', 'rdNum', 'otherName', 'otherNum', 'nurseDto'],
      ['3.技术员人数（单位：人）', 'totalNum', '技术员人才架构（单位：人）', 'juniorNum', 'bachelorNum', 'masterNum', 'doctorNum', 'seniorNum', 'mediumNum',
        '隶属学科及人数（可多选）', 'cmNum', 'casNum', 'rdNum', 'otherName', 'otherNum', 'techDto'],
    ];
    const workLoadList = [
      ['PCI手术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'pciCommonDto'],
      ['起搏器手术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'poCommonDto'],
      ['射频消融术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'rfCommonDto'],
      ['先心病介入', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'chdCommonDto'],
      ['左心耳封堵术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'laacCommonDto'],
      ['经皮主动脉瓣膜置换/成形术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'pavCommonDto']
    ];

    return (
      <React.Fragment>
        <List>
          <p className='info_title'>基本信息</p>
          <p className='info_content'>医院名称 <span>*</span> </p>
          {getFieldError('hospitalName') ? <p className='surveyError'>{getFieldError('hospitalName')}</p>:''}
          <InputItem
            {...getFieldProps('hospitalName', {onChange: (value) => onChangeHandler('hospitalName', value),
              initialValue: inputValue.hospitalName || '',
              rules: [{required: true, message: '请输入医院名称'}]})}
            type="text"
            value={inputValue.hospitalName || ''}
          />
          {/*{this.checkError('hospitalName')}*/}

          <WhiteSpace size="lg" />

          <p className='info_content'>医院的等级 <span>*</span></p>
          {getFieldError('hospitalLevel') ? <p className='surveyError'>{getFieldError('hospitalLevel')}</p>:''}
          <Picker
            {...getFieldProps('hospitalLevel', {onChange: (value) => onChangeHandler('hospitalLevel', value),
              initialValue: inputValue.hospitalLevel || '',
              rules: [{required: true, message: '请选择医院的等级'}]})}
            value={inputValue.hospitalLevel || ''}
            data={hospitalLevel}
            // onDismiss={this.checkError.bind(this, 'hospitalLevel')}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>

          <WhiteSpace size="lg" />

          <p className='info_content'>核定总床位数？（单位：张）<span>*</span></p>
          {getFieldError('totalBedNum') ? <p className='surveyError'>{getFieldError('totalBedNum')}</p>:''}
          <InputItem
            {...getFieldProps('totalBedNum', {onChange: (value) => onChangeHandler('totalBedNum', value),
              initialValue: inputValue.totalBedNum || '',
              rules: [{required: true, message: '请输入核定总床位数'}]})}
            type="number"
            value={inputValue.totalBedNum || ''}
            // error={isFieldTouched('totalBedNum') && getFieldError('totalBedNum')}
            // onErrorClick={() => Toast.info(getFieldError('totalBedNum'))}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>实际开放总床位数？（单位：张）<span>*</span></p>
          {getFieldError('openBedNum') ? <p className='surveyError'>{getFieldError('openBedNum')}</p>:''}
          <InputItem
            {...getFieldProps('openBedNum', {onChange: (value) => onChangeHandler('openBedNum', value),
              initialValue: inputValue.openBedNum || '',
              rules: [{required: true, message: '请输入实际开放总床位数'}]})}
            type="number"
            value={inputValue.openBedNum || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>医院机构性质 <span>*</span></p>
          {getFieldError('mechanNature') ? <p className='surveyError'>{getFieldError('mechanNature')}</p>:''}
          <Picker
            {...getFieldProps('mechanNature', {onChange: (value) => onChangeHandler('mechanNature', value),
              initialValue: inputValue.mechanNature || '',
              rules: [{required: true, message: '请选择医院机构性质'}]})}
            value={inputValue.mechanNature || ''}
            data={mechanNature}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>

          <WhiteSpace size="lg" />

          <p className='info_content'>医院性质 <span>*</span></p>
          {getFieldError('hospitalNature') ? <p className='surveyError'>{getFieldError('hospitalNature')}</p>:''}
          <Picker
            {...getFieldProps('hospitalNature', {onChange: (value) => onChangeHandler('hospitalNature', value),
              initialValue: inputValue.hospitalNature || '',
              rules: [{required: true, message: '请选择医院性质'}]})}
            value={inputValue.hospitalNature || ''}
            data={hospitalNature}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>

          <WhiteSpace size="lg" />

          <p className='info_content'>其中属于 <span>*</span></p>
          {getFieldError('hospitalType') ? <p className='surveyError'>{getFieldError('hospitalType')}</p>:''}
          <Picker
            {...getFieldProps('hospitalType', {onChange: (value) => onChangeHandler('hospitalType', value),
              initialValue: inputValue.hospitalType || '',
              rules: [{required: true, message: '请选择其中属于'}]})}
            value={inputValue.hospitalType || ''}
            data={hospitalType}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>

          <WhiteSpace size="lg" />

          <p className='info_content'>区域划分（旧区）<span>*</span></p>
          {getFieldError('area') ? <p className='surveyError'>{getFieldError('area')}</p>:''}
          <Picker
            {...getFieldProps('area', {onChange: (value) => onChangeHandler('area', value),
              initialValue: inputValue.area || '',
              rules: [{required: true, message: '请选择区域划分'}]})}
            value={inputValue.area || ''}
            data={area}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          <WhiteSpace size="lg" />
        </List>


        <WhiteSpace size="lg" />
        <List>
          <p className='info_title'>一、心脏科基本情况</p>
          <p className='info_content'>病房床位数（单位：张）<span>*</span> </p>
          {getFieldError('wardBedNum') ? <p className='surveyError'>{getFieldError('wardBedNum')}</p>:''}
          <InputItem
            {...getFieldProps('wardBedNum', {onChange: (value) => onChangeHandler('wardBedNum', value),
              initialValue: inputValue.wardBedNum || '',
              rules: [{required: true, message: '请输入病房床位数'}]})}
            type="number"
            value={inputValue.wardBedNum || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>CCU床位数（单位：张）<span>*</span> </p>
          {getFieldError('ccuBedNum') ? <p className='surveyError'>{getFieldError('ccuBedNum')}</p>:''}
          <InputItem
            {...getFieldProps('ccuBedNum', {onChange: (value) => onChangeHandler('ccuBedNum', value),
              initialValue: inputValue.ccuBedNum || '',
              rules: [{required: true, message: '请输入CCU床位数'}]})}
            type="number"
            value={inputValue.ccuBedNum || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>医师人数（单位：人）<span>*</span> </p>
          {getFieldError('Basic_doctorNum') ? <p className='surveyError'>{getFieldError('Basic_doctorNum')}</p>:''}
          <InputItem
            {...getFieldProps('Basic_doctorNum', {onChange: (value) => onChangeHandler('doctorNum', value),
              initialValue: inputValue.doctorNum || '',
              rules: [{required: true, message: '请输入医师人数'}]})}
            type="number"
            value={inputValue.doctorNum || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>护士人数（单位：人）<span>*</span> </p>
          {getFieldError('nurseNum') ? <p className='surveyError'>{getFieldError('nurseNum')}</p>:''}
          <InputItem
            {...getFieldProps('nurseNum', {onChange: (value) => onChangeHandler('nurseNum', value),
              initialValue: inputValue.nurseNum || '',
              rules: [{required: true, message: '请输入护士人数'}]})}
            type="number"
            value={inputValue.nurseNum || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>是否有心胸外科 <span>*</span> </p>
          {getFieldError('ifHeartSurgery') ? <p className='surveyError'>{getFieldError('ifHeartSurgery')}</p>:''}
          {ifHeartSurgery.map(i => (
            <RadioItem
              key={i.value}
              {...getFieldProps('ifHeartSurgery', {
                initialValue: inputValue.ifHeartSurgery || '',
                rules: [{required: true, message: '请选择是否有心胸外科'}]})}
              checked={i.value === inputValue.ifHeartSurgery}
              onChange={onChangeHandler.bind(this, 'ifHeartSurgery', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}

          <WhiteSpace size="lg" />

          {inputValue.ifHeartSurgery === '有' ? (
            <List>
              <p className='info_content'>是否开展过开胸手术？<span>*</span></p>
              {getFieldError('ifThoracotomy') ? <p className='surveyError'>{getFieldError('ifThoracotomy')}</p>:''}
              {ifThoracotomy.map(i => (
                <RadioItem
                  {...getFieldProps('ifThoracotomy', {
                    initialValue: inputValue.ifThoracotomy || '',
                    rules: [{required: true, message: '请选择是否开展过开胸手术'}]})}
                  key={i.value}
                  checked={i.value === inputValue.ifThoracotomy}
                  onChange={onChangeHandler.bind(this, 'ifThoracotomy', i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}

              <WhiteSpace size="lg" />
            </List>
          ) : ''}
        </List>


        {/*<HeartBasicCondition onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError} />*/}

        <WhiteSpace size="lg" />
        <List>
          <p className='info_title'>二、心导管室硬件情况</p>
          <WhiteSpace size="lg" />

          <p className='info_content'>导管室数量（单位：间）<span>*</span> </p>
          {getFieldError('pipeNum') ? <p className='surveyError'>{getFieldError('pipeNum')}</p>:''}
          <InputItem
            {...getFieldProps('pipeNum', {onChange: (value) => onChangeHandler('pipeNum', value), initialValue: inputValue.pipeNum || '', rules: [{required: true, message: '请输入导管室数量'}]})}
            type="number"
            value={inputValue.pipeNum || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>手术区域平均使用面积（单位：平米）<span>*</span> </p>
          {getFieldError('averageArea') ? <p className='surveyError'>{getFieldError('averageArea')}</p>:''}
          <InputItem
            {...getFieldProps('averageArea', {onChange: (value) => onChangeHandler('averageArea', value), initialValue: inputValue.averageArea || '', rules: [{required: true, message: '请输入手术区域平均使用面积'}]})}
            type="number"
            value={inputValue.averageArea || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室隶属部门 <span>*</span> </p>
          {getFieldError('pipeDepartment') ? <p className='surveyError'>{getFieldError('pipeDepartment')}</p>:''}
          {pipeDepartment.map(i => (
            <div key={i.value}>
              <RadioItem
                {...getFieldProps('pipeDepartment', {
                  initialValue: inputValue.pipeDepartment || '',
                  rules: [{required: true, message: '请选择导管室隶属部门'}]})}
                key={i.value}
                checked={i.value === inputValue.pipeDepartment}
                onChange={onChangeHandler.bind(this, 'pipeDepartment', i.value)}
              >
                {i.label}
              </RadioItem>

              {inputValue.pipeDepartment && i.value === '其他科室' && inputValue['pipeDepartment'].indexOf(i.value) > -1 ? (
                <div>
                  <InputItem
                    {...getFieldProps('pipeBelongDepartment_other', {onChange: (value) => onChangeHandler('pipeBelongDepartment_other', value),
                      initialValue: inputValue.pipeBelongDepartment_other || '',
                      rules: [{required: true, message: '请输入其他科室'}]})}
                    type="text"
                    placeholder='请输入...'
                    value={inputValue.pipeBelongDepartment_other || ''}
                  />
                  {getFieldError('pipeBelongDepartment_other') ? <p className='surveyError'>{getFieldError('pipeBelongDepartment_other')}</p>:''}

                  <WhiteSpace size="lg" />
                </div>
              ) : ''}
            </div>
          ))}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室在医院内的地理位置 <span>*</span> </p>
          {getFieldError('pipeLocation') ? <p className='surveyError'>{getFieldError('pipeLocation')}</p>:''}
          {pipeLocation.map(i => (
            <RadioItem
              {...getFieldProps('pipeLocation', {
                initialValue: inputValue.pipeLocation || '',
                rules: [{required: true, message: '请选择导管室在医院内的地理位置'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeLocation}
              onChange={onChangeHandler.bind(this, 'pipeLocation', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}

          <WhiteSpace size="lg" />
        </List>


        {/*<HeartPipeHardwareCondition onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError} />*/}

        <WhiteSpace size="lg" />
        <List>
          <p className='info_content'>数字减影血管造影机</p>
          {(dsa_id || this.state.dsa_id).map((index, i) => {
            return (
              <div key={index}>
                <p className='dsa_id'>{index}</p>
                <p className='dsa_title'>品牌</p>
                <InputItem
                  {...getFieldProps(`dsaName${index}`, {onChange: (value) => onChangeHandler('dsaDtos', value, 'arrObj', 'dsaName', i),
                  })}
                  type="text"
                  value={inputValue['dsaDtos'] && inputValue['dsaDtos'][i] && inputValue['dsaDtos'][i]['dsaName']}
                  // onChange={onChangeHandler.bind(this, 'dsaName')}
                />
                <p className='dsa_title'>型号</p>
                <InputItem
                  {...getFieldProps(`dsaModel${index}`, {onChange: (value) => onChangeHandler('dsaDtos', value, 'arrObj', 'dsaModel', i),
                  })}
                  type="text"
                  value={inputValue['dsaDtos'] && inputValue['dsaDtos'][i] && inputValue['dsaDtos'][i]['dsaModel']}
                />
                <p className='dsa_title'>安装年月</p>
                <DatePicker
                  {...getFieldProps(`dsaDate${index}`, {onChange: (value) => onChangeHandler('dsaDtos', value, 'arrObj', 'dsaDate', i),
                    initialValue: inputValue['dsaDtos'] && inputValue['dsaDtos'][i] && inputValue['dsaDtos'][i]['dsaDate'] && new Date(inputValue['dsaDtos'][i]['dsaDate'])})}
                  // })}
                  mode="month"
                  format={val => `${this.formatDate(val)}`}
                  title=""
                  value={inputValue['dsaDtos'] && inputValue['dsaDtos'][i] && inputValue['dsaDtos'][i]['dsaDate'] && new Date(inputValue['dsaDtos'][i]['dsaDate'])}
                  minDate={new Date(`${new Date().getFullYear() - 120}-01-01`)}
                  maxDate={new Date()}
                >
                  <List.Item arrow="horizontal"> </List.Item>
                </DatePicker>
              </div>
            )
          })}
          <WhiteSpace size="lg" />
          <Button type='primary' onClick={this.addDsa}>+</Button>
          <WhiteSpace size="lg" />

          <p className='info_content'>其他设备数量<i>（多选）</i></p>
          {/*{getFieldError('otherEquipNumber') ? <p className='surveyError'>{getFieldError('otherEquipNumber')}</p>:''}*/}
          {otherEquipNumber.map((i) => (
            <div key={i.value}>
              <CheckboxItem
                {...getFieldProps('otherEquipNumber', {
                  initialValue: inputValue.otherEquipNumber || ''})}
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
                      rules: [{required: true, message: '请输入填空项的内容'}]})}
                    type="number"
                    placeholder="请输入..."
                    value={inputValue[i.value]}
                  />
                  {getFieldError(`otherEquipNumber${i.value}`) ? <p className='surveyError'>{getFieldError(`otherEquipNumber${i.value}`)}</p>:''}
                </div>
              ) : ''}
            </div>
          ))}

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室层流级别 <span>*</span> </p>
          {getFieldError('pipeLevel') ? <p className='surveyError'>{getFieldError('pipeLevel')}</p>:''}
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

          <WhiteSpace size="lg" />

          {inputValue.pipeLevel === '有' ? (
            <List>
              <p className='info_content'>层流级别 <span>*</span></p>
              {getFieldError('level') ? <p className='surveyError'>{getFieldError('level')}</p>:''}
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

              <WhiteSpace size="lg" />
            </List>
          ) : ''}
        </List>


        {/*<DSA onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError}/>*/}

        <WhiteSpace size="lg" />
        <List>
          <p className='info_title'>三、心导管人员结构</p>
          <p className='info_content'>科主任姓名 <span>*</span> </p>
          {getFieldError('directorName') ? <p className='surveyError'>{getFieldError('directorName')}</p>:''}
          <InputItem
            {...getFieldProps('directorName', {onChange: (value) => onChangeHandler('directorName', value),
              initialValue: inputValue.directorName || '',
              rules: [{required: true, message: '请输入科主任姓名'}]})}
            type="text"
            value={inputValue.directorName || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>导管室主任 <span>*</span> </p>
          {getFieldError('pipeDirector') ? <p className='surveyError'>{getFieldError('pipeDirector')}</p>:''}
          <InputItem
            {...getFieldProps('pipeDirector', {onChange: (value) => onChangeHandler('pipeDirector', value),
              initialValue: inputValue.pipeDirector || '',
              rules: [{required: true, message: '请输入导管室主任'}]})}
            type="text"
            value={inputValue.pipeDirector || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>联系电话 <span>*</span> </p>
          {getFieldError('phone') ? <p className='surveyError'>{getFieldError('phone')}</p>:''}
          <InputItem
            {...getFieldProps('phone', {onChange: (value) => onChangeHandler('phone', value),
              initialValue: inputValue.phone || '',
              rules: [{required: true, message: '请输入联系电话'}]})}
            type="phone"
            value={inputValue.phone || ''}
          />

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <p className='dashed' />

          <p className='info_content'>1.医师人数(单位：人) <span>*</span> </p>
          {getFieldError('surgeonNum') ? <p className='surveyError'>{getFieldError('surgeonNum')}</p>:''}
          <InputItem
            {...getFieldProps('surgeonNum', {onChange: (value) => onChangeHandler('surgeonNum', value),
              initialValue: inputValue.surgeonNum || '',
              rules: [{required: true, message: '请输入医师总人数'}]})}
            type="number"
            value={inputValue.surgeonNum || ''}
          />

          <WhiteSpace size="lg" />

          <p className='dsa_id'>以下各组均为可独立手术的医师人数，一人可参与多组手术</p>

          <WhiteSpace size="lg" />

          {/*{eachGroupNumber}*/}
          {eachGroupNumberLsit.map((personValue, index) => {
            return (
              <div key={index}>
                <p className='dsa_id'>{personValue[0]}</p>
                <WhiteSpace size="lg" />

                <p className='info_content'>组内共多少人（单位：人）<span>*</span> </p>
                {getFieldError(`${personValue[1]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[1]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`${personValue[1]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[1]),
                    initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[1]],
                    rules: [{required: true, message: '请输入组内共多少人'}]})}
                  type="number"
                  value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[1]]}
                />

                <WhiteSpace size="lg" />

                <p className='info_content'>组内博士多少人（单位：人）<span>*</span> </p>
                {getFieldError(`${personValue[2]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[2]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`${personValue[2]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[2]),
                    initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[2]],
                    rules: [{required: true, message: '请输入组内博士多少人'}]})}
                  type="number"
                  value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[2]]}
                />

                <WhiteSpace size="lg" />

                <p className='info_content'>组内硕士多少人（单位：人）<span>*</span> </p>
                {getFieldError(`${personValue[3]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[3]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`${personValue[3]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[3]),
                    initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[3]],
                    rules: [{required: true, message: '请输入组内硕士多少人'}]})}
                  type="number"
                  value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[3]]}
                />

                <WhiteSpace size="lg" />

                <p className='info_content'>高级职称多少人？（单位：人）<span>*</span> </p>
                {getFieldError(`${personValue[4]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[4]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`${personValue[4]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[4]),
                    initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[4]],
                    rules: [{required: true, message: '请输入高级职称多少人'}]})}
                  type="number"
                  value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[4]]}
                />

                <WhiteSpace size="lg" />

                <p className='info_content'>中级职称多少人？（单位：人）<span>*</span> </p>
                {getFieldError(`${personValue[5]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[5]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`${personValue[5]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[5]),
                    initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[5]],
                    rules: [{required: true, message: '请输入中级职称多少人'}]})}
                  type="number"
                  value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[5]]}
                />

                <WhiteSpace size="lg" />

                <p className='info_content'>组内手术医师的执业范围<i>（可多选）</i> <span>*</span> </p>
                {getFieldError(`${personValue[6]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[6]}${index}`)}</p>:''}
                {groupSurgeryDoctorsOperationScope.map(i => (
                  <div key={i.value}>
                    <CheckboxItem
                      {...getFieldProps(`${personValue[6]}${index}`, {
                        initialValue: inputValue[`${personValue[6]}${index}`] || '',
                        rules: [{required: true, message: '请选择组内手术医师的执业范围'}]})}
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

                <WhiteSpace size="lg" />

                <p className='info_content'>目前参与急诊手术的人数（单位：人）<span>*</span> </p>
                {getFieldError(`${personValue[8]}${index}`) ? <p className='surveyError'>{getFieldError(`${personValue[8]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`${personValue[8]}${index}`, {onChange: (value) => onChangeHandler(personValue[9], value, 'survey', personValue[8]),
                    initialValue: inputValue[personValue[9]] && inputValue[personValue[9]][personValue[8]],
                    rules: [{required: true, message: '请输入目前参与急诊手术的人数'}]})}
                  type="number"
                  value={inputValue[personValue[9]] && inputValue[personValue[9]][personValue[8]]}
                />

                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
              </div>
            )
          })}

          <WhiteSpace size="lg" />

          {/*{nurse_skill_person}*/}
          {nurse_skill_personKindList.map((personValue, index) => {
            return (
              <div key={index}>
                <p className='info_content'>{personValue[0]}<span>*</span> </p>
                {getFieldError(`ns_${personValue[1]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[1]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`ns_${personValue[1]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[1]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[1]],
                    rules: [{required: true, message: '请输入人数'}]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[1]]}
                />

                <WhiteSpace size="lg" />

                <p className='info_content'>{personValue[2]}<span>*</span> </p>
                <p className='dsa_title'>专科</p>
                {getFieldError(`ns_${personValue[3]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[3]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`ns_${personValue[3]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[3]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[3]],
                    rules: [{required: true, message: '请输入专科人数'}]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[3]]}
                />

                <WhiteSpace size="lg" />

                <p className='dsa_title'>本科</p>
                {getFieldError(`ns_${personValue[4]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[4]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`ns_${personValue[4]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[4]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[4]],
                    rules: [{required: true, message: '请输入本科人数'}]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[4]]}
                />

                <WhiteSpace size="lg" />

                <p className='dsa_title'>硕士</p>
                {getFieldError(`ns_${personValue[5]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[5]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`ns_${personValue[5]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[5]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[5]],
                    rules: [{required: true, message: '请输入硕士人数'}]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[5]]}
                />

                <WhiteSpace size="lg" />

                <p className='dsa_title'>博士</p>
                {getFieldError(`ns_${personValue[6]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[6]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`ns_${personValue[6]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[6]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[6]],
                    rules: [{required: true, message: '请输入博士人数'}]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[6]]}
                />

                <WhiteSpace size="lg" />

                <p className='dsa_title'>高级职称</p>
                {getFieldError(`ns_${personValue[7]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[7]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`ns_${personValue[7]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[7]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[7]],
                    rules: [{required: true, message: '请输入高级职称人数'}]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[7]]}
                />

                <WhiteSpace size="lg" />

                <p className='dsa_title'>中级职称</p>
                {getFieldError(`ns_${personValue[8]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[8]}${index}`)}</p>:''}
                <InputItem
                  {...getFieldProps(`ns_${personValue[8]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[8]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[8]],
                    rules: [{required: true, message: '请输入中级职称人数'}]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[8]]}
                />

                <WhiteSpace size="lg" />


                <p className='info_content'>{personValue[9]}</p>
                <p className='dsa_title'>心血管内科</p>
                {/*{getFieldError(`ns_${personValue[10]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[10]}${index}`)}</p>:''}*/}
                <InputItem
                  {...getFieldProps(`ns_${personValue[10]}${index}`, {
                    onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[10]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[10]]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[10]]}
                />

                <WhiteSpace size="lg" />

                <p className='dsa_title'>心外科</p>
                {/*{getFieldError(`ns_${personValue[11]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[11]}${index}`)}</p>:''}*/}
                <InputItem
                  {...getFieldProps(`ns_${personValue[11]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[11]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[11]]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[11]]}
                />

                <WhiteSpace size="lg" />

                <p className='dsa_title'>放射科</p>
                {/*{getFieldError(`ns_${personValue[12]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[12]}${index}`)}</p>:''}*/}
                <InputItem
                  {...getFieldProps(`ns_${personValue[12]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[12]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[12]]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[12]]}
                />

                <WhiteSpace size="lg" />

                <p className='dsa_title'>其他学科：</p>
                {/*{getFieldError(`ns_${personValue[13]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[13]}${index}`)}</p>:''}*/}
                <InputItem
                  {...getFieldProps(`ns_${personValue[13]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[13]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[13]]})}
                  type="text"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[13]]}
                />

                <p className='dsa_title'>（人数）</p>
                {/*{getFieldError(`ns_${personValue[14]}${index}`) ? <p className='surveyError'>{getFieldError(`ns_${personValue[14]}${index}`)}</p>:''}*/}
                <InputItem
                  {...getFieldProps(`ns_${personValue[14]}${index}`, {onChange: (value) => onChangeHandler(personValue[15], value, 'survey', personValue[14]),
                    initialValue: inputValue[personValue[15]] && inputValue[personValue[15]][personValue[14]]})}
                  type="number"
                  value={inputValue[personValue[15]] && inputValue[personValue[15]][personValue[14]]}
                />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
              </div>
            )
          })}

        </List>


        {/*<HeartPipePersonConstruct onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError}/>*/}

        <List>
          <p className='info_title'>四、2018年工作量（2018年1月~2018年11月）</p>

          {/*{workLoad}*/}
          {workLoadList.map((operation, index) => {
            return (
              <div key={index}>
                <p className='info_content'>{operation[0]}<span>*</span> </p>
                {getFieldError(`op_${operation[1]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[1]}${index}`)}</p>:''}
                {pciOperation.map(i => (
                  <RadioItem
                    {...getFieldProps(`op_${operation[1]}${index}`, {
                      initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[1]],
                      rules: [{required: true, message: `请选择${operation[0]}`}]})}
                    key={i.value}
                    checked={inputValue[operation[9]] && inputValue[operation[9]][operation[1]] === i.value}
                    onChange={onChangeHandler.bind(this, operation[9], i.value, 'survey', operation[1])}
                  >
                    {i.label}
                  </RadioItem>
                ))}

                <WhiteSpace size="lg" />

                {inputValue[operation[9]] && inputValue[operation[9]][operation[1]] === '已开展' ? (
                  <List>
                    <p className='info_content'>手术量（单位：例）<span>*</span></p>
                    {getFieldError(`op_${operation[2]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[2]}${index}`)}</p>:''}
                    <InputItem
                      {...getFieldProps(`op_${operation[2]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[2]),
                        initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[2]],
                        rules: [{required: true, message: '请输入手术量'}]})}
                      type="number"
                      value={inputValue[operation[9]] && inputValue[operation[9]][operation[2]]}
                    />

                    <WhiteSpace size="lg" />

                    <p className='info_content'>其中，急诊手术量（单位：例）<span>*</span></p>
                    {getFieldError(`op_${operation[3]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[3]}${index}`)}</p>:''}
                    <InputItem
                      {...getFieldProps(`op_${operation[3]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[3]),
                        initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[3]],
                        rules: [{required: true, message: '请输入急诊手术量'}]})}
                      type="number"
                      value={inputValue[operation[9]] && inputValue[operation[9]][operation[3]]}
                    />

                    <WhiteSpace size="lg" />

                    <p className='info_content'>病种比例（收治此类病人数/住院总人次数）（单位：%）<span>*</span></p>
                    {getFieldError(`op_${operation[4]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[4]}${index}`)}</p>:''}
                    <InputItem
                      {...getFieldProps(`op_${operation[4]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[4]),
                        initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[4]],
                        rules: [{required: true, message: '请输入病种比例'}]})}
                      type="number"
                      value={inputValue[operation[9]] && inputValue[operation[9]][operation[4]]}
                    />

                    <WhiteSpace size="lg" />

                    <p className='info_content'>平均住院日（单位：日）<span>*</span></p>
                    {getFieldError(`op_${operation[5]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[5]}${index}`)}</p>:''}
                    <InputItem
                      {...getFieldProps(`op_${operation[5]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[5]),
                        initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[5]],
                        rules: [{required: true, message: '请输入平均住院日'}]})}
                      type="number"
                      value={inputValue[operation[9]] && inputValue[operation[9]][operation[5]]}
                    />

                    <WhiteSpace size="lg" />

                    <p className='info_content'>平均手术费用（单位：元）<span>*</span></p>
                    {getFieldError(`op_${operation[6]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[6]}${index}`)}</p>:''}
                    <InputItem
                      {...getFieldProps(`op_${operation[6]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[6]),
                        initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[6]],
                        rules: [{required: true, message: '请输入平均手术费用'}]})}
                      type="number"
                      value={inputValue[operation[9]] && inputValue[operation[9]][operation[6]]}
                    />

                    <WhiteSpace size="lg" />

                    <p className='info_content'>治愈率（单位：%）<span>*</span></p>
                    {getFieldError(`op_${operation[7]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[7]}${index}`)}</p>:''}
                    <InputItem
                      {...getFieldProps(`op_${operation[7]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[7]),
                        initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[7]],
                        rules: [{required: true, message: '请输入治愈率'}]})}
                      type="number"
                      value={inputValue[operation[9]] && inputValue[operation[9]][operation[7]]}
                    />

                    <WhiteSpace size="lg" />

                    <p className='info_content'>死亡率（单位：%）<span>*</span></p>
                    {getFieldError(`op_${operation[8]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[8]}${index}`)}</p>:''}
                    <InputItem
                      {...getFieldProps(`op_${operation[8]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[8]),
                        initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[8]],
                        rules: [{required: true, message: '请输入死亡率'}]})}
                      type="number"
                      value={inputValue[operation[9]] && inputValue[operation[9]][operation[8]]}
                    />

                    <WhiteSpace size="lg" />
                  </List>
                ) : ''}
              </div>
            )
          })}

          <p className='info_title'>五、数据管理</p>
          <p className='info_title'>1.手术登记</p>
          <p className='info_content'>手术登记方式 <span>*</span> </p>
          {getFieldError('operaCheckWay') ? <p className='surveyError'>{getFieldError('operaCheckWay')}</p>:''}
          {operaCheckWay.map(i => (
            <RadioItem
              {...getFieldProps('operaCheckWay', {
                initialValue: inputValue.operaCheckWay || '',
                rules: [{required: true, message: '请选择手术登记方式'}]})}
              key={i.value}
              checked={i.value === inputValue.operaCheckWay}
              onChange={onChangeHandler.bind(this, 'operaCheckWay', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}

          <WhiteSpace size="lg" />

          {inputValue.operaCheckWay === '电脑版' ? (
            <List>
              <p className='info_content'>电脑版的登记方式<i>（多选）</i> <span>*</span> </p>
              {getFieldError('pcCheckWay') ? <p className='surveyError'>{getFieldError('pcCheckWay')}</p>:''}
              {pcCheckWay.map(i => (
                <CheckboxItem
                  {...getFieldProps('pcCheckWay', {
                    initialValue: inputValue.pcCheckWay || '',
                    rules: [{required: true, message: '请选择电脑版的登记方式'}]})}
                  key={i.value}
                  checked={inputValue.pcCheckWay && Array.isArray(inputValue.pcCheckWay) && inputValue.pcCheckWay.indexOf(i.value) > -1}
                  onChange={onChangeHandler.bind(this, 'pcCheckWay', i.value,  'checkbox')}
                >
                  {i.label}
                </CheckboxItem>
              ))}

              <WhiteSpace size="lg" />

              <p className='info_title'>2.影像资料</p>
              <p className='info_content'>影像资料的管理 <span>*</span> </p>
              {getFieldError('imageManage') ? <p className='surveyError'>{getFieldError('imageManage')}</p>:''}
              {imageManage.map(i => (
                <RadioItem
                  {...getFieldProps('imageManage', {
                    initialValue: inputValue.imageManage || '',
                    rules: [{required: true, message: '请选择影像资料的管理'}]})}
                  key={i.value}
                  checked={i.value === inputValue.imageManage}
                  onChange={onChangeHandler.bind(this, 'imageManage', i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}

              <WhiteSpace size="lg" />

              <p className='info_content'>承载媒介：<span>*</span> </p>
              {getFieldError('medium') ? <p className='surveyError'>{getFieldError('medium')}</p>:''}
              {medium.map(i => (
                <div key={i.value}>
                  <RadioItem
                    {...getFieldProps('medium', {
                      initialValue: inputValue.medium || '',
                      rules: [{required: true, message: '请选择承载媒介'}]})}
                    key={i.value}
                    checked={i.value === inputValue.medium}
                    onChange={onChangeHandler.bind(this, 'medium', i.value)}
                  >
                    {i.label}
                  </RadioItem>

                  {inputValue.medium && i.value === '其他' && inputValue['medium'].indexOf(i.value) > -1 ? (
                    <div>
                      <InputItem
                        {...getFieldProps('medium_other', {onChange: (value) => onChangeHandler('medium_other', value),
                          initialValue: inputValue.medium_other || '',
                          rules: [{required: true, message: '请输入其他影像资料承载媒介'}]})}
                        type="text"
                        placeholder='请输入...'
                        value={inputValue.medium_other || ''}
                      />
                      {getFieldError('medium_other') ? <p className='surveyError'>{getFieldError('medium_other')}</p>:''}

                      <WhiteSpace size="lg" />
                    </div>
                  ) : ''}
                </div>
              ))}
            </List>
          ) : ''}

          <WhiteSpace size="lg" />

          <p className='info_title'>六、建议意见</p>
          <WhiteSpace size="lg" />

          <p className='info_content'>1.目前导管室的数量能够满足您科的工作量吗？<span>*</span> </p>
          {getFieldError('satisfied') ? <p className='surveyError'>{getFieldError('satisfied')}</p>:''}
          {satisfied.map(i => (
            <RadioItem
              {...getFieldProps('satisfied', {
                initialValue: inputValue.satisfied || '',
                rules: [{required: true, message: '请选择目前导管室的数量能够满足您科的工作量吗？'}]})}
              key={i.value}
              checked={i.value === inputValue.satisfied}
              onChange={onChangeHandler.bind(this, 'satisfied', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}

          <WhiteSpace size="lg" />

          <p className='info_content'>2.导管室人员中最紧缺的是？<i>（多选）</i> <span>*</span> </p>
          {getFieldError('lack') ? <p className='surveyError'>{getFieldError('lack')}</p>:''}
          {lack.map(i => (
            <CheckboxItem
              key={i.value}
              {...getFieldProps('lack', {
                initialValue: inputValue.lack || '',
                rules: [{required: true, message: '请选择导管室人员中最紧缺的是？'}]})}
              // checked={i.value === (inputValue.groupSurgeryDoctorsOperationScope && inputValue.groupSurgeryDoctorsOperationScope[i.value])}
              checked={inputValue.lack && Array.isArray(inputValue.lack) && inputValue.lack.indexOf(i.value) > -1}
              onChange={onChangeHandler.bind(this, 'lack', i.value,  'checkbox')}
            >
              {i.label}
            </CheckboxItem>
          ))}

          <WhiteSpace size="lg" />

          <p className='info_content'>3.导管室工作经常加班吗？<span>*</span> </p>
          {getFieldError('overtime') ? <p className='surveyError'>{getFieldError('overtime')}</p>:''}
          {overtime.map(i => (
            <RadioItem
              {...getFieldProps('overtime', {
                initialValue: inputValue.overtime || '',
                rules: [{required: true, message: '请选择导管室工作经常加班吗？'}]})}
              key={i.value}
              checked={i.value === inputValue.overtime}
              onChange={onChangeHandler.bind(this, 'overtime', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}

          <WhiteSpace size="lg" />

          <p className='info_content'>4.冠心病造影检查除了心脏科是否其他科室也开展？<span>*</span> </p>
          {getFieldError('ca') ? <p className='surveyError'>{getFieldError('ca')}</p>:''}
          {ca.map(i => (
            <div key={i.value}>
              <RadioItem
                {...getFieldProps('ca', {
                  initialValue: inputValue.ca || '',
                  rules: [{required: true, message: '请选择冠心病造影检查除了心脏科是否其他科室也开展？'}]})}
                key={i.value}
                checked={i.value === inputValue.ca}
                onChange={onChangeHandler.bind(this, 'ca', i.value)}
              >
                {i.label}
              </RadioItem>
            </div>
          ))}

          {inputValue.ca === '是' ? (
            <List>
              <p className='info_content'>冠心病造影检查还有哪科室开展？<span>*</span></p>
              {getFieldError('caDepartment') ? <p className='surveyError'>{getFieldError('caDepartment')}</p>:''}
              <InputItem
                {...getFieldProps('caDepartment', {onChange: (value) => onChangeHandler('caDepartment', value),
                  initialValue: inputValue.caDepartment || '',
                  rules: [{required: true, message: '请输入冠心病造影检查还有哪科室开展'}]})}
                type="text"
                value={inputValue.caDepartment || ''}
              />

              <WhiteSpace size="lg" />

              <p className='info_content'>其他科室每周造影检查数量？（例/周）<span>*</span></p>
              {getFieldError('caCount') ? <p className='surveyError'>{getFieldError('caCount')}</p>:''}
              <InputItem
                {...getFieldProps('caCount', {onChange: (value) => onChangeHandler('caCount', value),
                  initialValue: inputValue.caCount || '',
                  rules: [{required: true, message: '请输入其他科室每周造影检查数量'}]})}
                type="number"
                value={inputValue.caCount || ''}
              />

              <WhiteSpace size="lg" />

            </List>
          ) : ''}

          <WhiteSpace size="lg" />

          <p className='info_content'>5.心脏介入治疗除了心脏科是否其他科室也开展？<span>*</span> </p>
          {getFieldError('pci') ? <p className='surveyError'>{getFieldError('pci')}</p>:''}
          {pci.map(i => (
            <div key={i.value}>
              <RadioItem
                {...getFieldProps('pci', {
                  initialValue: inputValue.pci || '',
                  rules: [{required: true, message: '请选择心脏介入治疗除了心脏科是否其他科室也开展？'}]})}
                key={i.value}
                checked={i.value === inputValue.pci}
                onChange={onChangeHandler.bind(this, 'pci', i.value)}
              >
                {i.label}
              </RadioItem>
            </div>
          ))}

          {inputValue.pci === '是' ? (
            <List>
              <p className='info_content'>心脏介入治疗其他哪科室也开展？<span>*</span></p>
              {getFieldError('pciDepartment') ? <p className='surveyError'>{getFieldError('pciDepartment')}</p>:''}
              <InputItem
                {...getFieldProps('pciDepartment', {onChange: (value) => onChangeHandler('pciDepartment', value),
                  initialValue: inputValue.pciDepartment || '',
                  rules: [{required: true, message: '请输入冠心病造影检查还有哪科室开展'}]})}
                type="text"
                value={inputValue.pciDepartment || ''}
              />

              <WhiteSpace size="lg" />
            </List>
          ) : ''}

          <WhiteSpace size="lg" />

          <p className='info_content'>6.目前开展心导管室工作最困难的是：<span>*</span> </p>
          {getFieldError('trouble') ? <p className='surveyError'>{getFieldError('trouble')}</p>:''}
          <TextareaItem
            {...getFieldProps('trouble', {onChange: (value) => onChangeHandler('trouble', value),
              initialValue: inputValue.trouble || '',
              rules: [{required: true, message: '请输入目前开展心导管室工作最困难的是'}]})}
            type="text"
            rows={3}
            value={inputValue.trouble || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>7.建议的培训项目或内容：<span>*</span> </p>
          {getFieldError('program') ? <p className='surveyError'>{getFieldError('program')}</p>:''}
          <TextareaItem
            {...getFieldProps('program', {onChange: (value) => onChangeHandler('program', value),
              initialValue: inputValue.program || '',
              rules: [{required: true, message: '请输入建议的培训项目或内容'}]})}
            type="text"
            rows={5}
            value={inputValue.program || ''}
          />

          <WhiteSpace size="lg" />

          <p className='info_content'>8.给行政部门或质控中心的建议：<span>*</span> </p>
          {getFieldError('suggest') ? <p className='surveyError'>{getFieldError('suggest')}</p>:''}
          <TextareaItem
            {...getFieldProps('suggest', {onChange: (value) => onChangeHandler('suggest', value),
              initialValue: inputValue.suggest || '',
              rules: [{required: true, message: '请输入给行政部门或质控中心的建议'}]})}
            type="text"
            rows={5}
            value={inputValue.suggest || ''}
          />

          <WhiteSpace size="lg" />
        </List>


        {/*<WorkLoad2018 onChangeHandler={this.onChangeHandler} getFieldProps={getFieldProps} isFieldTouched={isFieldTouched} getFieldError={getFieldError}/>*/}

        <WhiteSpace size="lg" />

        <p className='info_content'>填表人 <span>*</span></p>
        {getFieldError('name') ? <p className='surveyError'>{getFieldError('name')}</p>:''}
        <InputItem
          {...getFieldProps('name', {onChange: (value) => onChangeHandler('name', value),
            initialValue: inputValue.name || '',
            rules: [{required: true, message: '请输入填表人'}]})}
          type="text"
          value={inputValue.name || ''}
        />

        <WhiteSpace size="lg" />

        <p className='info_content'>填表日期 <span>*</span></p>
        {getFieldError('date') ? <p className='surveyError'>{getFieldError('date')}</p>:''}
        <DatePicker
          {...getFieldProps('date', {onChange: (value) => onChangeHandler('date', value),
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
