import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  List,
  InputItem,
  Picker,
  WhiteSpace,
  // DatePicker,
  Button,
  Toast,
  Radio,
} from 'antd-mobile'
import  createDOMForm  from 'rc-form/lib/createDOMForm';
import moment from 'moment'
import {getHospitalDataAction, surveyStoreLocalAction, saveSurveyAction} from "../../Store/actions/survey.action";
import { hospitalName, hospitalLevel, ifExpand } from './SurveyData';

const RadioItem = Radio.RadioItem;
// const CheckboxItem = Checkbox.CheckboxItem;

class BasicInformation extends React.Component {

  onChangeHandler = (key, value, type, id, i) => {
    const store = this.props;
    // const {inputValue} = store;
    const {setFieldsValue} = this.props.form;
    switch (key) {
      case 'ca_heartSick':
        setFieldsValue({
          ca_heartSick: value,
        });
        break;
      case 'hasCa':
        setFieldsValue({
          hasCa: value,
        });
        break;
      case 'hasAt':
        setFieldsValue({
          hasAt: value,
        });
        break;
      case 'hasShd':
        setFieldsValue({
          hasShd: value,
        });
        break;
      case 'car':
        setFieldsValue({
          car: value,
        });
        break;
      case 'atr':
        setFieldsValue({
          atr: value,
        });
        break;
      case 'shdr':
        setFieldsValue({
          shdr: value,
        });
        break;
      default:
        break;
    }
    if(key === 'date') {
      value = moment(value).format('YYYY-MM-DD');
    }
    // if(id && typeof id === 'string' && id.indexOf('dsaDate') > -1) {
    //   value = moment(value).format('YYYY-MM');
    // }
    // console.log(typeof key, typeof value);
    // console.log(type)
    // console.log(key, value, type, id, i);
    if(key === 'hospitalName' || key === 'hospitalLevel'){
      value = value.toString();
    }

    // if(key === 'pci'){
    //   store.dispatch(surveyStoreLocalAction('update', key, value));
    //   store.dispatch(surveyStoreLocalAction('update', 'bracket', value));
    //   return ;
    // }else if(key === 'bracket'){
    //   if(Number(value) >= Number(inputValue.pci)){
    //     store.dispatch(surveyStoreLocalAction('update', key, value));
    //   }
    //   return ;
    // }

    if(value !== '.'){
      store.dispatch(surveyStoreLocalAction('update', key, value));
    }
    // console.log(value)
    // if(value !== '.' && key === 'dtob'){
    //   store.dispatch(surveyStoreLocalAction('update', key, value));
    // }else if(key === 'cpc'){
    //   store.dispatch(surveyStoreLocalAction('update', key, value));
    // }else if(value !== '.'){
    //   const vl = parseInt(value).toString();
    //   store.dispatch(surveyStoreLocalAction('update', key, vl));
    // }else{
    //   store.dispatch(surveyStoreLocalAction('update', key, value));
    // }


    if(key === 'hospitalName'){
      store.dispatch(getHospitalDataAction(value.toString()));
    }
  }

  numHandler = (rule, value ,callback) => {
    // console.log(rule)
    // console.log(typeof value, value)
    // const store = this.props;
    const {setFieldsValue, getFieldValue} = this.props.form;  //setFieldsValue
    // const fieldVl = rule.field;
    // console.log(getFieldValue('pci'));

    if(rule.field === 'pci'){
      if(+value > +getFieldValue('bracket')){
        callback(' 此空需小于植入支架总数');
      }else{
        if(getFieldValue('bracket') === null || getFieldValue('bracket') === ''){
          return ;
        }else{
          setFieldsValue({
            bracket: getFieldValue('bracket')
          })
        }
      }
    }else if(rule.field === 'bracket'){
      if(+value < +getFieldValue('pci')){
        callback(' 此空需大于PCI术');
      }else{
        if(getFieldValue('pci') === null || getFieldValue('pci') === ''){
          return ;
        }else{
          setFieldsValue({
            pci: getFieldValue('pci')
          })
        }

      }
    }else if (value && !(+value >= 0)) {
      // setFieldsValue({
      //   [fieldVl]: 0
      // })
      // store.dispatch(surveyStoreLocalAction('update', fieldVl, ''));
      callback('请重新输入')
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }

  submit = () => {
    const {validateFieldsAndScroll} = this.props.form; //isFieldTouched, getFieldError, validateFields

    const { inputValue } = this.props.globalReducer;
    let submitData = Object.assign({}, inputValue);

    // console.log(submitData)
    validateFieldsAndScroll({first: true, force: true, scroll:{offsetTop: 200}}, (error) => {
      const store = this.props;
      const {getFieldError} = this.props.form;
      const router = this.props.history;
      if (!error) {
        // Object.keys(submitData).forEach((key)=>{
        //   if(key === 'hospitalName' || key === 'hospitalLevel'){
        //     submitData[key] = submitData[key].toString();
        //   }
        // })
        // delete submitData['canSelect0'];
        console.log(submitData);
        // console.log(getFieldsValue());
        // setFieldsValue({
        //   hospitalName: getFieldValue('hospitalName').toString(),
        //   hospitalLevel: getFieldValue('hospitalLevel').toString(),
        // })
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
    const { questions, inputValue } = this.props;
    const { getFieldProps, getFieldError } = this.props.form;  //getFieldsError, isFieldTouched
    let onChangeHandler = this.onChangeHandler;
    const xlData = [
      ['起搏器植入术', 'pi', 'sl', 'dl', 'picp', 'piDead', '其中，单腔多少例？', '双腔多少例？'],
      ['ICD植入术', 'icd', 'fi', 'se', 'icdcp', 'icdDead',  '其中，一级预防植入多少例？', '二级预防植入多少例？'],
      ['CRT植入术', 'crt', 'crtp', 'crtd', 'crtcp', 'crtDead', '其中，CRT-P植入多少例？', 'CRT-D植入多少例？'],
      ['射频消融术', 'af', 'psvt', 'aoaf', 'afcp', 'afDead', '其中，PSVT多少例？', '射频消融多少例？'],
    ];
    // 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
    // const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
    // let moneyKeyboardWrapProps;
    // if (isIPhone) {
    //   moneyKeyboardWrapProps = {
    //     onTouchStart: e => e.preventDefault(),
    //   };
    // }

    return (
      <React.Fragment>

        <List>
          {/*<p className='info_content'>医院的等级 <span>*</span></p>*/}
          {/*{getFieldError('hospitalLevel') ? <p className='surveyError'>{getFieldError('hospitalLevel')}</p>:''}*/}
          {/*<Picker*/}
            {/*{...getFieldProps('hospitalLevel', {onChange: (value) => onChangeHandler('hospitalLevel', value),*/}
              {/*initialValue: inputValue.hospitalLevel || '',*/}
              {/*rules: [{required: true, message: '请选择医院的等级'}]})}*/}
            {/*value={inputValue.hospitalLevel || ''}*/}
            {/*data={hospitalLevel}*/}
            {/*cols={1}>*/}
            {/*<List.Item arrow="horizontal"> </List.Item>*/}
          {/*</Picker>*/}

          {/*<WhiteSpace size="lg" />*/}

          <p className='info_title'>基本信息</p>
          <p className='info_content'>医院名称 <span>*</span></p>
          {getFieldError('hospitalName') ? <p className='surveyError'>{getFieldError('hospitalName')}</p>:''}
          <Picker
            {...getFieldProps('hospitalName', {onChange: (value) => onChangeHandler('hospitalName', value),
              initialValue: (inputValue.hospitalName && [inputValue.hospitalName]) || '',
              rules: [{required: true, message: '请选择医院的名称'}]})}
            value={(inputValue.hospitalName && [inputValue.hospitalName]) || ''}
            data={hospitalName}
            cols={1}>
            <List.Item arrow="horizontal" className='hospitalName'> </List.Item>
          </Picker>
          <WhiteSpace size="lg" />

          <p className='info_content'>医院等级 <span>*</span></p>
          {getFieldError('hospitalLevel') ? <p className='surveyError'>{getFieldError('hospitalLevel')}</p>:''}
          <Picker
            {...getFieldProps('hospitalLevel', {onChange: (value) => onChangeHandler('hospitalLevel', value),
              initialValue: (inputValue.hospitalLevel && [inputValue.hospitalLevel]) || '',
              rules: [{required: true, message: '请选择医院的等级'}]})}
            value={(inputValue.hospitalLevel && [inputValue.hospitalLevel]) || ''}
            data={hospitalLevel}
            cols={1}>
            <List.Item arrow="horizontal"> </List.Item>
          </Picker>
          <WhiteSpace size="lg" />
        </List>

        {/*-------------------------冠心病--------------------------------------------------冠心病-------------------------*/}
        <WhiteSpace size="lg" style={{borderBottom: '2px dotted gray'}}/>
        <List>
          <p className='info_title'>2018年冠心病介入治疗信息收集表数据上报</p>

          <p className='info_content'>2018年是否开展冠心病介入治疗？<span>*</span></p>
          {getFieldError('hasCa') ? <p className='surveyError'>{getFieldError('hasCa')}</p>:''}
          {ifExpand.map(i => (
            <RadioItem
              {...getFieldProps('hasCa', {
                initialValue: inputValue.hasCa || '',
                rules: [{required: true, message: '请选择此选项'}]})}
              key={i.value}
              checked={i.value === inputValue.hasCa}
              onChange={onChangeHandler.bind(this, 'hasCa', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          <WhiteSpace size="lg" />
        </List>

        {inputValue.hasCa === '是' ? (
          <List>
            {questions.map(question => {
              if(question.category === 'ca'){
                switch (question.type) {
                  case 'input':
                    return (
                      <React.Fragment key={question.key}>
                        <p className='info_content'>{question.title}<span>*</span></p>
                        {getFieldError(`${question.key}`) ? <p className='surveyError'>{getFieldError(`${question.key}`)}</p>:''}
                        <InputItem
                          {...getFieldProps(`${question.key}`, {onChange: (value) => onChangeHandler(`${question.key}`, value),
                            // initialValue: inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`],
                            initialValue: inputValue[`${question.key}`] || '',
                            rules: [{required: true, message: '请输入此空'},{validator: this.numHandler}]})}
                          type="money"
                          clear
                          moneyKeyboardAlign="left"
                          value={inputValue[`${question.key}`] || ''}
                          // value={inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`]}
                        />
                        <WhiteSpace size="lg" />
                      </React.Fragment>
                    )
                  // case 'ifInput':
                  //   return (
                  //     <React.Fragment key={question.key}>
                  //       <p className='info_content'>{question.title}<span>*</span></p>
                  //       {getFieldError(`${question.key}`) ? <p className='surveyError'>{getFieldError(`${question.key}`)}</p>:''}
                  //       <InputItem
                  //         {...getFieldProps(`${question.key}`, {onChange: (value) => onChangeHandler(`${question.key}`, value),
                  //           // initialValue: inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`],
                  //           initialValue: inputValue[`${question.key}`] || '',
                  //           rules: [{validator: this.numHandler}]
                  //         })}
                  //         type="money"
                  //         clear
                  //         moneyKeyboardAlign="left"
                  //         value={inputValue[`${question.key}`] || ''}
                  //         // value={inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`]}
                  //       />
                  //       <WhiteSpace size="lg" />
                  //     </React.Fragment>
                  //   )
                  case 'selection':
                    return (
                      <React.Fragment key={question.key}>
                        <p className='info_content'>{question.title}<span>*</span></p>
                        {getFieldError(`${question.key}`) ? <p className='surveyError'>{getFieldError(`${question.key}`)}</p>:''}
                        <List>
                          {question.option && question.option.map(i => (
                            <RadioItem
                              {...getFieldProps(`${question.key}`, {
                                initialValue: inputValue[`${question.key}`] || '',
                                // initialValue: inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`],
                                rules: [{required: true, message: '请选择此选项'}]})}
                              key={i.value}
                              checked={inputValue[`${question.key}`] === i.value}
                              // checked={inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`] === i.value}
                              // onChange={onChangeHandler.bind(this, `${question.category}`, i.value, 'survey', `${question.key}`)}
                              onChange={onChangeHandler.bind(this, `${question.key}`, i.value)}
                            >
                              {i.label}
                            </RadioItem>
                          ))}
                        </List>
                        <WhiteSpace size="lg" />
                      </React.Fragment>
                    )
                  default:
                    return null;
                }
              }else{
                return null;
              }

            })}
          </List>
        ) : ''}

        {inputValue.hasCa === '是' && inputValue.car === '是' ? (
          <List>
            {/*<p className='info_content' style={{color: 'red'}}>以下内容是经认证的培训基地中心填写</p>*/}
            {/*<WhiteSpace size="lg" />*/}
            <p className='info_content'>冠心病介入治疗培训基地导师人数多少人？<span>*</span></p>
            {getFieldError('caTutor') ? <p className='surveyError'>{getFieldError('caTutor')}</p>:''}
            <InputItem
              {...getFieldProps('caTutor', {onChange: (value) => onChangeHandler('caTutor', value),
                initialValue: inputValue.caTutor || '',
                rules: [{required: true, message: '请输入此空'}, {validator: this.numHandler}]
                // rules: [{required: true, message: '请输入此空'}]
              })}
              type="money"
              clear
              moneyKeyboardAlign="left"
              value={inputValue.caTutor || ''}
            />

            <WhiteSpace size="lg" />

            <p className='info_content'>2018年接收培训学员多少人？<span>*</span></p>
            {getFieldError('caStudent') ? <p className='surveyError'>{getFieldError('caStudent')}</p>:''}
            <InputItem
              {...getFieldProps('caStudent', {onChange: (value) => onChangeHandler('caStudent', value),
                initialValue: inputValue.caStudent || '',
                rules: [{required: true, message: '请输入此空'}, {validator: this.numHandler}]
                // rules: [{required: true, message: '请输入此空'}]
              })}
              type="money"
              clear
              moneyKeyboardAlign="left"
              value={inputValue.caStudent || ''}
            />

            <WhiteSpace size="lg" />
          </List>
        ) : ''}


        {/*-------------------------心律失常--------------------------------------------------心律失常-------------------------*/}
        <WhiteSpace size="lg" style={{borderBottom: '2px dotted gray'}}/>
        <List>
          <p className='info_title'>2018年心律失常介入治疗信息收集表数据上报</p>

          <p className='info_content'>2018年是否开展心律失常介入治疗？<span>*</span></p>
          {getFieldError('hasAt') ? <p className='surveyError'>{getFieldError('hasAt')}</p>:''}
          {ifExpand.map(i => (
            <RadioItem
              {...getFieldProps('hasAt', {
                initialValue: inputValue.hasAt || '',
                rules: [{required: true, message: '请选择此选项'}]})}
              key={i.value}
              checked={i.value === inputValue.hasAt}
              onChange={onChangeHandler.bind(this, 'hasAt', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          <WhiteSpace size="lg" />

          {inputValue.hasAt === '是' ? (
            <List>
              {xlData.map((operation, index) => {
                return (
                  <div key={index}>

                    <p className='info_content'>{operation[0]}<span>*</span></p>
                    {getFieldError(`op_${operation[1]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[1]}${index}`)}</p>:''}
                    <InputItem
                      {...getFieldProps(`op_${operation[1]}${index}`, {onChange: (value) => onChangeHandler(operation[1], value),
                        initialValue: inputValue[operation[1]] || '',
                        rules: [{required: true, message: '请输入此空'},{validator: this.numHandler}]})}
                      type="number"
                      // clear
                      // moneyKeyboardAlign="left"
                      value={inputValue[operation[1]] || ''}
                    />

                    <WhiteSpace size="lg" />

                    {inputValue[operation[1]] > 0 ? (
                      <List>
                        <p className='info_contentChild'>{operation[6]}<span>*</span></p>
                        {getFieldError(`op_${operation[2]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[2]}${index}`)}</p>:''}
                        <InputItem
                          {...getFieldProps(`op_${operation[2]}${index}`, {onChange: (value) => onChangeHandler(operation[2], value),
                            // initialValue: inputValue[operation[8]] && inputValue[operation[8]][operation[2]],
                            initialValue: inputValue[operation[2]] || '',
                            rules: [{required: true, message: '请输入此空'},{validator: this.numHandler}]})}
                          type="money"
                          clear
                          moneyKeyboardAlign="left"
                          value={inputValue[operation[2]] || ''}
                          // value={inputValue[operation[8]] && inputValue[operation[8]][operation[2]]}
                        />

                        <WhiteSpace size="lg" />

                        <p className='info_contentChild'>{operation[7]}<span>*</span></p>
                        {getFieldError(`op_${operation[3]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[3]}${index}`)}</p>:''}
                        <InputItem
                          {...getFieldProps(`op_${operation[3]}${index}`, {onChange: (value) => onChangeHandler(operation[3], value),
                            initialValue: inputValue[operation[3]] || '',
                            rules: [{required: true, message: '请输入此空'},{validator: this.numHandler}]})}
                          type="money"
                          clear
                          moneyKeyboardAlign="left"
                          value={inputValue[operation[3]] || ''}
                        />

                        <WhiteSpace size="lg" />

                        <p className='info_contentChild'>并发症多少例？<span>*</span></p>
                        {getFieldError(`op_${operation[4]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[4]}${index}`)}</p>:''}
                        <InputItem
                          {...getFieldProps(`op_${operation[4]}${index}`, {onChange: (value) => onChangeHandler(operation[4], value),
                            initialValue: inputValue[operation[4]] || '',
                            rules: [{required: true, message: '请输入此空'},{validator: this.numHandler}]})}
                          type="money"
                          clear
                          moneyKeyboardAlign="left"
                          value={inputValue[operation[4]] || ''}
                        />

                        <WhiteSpace size="lg" />

                        <p className='info_contentChild'>死亡多少例？<span>*</span></p>
                        {getFieldError(`op_${operation[5]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[5]}${index}`)}</p>:''}
                        <InputItem
                          {...getFieldProps(`op_${operation[5]}${index}`, {onChange: (value) => onChangeHandler(operation[5], value),
                            initialValue: inputValue[operation[5]] || '',
                            rules: [{required: true, message: '请输入此空'},{validator: this.numHandler}]})}
                          type="money"
                          clear
                          moneyKeyboardAlign="left"
                          value={inputValue[operation[5]] || ''}
                        />

                        <WhiteSpace size="lg" />
                      </List>
                    ) : ''}
                  </div>
                )
              })}

              <p className='info_content'>是否经认证的培训基地中心填写？<span>*</span></p>
              {getFieldError('atr') ? <p className='surveyError'>{getFieldError('atr')}</p>:''}
              {ifExpand.map(i => (
                <RadioItem
                  {...getFieldProps('atr', {
                    initialValue: inputValue.atr || '',
                    rules: [{required: true, message: '请选择此选项'}]})}
                  key={i.value}
                  checked={i.value === inputValue.atr}
                  onChange={onChangeHandler.bind(this, 'atr', i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}
              <WhiteSpace size="lg" />

              {inputValue.atr === '是' ? (
                <List>
                  {/*<p className='info_content' style={{color: 'red'}}>以下内容是经认证的培训基地中心填写</p>*/}
                  {/*<WhiteSpace size="lg" />*/}
                  <p className='info_content'>心律失常介入治疗培训基地导师人数多少人？<span>*</span></p>
                  {getFieldError('atTutor') ? <p className='surveyError'>{getFieldError('atTutor')}</p>:''}
                  <InputItem
                    {...getFieldProps('atTutor', {onChange: (value) => onChangeHandler('atTutor', value),
                      initialValue: inputValue.atTutor || '',
                      rules: [{required: true, message: '请输入此空'}, {validator: this.numHandler}]
                      // rules: [{required: true, message: '请输入此空'}]
                    })}
                    type="money"
                    clear
                    moneyKeyboardAlign="left"
                    value={inputValue.atTutor || ''}
                  />

                  <WhiteSpace size="lg" />

                  <p className='info_content'>2018年接收培训学员多少人？<span>*</span></p>
                  {getFieldError('atStudent') ? <p className='surveyError'>{getFieldError('atStudent')}</p>:''}
                  <InputItem
                    {...getFieldProps('atStudent', {onChange: (value) => onChangeHandler('atStudent', value),
                      initialValue: inputValue.atStudent || '',
                      rules: [{required: true, message: '请输入此空'}, {validator: this.numHandler}]
                      // rules: [{required: true, message: '请输入此空'}]
                    })}
                    type="money"
                    clear
                    moneyKeyboardAlign="left"
                    value={inputValue.atStudent || ''}
                  />

                  <WhiteSpace size="lg" />
                </List>
              ) : ''}



            </List>
          ) : ''}
        </List>


        {/*-------------------------结构性心脏病--------------------------------------------------结构性心脏病-------------------------*/}
        <WhiteSpace size="lg" style={{borderBottom: '2px dotted gray'}}/>
        <List>
          <p className='info_title'>2018年结构性心脏病介入信息数据上报</p>

          <p className='info_content'>2018年是否开展结构性心脏病介入治疗？<span>*</span></p>
          {getFieldError('hasShd') ? <p className='surveyError'>{getFieldError('hasShd')}</p>:''}
          {ifExpand.map(i => (
            <RadioItem
              {...getFieldProps('hasShd', {
                initialValue: inputValue.hasShd || '',
                rules: [{required: true, message: '请选择此选项'}]})}
              key={i.value}
              checked={i.value === inputValue.hasShd}
              onChange={onChangeHandler.bind(this, 'hasShd', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          <WhiteSpace size="lg" />
        </List>

        {inputValue.hasShd === '是' ? (
          <List>
            {questions.map(question => {
              if(question.category === 'con'){
                switch (question.type) {
                  case 'input':
                    return (
                      <React.Fragment key={question.key}>
                        <p className='info_content'>{question.title}<span>*</span></p>
                        {getFieldError(`${question.key}`) ? <p className='surveyError'>{getFieldError(`${question.key}`)}</p>:''}
                        <InputItem
                          {...getFieldProps(`${question.key}`, {onChange: (value) => onChangeHandler(`${question.key}`, value),
                            // initialValue: inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`],
                            initialValue: inputValue[`${question.key}`] || '',
                            rules: [{required: true, message: '请输入此空'},{validator: this.numHandler}]})}
                          type="money"
                          clear
                          moneyKeyboardAlign="left"
                          value={inputValue[`${question.key}`] || ''}
                          // value={inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`]}
                        />
                        <WhiteSpace size="lg" />
                      </React.Fragment>
                    )
                  case 'selection':
                    return (
                      <React.Fragment key={question.key}>
                        <p className='info_content'>{question.title}<span>*</span></p>
                        {getFieldError(`${question.key}`) ? <p className='surveyError'>{getFieldError(`${question.key}`)}</p>:''}
                        <List>
                          {question.option && question.option.map(i => (
                            <RadioItem
                              {...getFieldProps(`${question.key}`, {
                                initialValue: inputValue[`${question.key}`] || '',
                                // initialValue: inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`],
                                rules: [{required: true, message: '请选择此选项'}]})}
                              key={i.value}
                              checked={inputValue[`${question.key}`] === i.value}
                              // checked={inputValue[`${question.category}`] && inputValue[`${question.category}`][`${question.key}`] === i.value}
                              // onChange={onChangeHandler.bind(this, `${question.category}`, i.value, 'survey', `${question.key}`)}
                              onChange={onChangeHandler.bind(this, `${question.key}`, i.value)}
                            >
                              {i.label}
                            </RadioItem>
                          ))}
                        </List>
                        <WhiteSpace size="lg" />
                      </React.Fragment>
                    )
                  // case 'title':
                  //   return (
                  //     <React.Fragment key={question.key}>
                  //       <p className='info_title'>{question.title}</p>
                  //       <WhiteSpace size="lg" />
                  //     </React.Fragment>
                  //   )
                  default:
                    return null;
                }
              }else{
                return null;
              }

            })}
          </List>
        ) : ''}

        {inputValue.hasShd === '是' && inputValue.shdr === '是' ? (
          <List>
            {/*<p className='info_content' style={{color: 'red'}}>以下内容是经认证的培训基地中心填写</p>*/}
            {/*<WhiteSpace size="lg" />*/}
            <p className='info_content'>先心病介入治疗培训基地导师人数多少人？<span>*</span></p>
            {getFieldError('shdTutor') ? <p className='surveyError'>{getFieldError('shdTutor')}</p>:''}
            <InputItem
              {...getFieldProps('shdTutor', {onChange: (value) => onChangeHandler('shdTutor', value),
                initialValue: inputValue.shdTutor || '',
                rules: [{required: true, message: '请输入此空'}, {validator: this.numHandler}]
                // rules: [{required: true, message: '请输入此空'}]
              })}
              type="money"
              clear
              moneyKeyboardAlign="left"
              value={inputValue.shdTutor || ''}
            />

            <WhiteSpace size="lg" />

            <p className='info_content'>2018年接收培训学员多少人？<span>*</span></p>
            {getFieldError('shdStudent') ? <p className='surveyError'>{getFieldError('shdStudent')}</p>:''}
            <InputItem
              {...getFieldProps('shdStudent', {onChange: (value) => onChangeHandler('shdStudent', value),
                initialValue: inputValue.shdStudent || '',
                rules: [{required: true, message: '请输入此空'}, {validator: this.numHandler}]
                // rules: [{required: true, message: '请输入此空'}]
              })}
              type="money"
              clear
              moneyKeyboardAlign="left"
              value={inputValue.shdStudent || ''}
            />

            <WhiteSpace size="lg" />
          </List>
        ) : ''}
        

        {/*<WhiteSpace size="lg" />*/}
        {/*<WhiteSpace size="lg" />*/}
        
        {/*<p className='info_content'>填表人 <span>*</span></p>*/}
        {/*{getFieldError('name') ? <p className='surveyError'>{getFieldError('name')}</p>:''}*/}
        {/*<InputItem*/}
          {/*{...getFieldProps('name', {onChange: (value) => onChangeHandler('name', value),*/}
            {/*initialValue: inputValue.name || '',*/}
            {/*rules: [{required: true, message: '请输入填表人'}]})}*/}
          {/*type="text"*/}
          {/*value={inputValue.name || ''}*/}
        {/*/>*/}

        {/*<WhiteSpace size="lg" />*/}

        {/*<p className='info_content'>填表日期 <span>*</span></p>*/}
        {/*{getFieldError('date') ? <p className='surveyError'>{getFieldError('date')}</p>:''}*/}
        {/*<DatePicker*/}
          {/*{...getFieldProps('date', {onChange: (value) => onChangeHandler('date', value),*/}
            {/*initialValue: inputValue.date && new Date(inputValue.date),*/}
            {/*rules: [{required: true, message: '请输入填表日期'}]})}*/}
          {/*mode="date"*/}
          {/*title=""*/}
          {/*value={inputValue.date && new Date(inputValue.date)}*/}
          {/*minDate={new Date(`${new Date().getFullYear() - 120}-01-01`)}*/}
          {/*maxDate={new Date()}*/}
        {/*>*/}
          {/*<List.Item arrow="horizontal"> </List.Item>*/}
        {/*</DatePicker>*/}

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <Button type='primary' size='large' inline className='submit' onClick={this.submit} >提交</Button>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(createDOMForm()(BasicInformation)))
