import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, Radio, WhiteSpace, Checkbox } from 'antd-mobile'
// import { createForm } from 'rc-form';

import {
  pciOperation,
  operaCheckWay,
  pcCheckWay,
  imageManage,
  medium,
  satisfied,
  lack,
  overtime,
  ca,
  pci,
} from './SurveyData'

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;

class WorkLoad2018 extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props;  //getFieldsError
    const workLoadList = [
      ['PCI手术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'pciCommonDto'],
      ['起搏器手术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'poCommonDto'],
      ['射频消融术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'rfCommonDto'],
      ['先心病介入', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'chdCommonDto'],
      ['左心耳封堵术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'laacCommonDto'],
      ['经皮主动脉瓣膜置换/成形术', 'ifHave', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate', 'pavCommonDto']
    ];
    let workLoad = workLoadList.map((operation, index) => {
      return (
        <div key={index}>
          <p className='info_content'>{operation[0]}<span>*</span> </p>
          {pciOperation.map(i => (
            <RadioItem
              {...getFieldProps(`op_${operation[1]}${index}`, {
                initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[1]],
                rules: [{message: `请选择${operation[index]}`}]})}
              key={i.value}
              checked={inputValue[operation[9]] && inputValue[operation[9]][operation[1]] === i.value}
              // error={isFieldTouched('pciOperation') && getFieldError('pciOperation')}
              // onErrorClick={() => Toast.info(getFieldError('pciOperation'))}
              onChange={onChangeHandler.bind(this, operation[9], i.value, 'survey', operation[1])}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched(`op_${operation[1]}${index}`) && getFieldError(`op_${operation[1]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[1]}${index}`)}</p>:''}

          <WhiteSpace size="lg" />

          {inputValue[operation[9]] && inputValue[operation[9]][operation[1]] === '已开展' ? (
            <List>
              <p className='info_content'>手术量（单位：例）<span>*</span></p>
              <InputItem
                {...getFieldProps(`op_${operation[2]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[2]),
                  initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[2]],
                  rules: [{required: true, message: '请输入手术量'}]})}
                type="text"
                value={inputValue[operation[9]] && inputValue[operation[9]][operation[2]]}
              />
              {getFieldError(`op_${operation[2]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[2]}${index}`)}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>其中，急诊手术量（单位：例）<span>*</span></p>
              <InputItem
                {...getFieldProps(`op_${operation[3]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[3]),
                  initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[3]],
                  rules: [{required: true, message: '请输入急诊手术量'}]})}
                type="text"
                value={inputValue[operation[9]] && inputValue[operation[9]][operation[3]]}
              />
              {getFieldError(`op_${operation[3]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[3]}${index}`)}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>病种比例（收治此类病人数/住院总人次数）（单位：%）<span>*</span></p>
              <InputItem
                {...getFieldProps(`op_${operation[4]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[4]),
                  initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[4]],
                  rules: [{required: true, message: '请输入病种比例'}]})}
                type="text"
                value={inputValue[operation[9]] && inputValue[operation[9]][operation[4]]}
              />
              {getFieldError(`op_${operation[4]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[4]}${index}`)}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>平均住院日（单位：日）<span>*</span></p>
              <InputItem
                {...getFieldProps(`op_${operation[5]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[5]),
                  initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[5]],
                  rules: [{required: true, message: '请输入平均住院日'}]})}
                type="text"
                value={inputValue[operation[9]] && inputValue[operation[9]][operation[5]]}
              />
              {getFieldError(`op_${operation[5]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[5]}${index}`)}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>平均手术费用（单位：元）<span>*</span></p>
              <InputItem
                {...getFieldProps(`op_${operation[6]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[6]),
                  initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[6]],
                  rules: [{required: true, message: '请输入平均手术费用'}]})}
                type="text"
                value={inputValue[operation[9]] && inputValue[operation[9]][operation[6]]}
              />
              {getFieldError(`op_${operation[6]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[6]}${index}`)}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>治愈率（单位：%）<span>*</span></p>
              <InputItem
                {...getFieldProps(`op_${operation[7]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[7]),
                  initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[7]],
                  rules: [{required: true, message: '请输入治愈率'}]})}
                type="text"
                value={inputValue[operation[9]] && inputValue[operation[9]][operation[7]]}
              />
              {getFieldError(`op_${operation[7]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[7]}${index}`)}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>死亡率（单位：%）<span>*</span></p>
              <InputItem
                {...getFieldProps(`op_${operation[8]}${index}`, {onChange: (value) => onChangeHandler(operation[9], value, 'survey', operation[8]),
                  initialValue: inputValue[operation[9]] && inputValue[operation[9]][operation[8]],
                  rules: [{required: true, message: '请输入死亡率'}]})}
                type="text"
                value={inputValue[operation[9]] && inputValue[operation[9]][operation[8]]}
              />
              {getFieldError(`op_${operation[8]}${index}`) ? <p className='surveyError'>{getFieldError(`op_${operation[8]}${index}`)}</p>:''}

              <WhiteSpace size="lg" />
            </List>
          ) : ''}
        </div>
      )
    });

    return (
      <React.Fragment>
        <p className='info_title'>四、2018年工作量（2018年1月~2018年11月）</p>
        <List>

          {workLoad}

          <p className='info_title'>五、数据管理</p>
          <p className='info_title'>1.手术登记</p>
          <p className='info_content'>手术登记方式 <span>*</span> </p>
          {operaCheckWay.map(i => (
            <RadioItem
              {...getFieldProps('operaCheckWay', {
                initialValue: inputValue.operaCheckWay || '',
                rules: [{message: '请选择手术登记方式'}]})}
              key={i.value}
              checked={i.value === inputValue.operaCheckWay}
              // error={isFieldTouched('operaCheckWay') && getFieldError('operaCheckWay')}
              // onErrorClick={() => Toast.info(getFieldError('operaCheckWay'))}
              onChange={onChangeHandler.bind(this, 'operaCheckWay', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('operaCheckWay') && getFieldError('operaCheckWay') ? <p className='surveyError'>{getFieldError('operaCheckWay')}</p>:''}

          <WhiteSpace size="lg" />

          {inputValue.operaCheckWay === '电脑版' ? (
            <List>
              <p className='info_content'>电脑版的登记方式<i>（多选）</i> <span>*</span> </p>
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
              {isFieldTouched('pcCheckWay') && getFieldError('pcCheckWay') ? <p className='surveyError'>{getFieldError('pcCheckWay')}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_title'>2.影像资料</p>
              <p className='info_content'>影像资料的管理 <span>*</span> </p>
              {imageManage.map(i => (
                <RadioItem
                  {...getFieldProps('imageManage', {
                    initialValue: inputValue.imageManage || '',
                    rules: [{message: '请选择影像资料管理方式'}]})}
                  key={i.value}
                  checked={i.value === inputValue.imageManage}
                  // error={isFieldTouched('imageManage') && getFieldError('imageManage')}
                  // onErrorClick={() => Toast.info(getFieldError('imageManage'))}
                  onChange={onChangeHandler.bind(this, 'imageManage', i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}
              {isFieldTouched('imageManage') && getFieldError('imageManage') ? <p className='surveyError'>{getFieldError('imageManage')}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>承载媒介：<span>*</span> </p>
              {medium.map(i => (
                <div key={i.value}>
                  <RadioItem
                    {...getFieldProps('medium', {
                      initialValue: inputValue.medium || '',
                      rules: [{message: '请选择影像资料承载媒介'}]})}
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
              {isFieldTouched('medium') && getFieldError('medium') ? <p className='surveyError'>{getFieldError('medium')}</p>:''}
            </List>
          ) : ''}

          <WhiteSpace size="lg" />

          <p className='info_title'>六、建议意见</p>
          <WhiteSpace size="lg" />

          <p className='info_content'>1、目前导管室的数量能够满足您科的工作量吗？<span>*</span> </p>
          {satisfied.map(i => (
            <RadioItem
              {...getFieldProps('satisfied', {
                initialValue: inputValue.satisfied || '',
                rules: [{message: '请选择目前导管室的数量能够满足您科的工作量吗？'}]})}
              key={i.value}
              checked={i.value === inputValue.satisfied}
              // error={isFieldTouched('satisfied') && getFieldError('satisfied')}
              // onErrorClick={() => Toast.info(getFieldError('satisfied'))}
              onChange={onChangeHandler.bind(this, 'satisfied', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('satisfied') && getFieldError('satisfied') ? <p className='surveyError'>{getFieldError('satisfied')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>2、导管室人员中最紧缺的是？<i>（多选）</i> <span>*</span> </p>
          {lack.map(i => (
            <CheckboxItem
              key={i.value}
              {...getFieldProps('lack', {
                initialValue: inputValue.lack || '',
                rules: [{required: true, message: '请选择导管室工作经常加班吗？'}]})}
              // checked={i.value === (inputValue.groupSurgeryDoctorsOperationScope && inputValue.groupSurgeryDoctorsOperationScope[i.value])}
              checked={inputValue.lack && Array.isArray(inputValue.lack) && inputValue.lack.indexOf(i.value) > -1}
              onChange={onChangeHandler.bind(this, 'lack', i.value,  'checkbox')}
            >
              {i.label}
            </CheckboxItem>
          ))}
          {isFieldTouched('lack') && getFieldError('lack') ? <p className='surveyError'>{getFieldError('lack')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>3、导管室工作经常加班吗？<span>*</span> </p>
          {overtime.map(i => (
            <RadioItem
              {...getFieldProps('overtime', {
                initialValue: inputValue.overtime || '',
                rules: [{message: '请选择导管室工作经常加班吗？'}]})}
              key={i.value}
              checked={i.value === inputValue.overtime}
              // error={isFieldTouched('overtime') && getFieldError('overtime')}
              // onErrorClick={() => Toast.info(getFieldError('overtime'))}
              onChange={onChangeHandler.bind(this, 'overtime', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('overtime') && getFieldError('overtime') ? <p className='surveyError'>{getFieldError('overtime')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>4、冠心病造影检查除了心脏科是否其他科室也开展？<span>*</span> </p>
          {ca.map(i => (
            <div key={i.value}>
              <RadioItem
                {...getFieldProps('ca', {
                  initialValue: inputValue.ca || '',
                  rules: [{message: '请选择冠心病造影检查除了心脏科是否其他科室也开展？'}]})}
                key={i.value}
                checked={i.value === inputValue.ca}
                // error={isFieldTouched('ca') && getFieldError('ca')}
                // onErrorClick={() => Toast.info(getFieldError('ca'))}
                onChange={onChangeHandler.bind(this, 'ca', i.value)}
              >
                {i.label}
              </RadioItem>
            </div>
          ))}
          {isFieldTouched('ca') && getFieldError('ca') ? <p className='surveyError'>{getFieldError('ca')}</p>:''}

          {inputValue.ca === '是' ? (
            <List>
              <p className='info_content'>冠心病造影检查还有哪科室开展？<span>*</span></p>
              <InputItem
                {...getFieldProps('caDepartment', {onChange: (value) => onChangeHandler('caDepartment', value),
                  initialValue: inputValue.caDepartment || '',
                  rules: [{required: true, message: '请输入冠心病造影检查还有哪科室开展'}]})}
                type="text"
                value={inputValue.caDepartment || ''}
              />
              {getFieldError('caDepartment') ? <p className='surveyError'>{getFieldError('caDepartment')}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>其他科室每周造影检查数量？（例/周）<span>*</span></p>
              <InputItem
                {...getFieldProps('caCount', {onChange: (value) => onChangeHandler('caCount', value),
                  initialValue: inputValue.caCount || '',
                  rules: [{required: true, message: '请输入其他科室每周造影检查数量'}]})}
                type="number"
                value={inputValue.caCount || ''}
              />
              {getFieldError('caCount') ? <p className='surveyError'>{getFieldError('caCount')}</p>:''}

              <WhiteSpace size="lg" />

            </List>
          ) : ''}

          <WhiteSpace size="lg" />

          <p className='info_content'>5、心脏介入治疗除了心脏科是否其他科室也开展？<span>*</span> </p>
          {pci.map(i => (
            <div key={i.value}>
              <RadioItem
                {...getFieldProps('pci', {
                  initialValue: inputValue.pci || '',
                  rules: [{message: '请选择心脏介入治疗除了心脏科是否其他科室也开展？'}]})}
                key={i.value}
                checked={i.value === inputValue.pci}
                // error={isFieldTouched('pci') && getFieldError('pci')}
                // onErrorClick={() => Toast.info(getFieldError('pci'))}
                onChange={onChangeHandler.bind(this, 'pci', i.value)}
              >
                {i.label}
              </RadioItem>
            </div>
          ))}
          {isFieldTouched('pci') && getFieldError('pci') ? <p className='surveyError'>{getFieldError('pci')}</p>:''}

          {inputValue.pci === '是' ? (
            <List>
              <p className='info_content'>心脏介入治疗其他哪科室也开展？<span>*</span></p>
              <InputItem
                {...getFieldProps('pciDepartment', {onChange: (value) => onChangeHandler('pciDepartment', value),
                  initialValue: inputValue.pciDepartment || '',
                  rules: [{required: true, message: '请输入冠心病造影检查还有哪科室开展'}]})}
                type="text"
                value={inputValue.pciDepartment || ''}
              />
              {getFieldError('pciDepartment') ? <p className='surveyError'>{getFieldError('pciDepartment')}</p>:''}

              <WhiteSpace size="lg" />
            </List>
          ) : ''}

          <WhiteSpace size="lg" />

          <p className='info_content'>目前开展心导管室工作最困难的是：<span>*</span> </p>
          <InputItem
            {...getFieldProps('trouble', {onChange: (value) => onChangeHandler('trouble', value),
              initialValue: inputValue.trouble || '',
              rules: [{required: true, message: '请输入目前开展心导管室工作最困难的是'}]})}
            type="text"
            value={inputValue.trouble || ''}
          />
          {getFieldError('trouble') ? <p className='surveyError'>{getFieldError('trouble')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>建议的培训项目或内容：<span>*</span> </p>
          <InputItem
            {...getFieldProps('program', {onChange: (value) => onChangeHandler('program', value),
              initialValue: inputValue.program || '',
              rules: [{required: true, message: '请输入建议的培训项目或内容'}]})}
            type="text"
            value={inputValue.program || ''}
          />
          {getFieldError('program') ? <p className='surveyError'>{getFieldError('program')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>给行政部门或质控中心的建议：<span>*</span> </p>
          <InputItem
            {...getFieldProps('suggest', {onChange: (value) => onChangeHandler('suggest', value),
              initialValue: inputValue.suggest || '',
              rules: [{required: true, message: '请输入给行政部门或质控中心的建议'}]})}
            type="text"
            value={inputValue.suggest || ''}
          />
          {getFieldError('suggest') ? <p className='surveyError'>{getFieldError('suggest')}</p>:''}

          <WhiteSpace size="lg" />
          {/*<p className='info_content'>PCI手术 <span>*</span> </p>
          {pciOperation.map(i => (
            <RadioItem
              {...getFieldProps('pciOperation', {rules: [{required: true, message: '请选择PCI手术'}]})}
              key={i.value}
              checked={i.value === inputValue.pciOperation}
              // error={isFieldTouched('pciOperation') && getFieldError('pciOperation')}
              // onErrorClick={() => Toast.info(getFieldError('pciOperation'))}
              onChange={onChangeHandler.bind(this, 'pciOperation', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('pciOperation') && getFieldError('pciOperation') ? <p className='surveyError'>{getFieldError('pciOperation')}</p>:''}

          <WhiteSpace size="lg" />

          {inputValue.pciOperation === '1' ? (
            <List>
              <p className='info_content'>手术量（单位：例）<span>*</span></p>
              {ifThoracotomy.map(i => (
                <RadioItem
                  {...getFieldProps('pci_OperationCount', {rules: [{required: true, message: '请选择是否有心外科'}]})}
                  key={i.value}
                  checked={i.value === inputValue.pci_OperationCount}
                  // error={isFieldTouched('pci_OperationCount') && getFieldError('pci_OperationCount')}
                  // onErrorClick={() => Toast.info(getFieldError('pci_OperationCount'))}
                  onChange={onChangeHandler.bind(this, 'pci_OperationCount', i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}
              {isFieldTouched('pci_OperationCount') && getFieldError('pci_OperationCount') ? <p className='surveyError'>{getFieldError('pci_OperationCount')}</p>:''}

              <WhiteSpace size="lg" />
            </List>
          ) : ''}*/}
        </List>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => state)(WorkLoad2018))
