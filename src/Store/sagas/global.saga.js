import { put, takeLatest, call, select } from 'redux-saga/effects';

import { 
  actionTypes, updateQuestionsAction, 
  updateInputValueAction, appendInputValueAction, 
  surveyUpdateLocalAction, updateUserInfo, 
  updateCurrentPageAction, updateOpenIdAction
} from '../actions/global.action'

import { HttpToastService, HttpCatchService, HttpOriginService } from '../../Utilities/HttpService'
import { GetRedirectUrl } from '../../Utilities'

const PATH = {
  getQuestions: `${process.env.PUBLIC_URL}/static/questions.json`,
  saveSurvey: '/pci-micro/api/ruijin/save',
  getUserInfo: '/pci-micro/api/ruijin/userInfo',
  getOpenId: '/pci-micro/api/micro/snsToken'
}

function* saveCurrentPage(actions) {
  yield call([localStorage, 'setItem'], 'currentPage', actions.data)
  yield put(updateCurrentPageAction(actions.data))
}

function* getCurrentPage() {
  const page = yield call([localStorage, 'getItem'], 'currentPage')
  yield put(updateCurrentPageAction(page || 0))
}

const getQuestionsService = async () => {
  return HttpOriginService.get(`${PATH.getQuestions}`)
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

const getUserInfoData = (agent, id) => {
  return HttpCatchService.get(`${PATH.getUserInfo}?${agent === 'app' ? 'userId' : 'openId'}=${id}`)
}

const getOpenId = (code) => {
  return HttpCatchService.get(`${PATH.getOpenId}?code=${code}`)
}

function* loadUserInfo(actions) {
  try {
    if (actions.agent && actions.id) {
      const data = yield call(getUserInfoData, actions.agent, actions.id)
      if (data.code===0 && data.data ) {
        yield put(updateUserInfo(data.data))
        data.data.name && (yield put(updateInputValueAction('name', data.data.name)))
        data.data.sex && (yield put(updateInputValueAction('sex', data.data.sex)))
        data.data.birthday && (yield put(updateInputValueAction('birthday', data.data.birthday)))
      }
    } else if (actions.agent === 'wechat' && !actions.id && actions.code) {
      const data = yield call(getOpenId, actions.code)
      if (data.code === 0 && data.data && data.data.openid) {
        yield call([localStorage, 'setItem'], 'openId', data.data.openid)
        yield put(updateOpenIdAction(data.data.openid))
      }
    } else if (actions.agent === 'wechat' && !actions.id && !actions.code) {
      const redirect = GetRedirectUrl(window.location.href)
      window.location.href = redirect
    } else if (actions.agent === 'app' && !actions.id) {
      window.location.href = '/error'
    } 
  } catch (error) {
    window.location.href = '/error'
  }
}

function* surveyStoreLocal(actions) {
  if (actions.option === 'update') {
    yield put(updateInputValueAction(actions.key, actions.value))
  } else if (actions.option === 'append') {
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

const saveSurveyService = (data) => {
  return HttpToastService.post(`${PATH.saveSurvey}`, data)
}

function* saveSurvey(actions) {
  const { userId } = yield select(state => state.globalReducer)
  const res = yield call(saveSurveyService, actions.data)
  if (res) { 
    window.location.href = `/success${userId ? `userId=${userId}` : ''}`
  }
}

export const globalSaga = [
  takeLatest(actionTypes.SAVE_CURRENT_PAGE, saveCurrentPage),
  takeLatest(actionTypes.GET_CURRENT_PAGE, getCurrentPage),
  takeLatest(actionTypes.LOAD_QUESTIONS, loadQuestions),
  takeLatest(actionTypes.SURVEY_STORE_LOCAL, surveyStoreLocal),
  takeLatest(actionTypes.SURVER_GET_LOCAL, surveyGetLocal),
  takeLatest(actionTypes.SAVE_SURVEY, saveSurvey),
  takeLatest(actionTypes.GET_USER_INFO, loadUserInfo),
];
