import { put, takeLatest, call, select } from 'redux-saga/effects';

import { 
  actionTypes, updateQuestionsAction, 
  updateInputValueAction, appendInputValueAction, 
  surveyUpdateLocalAction, updateUserInfo, 
  updateCurrentPageAction, updateOpenIdAction, updateUserIdAction
} from '../actions/global.action'

import { HttpCatchService, HttpOriginService, HttpHandlerService } from '../../Utilities/HttpService'
import { GetRedirectUrl } from '../../Utilities'

const PATH = {
  getQuestions: `${process.env.PUBLIC_URL}/static/questions.json`,
  saveSurvey: '/pci-micro/api/ruijin/save',
  getUserInfo: '/pci-micro/api/ruijin/userInfo',
  getOpenId: '/pci-micro/api/micro/snsToken',
  jssdk: '/pci-micro/api/micro/jsTicket'
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
      actions.agent === 'wechat' &&  (yield call([localStorage, 'setItem'], 'openId', actions.id))
      actions.agent === 'wechat' &&  (yield put(updateOpenIdAction(actions.id)))
      actions.agent === 'app' &&  (yield put(updateUserIdAction(actions.id)))

      const data = yield call(getUserInfoData, actions.agent, actions.id)
      if (data) {
        yield put(updateUserInfo(data))
        data.userId && (yield put(updateUserIdAction(data.userId)))
        data.name && (yield put(updateInputValueAction('name', data.name)))
        data.sex && (yield put(updateInputValueAction('sex', data.sex)))
        data.birthday && (yield put(updateInputValueAction('birthday', data.birthday)))
      }

    } else if (actions.agent === 'wechat' && !actions.id && actions.code) {

      const code = yield call(getOpenId, actions.code)
      if (code && code.openid) {
        yield call([localStorage, 'setItem'], 'openId', code.openid)
        yield put(updateOpenIdAction(code.openid))

        const data = yield call(getUserInfoData, actions.agent, code.openid)
        if (data) {
          yield put(updateUserInfo(data))
          data.userId && (yield put(updateUserIdAction(data.userId)))
          data.name && (yield put(updateInputValueAction('name', data.name)))
          data.sex && (yield put(updateInputValueAction('sex', data.sex)))
          data.birthday && (yield put(updateInputValueAction('birthday', data.birthday)))
        }

      }
    } else if (actions.agent === 'wechat' && !actions.id && !actions.code) {
      const redirect = GetRedirectUrl(window.location.href)
      window.location.href = redirect
    } else if (actions.agent === 'app' && !actions.id) {
      actions.errorback('没用用户ID')
    } 
  } catch (error) {
    actions.errorback(error)
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

const saveSurveyService = (data, errorHandler) => {
  return HttpHandlerService.post(`${PATH.saveSurvey}`, data, {}, errorHandler)
}

function* saveSurvey(actions) {
  const res = yield call(saveSurveyService, actions.data, actions.errorHandler)
  if (res) { 
    actions.callback()
  }
}

const jssdkService = (url) => {
  return HttpCatchService.post(`${PATH.jssdk}`, {url: url})
}

function* loadJSSDK() {
  const url = window.location.href
  const res = yield call(jssdkService, url)
  if (res && typeof window.wx !== 'undefined') {
    window.wx.config({
      debug: false, 
      appId: res.appId, 
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: ['closeWindow', 'hideAllNonBaseMenuItem']
    })

    window.wx.hideAllNonBaseMenuItem()
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
  takeLatest(actionTypes.LOAD_JSSDK, loadJSSDK),
];
