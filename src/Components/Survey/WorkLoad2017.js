import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, InputItem, Radio, WhiteSpace, Checkbox } from 'antd-mobile'
// import { createForm } from 'rc-form';

import {
  pciOperation,
  operaCheckWay,
  pipeNumberWork,
  pipePersonShortage,
  pipeOverTime,
  CHDCheckOtherOffice,
  cardiacCheckOtherOffice,
} from './SurveyData'

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;

class WorkLoad2017 extends React.Component {

  render() {
    const { globalReducer:{ inputValue }, onChangeHandler } = this.props;
    const { getFieldProps, getFieldError, isFieldTouched } = this.props;  //getFieldsError
    const workLoadList = [
      ['PCI手术', 'PCI', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate'],
      ['起搏器手术', 'DDD', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate'],
      ['射频消融术', 'RF', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate'],
      ['先心病介入', 'ACHD', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate'],
      ['左心耳封堵术', 'LAA', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate'],
      ['经皮主动脉瓣膜置换/成形术', 'PCN', 'operaCount', 'emergencyCount', 'sickKindRate', 'averageInHospital', 'averageOperaCost', 'cureRate', 'diedRate']
    ];
    let workLoad = workLoadList.map((operation, index) => {
      return (
        <div key={index}>
          <p className='info_content'>{operation[0]}<span>*</span> </p>
          {pciOperation.map(i => (
            <RadioItem
              {...getFieldProps(operation[1], {rules: [{required: true, message: `请选择${operation[index]}`}]})}
              key={i.value}
              checked={i.value === inputValue[operation[1]]}
              // error={isFieldTouched('pciOperation') && getFieldError('pciOperation')}
              // onErrorClick={() => Toast.info(getFieldError('pciOperation'))}
              onChange={onChangeHandler.bind(this, operation[1], i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched(operation[1]) && getFieldError(operation[1]) ? <p className='surveyError'>{getFieldError(operation[1])}</p>:''}

          <WhiteSpace size="lg" />

          {inputValue[operation[1]] === '已开展' ? (
            <List>
              <p className='info_content'>手术量（单位：例）<span>*</span></p>
              <InputItem
                {...getFieldProps(operation[2], {onChange: (value) => onChangeHandler(`${operation[1]}_value`, value, 'survey', operation[2]),
                  initialValue: inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[2]],
                  rules: [{required: true, message: '请输入手术量'}]})}
                type="text"
                value={inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[2]]}
              />
              {isFieldTouched(operation[2]) && getFieldError(operation[2]) ? <p className='surveyError'>{getFieldError(operation[2])}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>其中，急诊手术量（单位：例）<span>*</span></p>
              <InputItem
                {...getFieldProps(operation[3], {onChange: (value) => onChangeHandler(`${operation[1]}_value`, value, 'survey', operation[3]),
                  initialValue: inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[3]],
                  rules: [{required: true, message: '请输入急诊手术量'}]})}
                type="text"
                value={inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[3]]}
              />
              {isFieldTouched(operation[3]) && getFieldError(operation[3]) ? <p className='surveyError'>{getFieldError(operation[3])}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>病种比例（收治此类病人数/住院总人次数）（单位：%）<span>*</span></p>
              <InputItem
                {...getFieldProps(operation[4], {onChange: (value) => onChangeHandler(`${operation[1]}_value`, value, 'survey', operation[4]),
                  initialValue: inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[4]],
                  rules: [{required: true, message: '请输入病种比例'}]})}
                type="text"
                value={inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[4]]}
              />
              {isFieldTouched(operation[4]) && getFieldError(operation[4]) ? <p className='surveyError'>{getFieldError(operation[4])}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>平均住院日（单位：日）<span>*</span></p>
              <InputItem
                {...getFieldProps(operation[5], {onChange: (value) => onChangeHandler(`${operation[1]}_value`, value, 'survey', operation[5]),
                  initialValue: inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[5]],
                  rules: [{required: true, message: '请输入平均住院日'}]})}
                type="text"
                value={inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[5]]}
              />
              {isFieldTouched(operation[5]) && getFieldError(operation[5]) ? <p className='surveyError'>{getFieldError(operation[5])}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>平均手术费用（单位：元）<span>*</span></p>
              <InputItem
                {...getFieldProps(operation[6], {onChange: (value) => onChangeHandler(`${operation[1]}_value`, value, 'survey', operation[6]),
                  initialValue: inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[6]],
                  rules: [{required: true, message: '请输入平均手术费用'}]})}
                type="text"
                value={inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[6]]}
              />
              {isFieldTouched(operation[6]) && getFieldError(operation[6]) ? <p className='surveyError'>{getFieldError(operation[6])}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>治愈率（单位：%）<span>*</span></p>
              <InputItem
                {...getFieldProps(operation[7], {onChange: (value) => onChangeHandler(`${operation[1]}_value`, value, 'survey', operation[7]),
                  initialValue: inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[7]],
                  rules: [{required: true, message: '请输入治愈率'}]})}
                type="text"
                value={inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[7]]}
              />
              {isFieldTouched(operation[7]) && getFieldError(operation[7]) ? <p className='surveyError'>{getFieldError(operation[7])}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>死亡率（单位：%）<span>*</span></p>
              <InputItem
                {...getFieldProps(operation[8], {onChange: (value) => onChangeHandler(`${operation[1]}_value`, value, 'survey', operation[8]),
                  initialValue: inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[8]],
                  rules: [{required: true, message: '请输入死亡率'}]})}
                type="text"
                value={inputValue[`${operation[1]}_value`] && inputValue[`${operation[1]}_value`][operation[8]]}
              />
              {isFieldTouched(operation[8]) && getFieldError(operation[8]) ? <p className='surveyError'>{getFieldError(operation[8])}</p>:''}

              <WhiteSpace size="lg" />
            </List>
          ) : ''}
        </div>
      )
    });

    return (
      <React.Fragment>
        <p className='info_title'>四、2017年工作量</p>
        <List>

          {workLoad}

          <p className='info_title'>五、数据管理</p>
          <WhiteSpace size="lg" />
          <p className='info_title'>1.手术登记</p>

          <p className='info_content'>手术登记方式 <span>*</span> </p>
          {operaCheckWay.map(i => (
            <RadioItem
              {...getFieldProps('operaCheckWay', {rules: [{required: true, message: '请选择手术登记方式'}]})}
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

          <p className='info_title'>六、建议意见</p>
          <WhiteSpace size="lg" />

          <p className='info_content'>1、目前导管室的数量能够满足您科的工作量吗？<span>*</span> </p>
          {pipeNumberWork.map(i => (
            <RadioItem
              {...getFieldProps('pipeNumberWork', {rules: [{required: true, message: '请选择目前导管室的数量能够满足您科的工作量吗？'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeNumberWork}
              // error={isFieldTouched('pipeNumberWork') && getFieldError('pipeNumberWork')}
              // onErrorClick={() => Toast.info(getFieldError('pipeNumberWork'))}
              onChange={onChangeHandler.bind(this, 'pipeNumberWork', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('pipeNumberWork') && getFieldError('pipeNumberWork') ? <p className='surveyError'>{getFieldError('pipeNumberWork')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>2、导管室人员中最紧缺的是？<i>（多选）</i> <span>*</span> </p>
          {pipePersonShortage.map(i => (
            <CheckboxItem
              key={i.value}
              // {...getFieldProps('groupSurgeryDoctorsOperationScope', {onChange: () => onChangeHandler('groupSurgeryDoctorsOperationScope', i.value,  'survey', i.value)})}
              // checked={i.value === (inputValue.groupSurgeryDoctorsOperationScope && inputValue.groupSurgeryDoctorsOperationScope[i.value])}
              checked={inputValue.pipePersonShortage && Array.isArray(inputValue.pipePersonShortage) && inputValue.pipePersonShortage.indexOf(i.value) > -1}
              onChange={onChangeHandler.bind(this, 'pipePersonShortage', i.value,  'checkbox')}
            >
              {i.label}
            </CheckboxItem>
          ))}
          {isFieldTouched('pipePersonShortage') && getFieldError('pipePersonShortage') ? <p className='surveyError'>{getFieldError('pipePersonShortage')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>3、导管室工作经常加班吗？<span>*</span> </p>
          {pipeOverTime.map(i => (
            <RadioItem
              {...getFieldProps('pipeOverTime', {rules: [{required: true, message: '请选择导管室工作经常加班吗？'}]})}
              key={i.value}
              checked={i.value === inputValue.pipeOverTime}
              // error={isFieldTouched('pipeOverTime') && getFieldError('pipeOverTime')}
              // onErrorClick={() => Toast.info(getFieldError('pipeOverTime'))}
              onChange={onChangeHandler.bind(this, 'pipeOverTime', i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          {isFieldTouched('pipeOverTime') && getFieldError('pipeOverTime') ? <p className='surveyError'>{getFieldError('pipeOverTime')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>4、冠心病造影检查除了心脏科是否其他科室也开展？<span>*</span> </p>
          {CHDCheckOtherOffice.map(i => (
            <div key={i.value}>
              <RadioItem
                {...getFieldProps('CHDCheckOtherOffice', {rules: [{required: true, message: '请选择冠心病造影检查除了心脏科是否其他科室也开展？'}]})}
                key={i.value}
                checked={i.value === inputValue.CHDCheckOtherOffice}
                // error={isFieldTouched('CHDCheckOtherOffice') && getFieldError('CHDCheckOtherOffice')}
                // onErrorClick={() => Toast.info(getFieldError('CHDCheckOtherOffice'))}
                onChange={onChangeHandler.bind(this, 'CHDCheckOtherOffice', i.value)}
              >
                {i.label}
              </RadioItem>
            </div>
          ))}
          {isFieldTouched('CHDCheckOtherOffice') && getFieldError('CHDCheckOtherOffice') ? <p className='surveyError'>{getFieldError('CHDCheckOtherOffice')}</p>:''}

          {inputValue.CHDCheckOtherOffice === '是' ? (
            <List>
              <p className='info_content'>冠心病造影检查还有哪科室开展？<span>*</span></p>
              <InputItem
                {...getFieldProps('CHDCheck_other', {onChange: (value) => onChangeHandler('CHDCheck_other', value),
                  initialValue: inputValue.CHDCheck_other || '',
                  rules: [{required: true, message: '请输入冠心病造影检查还有哪科室开展'}]})}
                type="text"
                value={inputValue.CHDCheck_other || ''}
              />
              {isFieldTouched('CHDCheck_other') && getFieldError('CHDCheck_other') ? <p className='surveyError'>{getFieldError('CHDCheck_other')}</p>:''}

              <WhiteSpace size="lg" />

              <p className='info_content'>其他科室每周造影检查数量？（例/周）<span>*</span></p>
              <InputItem
                {...getFieldProps('CHDCheck_otherWeekNumber', {onChange: (value) => onChangeHandler('CHDCheck_otherWeekNumber', value),
                  initialValue: inputValue.CHDCheck_otherWeekNumber || '',
                  rules: [{required: true, message: '请输入其他科室每周造影检查数量'}]})}
                type="number"
                value={inputValue.CHDCheck_otherWeekNumber || ''}
              />
              {isFieldTouched('CHDCheck_otherWeekNumber') && getFieldError('CHDCheck_otherWeekNumber') ? <p className='surveyError'>{getFieldError('CHDCheck_otherWeekNumber')}</p>:''}

              <WhiteSpace size="lg" />

            </List>
          ) : ''}

          <WhiteSpace size="lg" />

          <p className='info_content'>5、心脏介入治疗除了心脏科是否其他科室也开展？<span>*</span> </p>
          {cardiacCheckOtherOffice.map(i => (
            <div key={i.value}>
              <RadioItem
                {...getFieldProps('cardiacCheckOtherOffice', {rules: [{required: true, message: '请选择心脏介入治疗除了心脏科是否其他科室也开展？'}]})}
                key={i.value}
                checked={i.value === inputValue.cardiacCheckOtherOffice}
                // error={isFieldTouched('cardiacCheckOtherOffice') && getFieldError('cardiacCheckOtherOffice')}
                // onErrorClick={() => Toast.info(getFieldError('cardiacCheckOtherOffice'))}
                onChange={onChangeHandler.bind(this, 'cardiacCheckOtherOffice', i.value)}
              >
                {i.label}
              </RadioItem>
            </div>
          ))}
          {isFieldTouched('cardiacCheckOtherOffice') && getFieldError('cardiacCheckOtherOffice') ? <p className='surveyError'>{getFieldError('cardiacCheckOtherOffice')}</p>:''}

          {inputValue.cardiacCheckOtherOffice === '是' ? (
            <List>
              <p className='info_content'>心脏介入治疗其他哪科室也开展？<span>*</span></p>
              <InputItem
                {...getFieldProps('cardiacCheck_other', {onChange: (value) => onChangeHandler('cardiacCheck_other', value),
                  initialValue: inputValue.cardiacCheck_other || '',
                  rules: [{required: true, message: '请输入冠心病造影检查还有哪科室开展'}]})}
                type="text"
                value={inputValue.cardiacCheck_other || ''}
              />
              {isFieldTouched('cardiacCheck_other') && getFieldError('cardiacCheck_other') ? <p className='surveyError'>{getFieldError('cardiacCheck_other')}</p>:''}

              <WhiteSpace size="lg" />
            </List>
          ) : ''}

          <WhiteSpace size="lg" />

          <p className='info_content'>目前开展心导管室工作最困难的是：<span>*</span> </p>
          <InputItem
            {...getFieldProps('currentPipeWorkHardest', {onChange: (value) => onChangeHandler('currentPipeWorkHardest', value),
              initialValue: inputValue.currentPipeWorkHardest || '',
              rules: [{required: true, message: '请输入目前开展心导管室工作最困难的是'}]})}
            type="text"
            value={inputValue.currentPipeWorkHardest || ''}
          />
          {isFieldTouched('currentPipeWorkHardest') && getFieldError('currentPipeWorkHardest') ? <p className='surveyError'>{getFieldError('currentPipeWorkHardest')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>建议的培训项目或内容：<span>*</span> </p>
          <InputItem
            {...getFieldProps('adviceTrainingProgram', {onChange: (value) => onChangeHandler('adviceTrainingProgram', value),
              initialValue: inputValue.adviceTrainingProgram || '',
              rules: [{required: true, message: '请输入建议的培训项目或内容'}]})}
            type="text"
            value={inputValue.adviceTrainingProgram || ''}
          />
          {isFieldTouched('adviceTrainingProgram') && getFieldError('adviceTrainingProgram') ? <p className='surveyError'>{getFieldError('adviceTrainingProgram')}</p>:''}

          <WhiteSpace size="lg" />

          <p className='info_content'>给行政部门或质控中心的建议：<span>*</span> </p>
          <InputItem
            {...getFieldProps('adviceAdministration', {onChange: (value) => onChangeHandler('adviceAdministration', value),
              initialValue: inputValue.adviceAdministration || '',
              rules: [{required: true, message: '请输入给行政部门或质控中心的建议'}]})}
            type="text"
            value={inputValue.adviceAdministration || ''}
          />
          {isFieldTouched('adviceAdministration') && getFieldError('adviceAdministration') ? <p className='surveyError'>{getFieldError('adviceAdministration')}</p>:''}

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

export default withRouter(connect(state => state)(WorkLoad2017))
