import { put, takeLatest, call, select } from 'redux-saga/effects'

import { actionTypes } from '../actions/global.action'

// const PATH = {
//   login: '/api/login',
// }

// const loginService = (data) => {
//   return HttpHostService.post(`${PATH.login}`, data)
// }

// function* login(actions) {
//   const loginRes = yield call(loginService, actions.data)
//   if (loginRes) {
//     yield put(authLogin({accessToken: loginRes.accessToken}))
//     yield put(getCurrentPage())
//     const { currentPage } = yield select((state) => state.globalReducer)
//     yield Router.replace(currentPage)
//   }
// }

export const globalSaga = [
  // takeLatest(actionTypes.LOGIN, login),
  // takeLatest(actionTypes.REGISTER, register),
  // takeLatest(actionTypes.GET_CODE, getCode),
  // takeLatest(actionTypes.GETBACK_PASSWORD, getbackPassword)
]
