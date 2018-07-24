import { actionTypes } from '../actions/global.action'
import { initialGlobalState } from '../states/global.state'

export const globalReducer = (state = initialGlobalState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_PAGE:
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('currentPage', action.data)
      }
      return {
        ...state,
        ...{currentPage: action.data}
      }
    case actionTypes.GET_CURRENT_PAGE:
      let currentPage = '/'
      if (typeof window !== 'undefined'){
        currentPage = window.localStorage.getItem('currentPage') || '/'
      }
      return {
        ...state,
        ...{currentPage: currentPage}
      }
    default:
      return state
  }
}

export const globalState = {
  globalReducer: initialGlobalState
}
