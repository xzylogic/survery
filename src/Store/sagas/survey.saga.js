import { put, takeLatest, call, select } from 'redux-saga/effects';

import {
  actionTypes, updateInputValueAction,
  appendInputValueAction, surveyUpdateLocalAction,
} from '../actions/survey.action'

import { HttpHandlerService } from '../../Utilities/HttpService'
// import { GetRedirectUrl } from '../../Utilities'

const PATH = {
  saveSurvey: 'http://pci.violetqqy.com/pci-operation/api/hospital/saveRecord',
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
  const res = yield call(saveSurveyService, actions.data, actions.errorHandler)
  if (res) {
    actions.callback()
  }
}

export const globalSaga = [
  takeLatest(actionTypes.SURVEY_STORE_LOCAL, surveyStoreLocal),
  takeLatest(actionTypes.SURVER_GET_LOCAL, surveyGetLocal),
  takeLatest(actionTypes.SAVE_SURVEY, saveSurvey),
];
