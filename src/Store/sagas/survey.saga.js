import { put, takeLatest, call, select } from 'redux-saga/effects';
import {Toast} from "antd-mobile";
import {
  actionTypes, updateInputValueAction, updateQuestionsAction, updateHospitalDataAction,
  appendInputValueAction, surveyUpdateLocalAction,
} from '../actions/survey.action'

import {HttpHandlerService, HttpOriginService} from '../../Utilities/HttpService'

// import { GetRedirectUrl } from '../../Utilities'

const PATH = {
  getQuestions: `${process.env.PUBLIC_URL}/static/newQuestions.json`,
  getHospitalData: 'https://pci.violetqqy.com/pci-operation/api/hospital/getPciRecord',
  // saveSurvey: 'http://pci.violetqqy.com/pci-operation/api/hospital/saveRecord',
  // exportExcel: 'http://pci.violetqqy.com/pci-operation/api/hospital/exportExcel',
  saveSurvey: 'https://pci.violetqqy.com/pci-operation/api/hospital/savePciRecord',
  // exportExcel: 'https://pci.violetqqy.com/pci-operation/api/hospital/exportExcel',
}

function* loadQuestions() {
  try {
    const data = yield call(getQuestionsService);
    if (data) {
      yield put(updateQuestionsAction(data));
    }
  } catch (error) {
    throw new Error(error)
  }
}

const getQuestionsService = async () => {
  return HttpOriginService.get(`${PATH.getQuestions}`)
}

function* getHospitalData(datas) {
  try {
    const data = yield call(getHospitalDataService, datas.data);
    // console.log(data);
    if (data && data.hospitalName) {
      yield call([localStorage, 'setItem'], 'inputValue', JSON.stringify(data))
      yield put(updateHospitalDataAction(data));
    }
  } catch (error) {
    throw new Error(error)
  }
}

const getHospitalDataService = async (name) => {
  return HttpHandlerService.get(`${PATH.getHospitalData}?hospitalName=${name}`)
}

function* surveyStoreLocal(actions) {
  if (actions.option === 'update') {
    yield put(updateInputValueAction(actions.key, actions.value))
  } else if (actions.option === 'append') {
    yield put(appendInputValueAction(actions.key, actions.value, actions.id, actions.i))
  }
  const { inputValue } = yield select(state => state.globalReducer)
  yield call([localStorage, 'setItem'], 'inputValue', JSON.stringify(inputValue))
}

function* surveyGetLocal() {
  const inputValue = yield call([localStorage, 'getItem'], 'inputValue')
  if (inputValue && typeof JSON.parse(inputValue) === 'object') {
    yield put(surveyUpdateLocalAction(JSON.parse(inputValue)))
  }
}

const saveSurveyService = (data, errorHandler) => {
  return HttpHandlerService.post(`${PATH.saveSurvey}`, data, {}, errorHandler)
}

function* saveSurvey(actions) {
  Toast.loading('处理中，请稍后...');
  const res = yield call(saveSurveyService, actions.data, actions.errorHandler);
  if (res) {
    Toast.hide();
    actions.callback();
  }
}

const exportExcelService = () => {
  return HttpHandlerService.get(`${PATH.exportExcel}`).then(value => {
    let a = document.createElement('a');
    a.href= value;
    a.click();
  });
}

function* exportExcel() {
  yield call(exportExcelService);
}

export const globalSaga = [
  takeLatest(actionTypes.LOAD_QUESTIONS, loadQuestions),
  takeLatest(actionTypes.GET_HOSPITALDATA, getHospitalData),
  takeLatest(actionTypes.SURVEY_STORE_LOCAL, surveyStoreLocal),
  takeLatest(actionTypes.SURVER_GET_LOCAL, surveyGetLocal),
  takeLatest(actionTypes.SAVE_SURVEY, saveSurvey),
  takeLatest(actionTypes.EXPORT_EXCEL, exportExcel),
];
