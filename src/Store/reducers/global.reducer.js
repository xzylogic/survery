import { actionTypes } from '../actions/global.action';
import { initialGlobalState } from '../states/global.state';

export const globalReducer = (state = initialGlobalState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_PAGE:
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('currentPage', action.data);
      }
      return {
        ...state,
        ...{currentPage: action.data}
      };
    case actionTypes.GET_CURRENT_PAGE:
      let currentPage = '/';
      if (typeof window !== 'undefined') {
        currentPage = window.localStorage.getItem('currentPage') || '/';
      }
      return {
        ...state,
        ...{currentPage: currentPage}
      };
    case actionTypes.UPDATE_USER_INFO:
      return {
        ...state,
        ...{userInfo: action.data}
      };
    case actionTypes.UPDATE_QUESTIONS:
      return {
        ...state,
        ...{questions: action.data}
      };
    case actionTypes.SURVER_UPDATE_LOCAL:
      return {
        ...state,
        ...{inputValue: action.data}
      };
    case actionTypes.UPDATE_INPUT_VALUE:
      let originDataA = state.inputValue;
      originDataA[action.key] = action.value;
      return {
        ...state,
        ...{inputValue: originDataA}
      };
    case actionTypes.APPEND_INPUT_VALUE:
      let originDataB = state.inputValue;
      if (!action.id && originDataB[action.key] && Array.isArray(originDataB[action.key]) && originDataB[action.key].indexOf(action.value) === -1) {
        originDataB[action.key].push(action.value);
      } else if (!action.id && originDataB[action.key] && Array.isArray(originDataB[action.key]) && originDataB[action.key].indexOf(action.value) > -1)  {
        originDataB[action.key].splice(originDataB[action.key].indexOf(action.value), 1);
      } else if (action.id && originDataB[action.key])  {
        originDataB[action.key][action.id] = action.value;
      } else if (action.id && !originDataB[action.key])  {
        originDataB[action.key] = {};
        originDataB[action.key][action.id] = action.value;
      } else {
        originDataB[action.key]= [action.value];
      }
      return {
        ...state,
        ...{inputValue: originDataB}
      };
    default:
      return state;
  }
};

export const globalState = {
  globalReducer: initialGlobalState
};
