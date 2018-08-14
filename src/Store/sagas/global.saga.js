import { put, takeLatest, call, select } from 'redux-saga/effects';
import * as axios from 'axios';

import { actionTypes, updateQuestionsAction, updateInputValueAction, appendInputValueAction, surveyUpdateLocalAction } from '../actions/global.action';

const PATH = {
  getQuestions: '../questions.json',
  saveSurvey: 'http://10.2.10.10/pci-micro/api/ruijin/save'
};

const getQuestionsService = async () => {
  const service = await axios.get(`${PATH.getQuestions}`);
  const data = await service.data;
  return data;
}

function* loadQuestions() {
  try {
    const data = yield call(getQuestionsService);
    if (data) {
      yield put(updateQuestionsAction(data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

function* surveyStoreLocal(actions) {
  if (actions.option == 'update') {
    yield put(updateInputValueAction(actions.key, actions.value))
  } else if (actions.option == 'append') {
    yield put(appendInputValueAction(actions.key, actions.value, actions.id))
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

function* saveSurvey(actions) {
  try {
    const res = yield call([axios, 'post'], PATH.saveSurvey, actions.data)
    if (res) { 
      console.log(res)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const globalSaga = [
  takeLatest(actionTypes.LOAD_QUESTIONS, loadQuestions),
  takeLatest(actionTypes.SURVEY_STORE_LOCAL, surveyStoreLocal),
  takeLatest(actionTypes.SURVER_GET_LOCAL, surveyGetLocal),
  takeLatest(actionTypes.SAVE_SURVEY, saveSurvey),
];
