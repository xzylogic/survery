import { put, takeLatest, call, select } from 'redux-saga/effects';
import * as axios from 'axios';

import { actionTypes, updateQuestionsAction } from '../actions/global.action';

const PATH = {
  getQuestions: '../questions.json',
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

export const globalSaga = [
  takeLatest(actionTypes.LOAD_QUESTIONS, loadQuestions)
];
