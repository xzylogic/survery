import { actionTypes } from '../actions/survey.action';
import { initialGlobalState } from '../states/survey.state';

export const globalReducer = (state = initialGlobalState, action = {}) => {
  switch (action.type) {
    case actionTypes.SUBMIT_AGREEMENT:
      return {
        ...state,
        ...{agree: true}
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
        console.log(originDataB)
        console.log(action.key)
        originDataB[action.key].push(action.value);
        console.log(originDataB)
        console.log(11111111111111)
      } else if (!action.id && originDataB[action.key] && Array.isArray(originDataB[action.key]) && originDataB[action.key].indexOf(action.value) > -1)  {
        console.log(originDataB)
        console.log(action.key)
        originDataB[action.key].splice(originDataB[action.key].indexOf(action.value), 1);
        console.log(originDataB)
        console.log(2222222222222222)
      } else if (action.id && originDataB[action.key])  {
        console.log(originDataB)
        console.log(action.id)
        console.log(action.key)
        originDataB[action.key][action.id] = action.value;
        console.log(originDataB)
        console.log(33333333333333333)
      } else if (action.id && !originDataB[action.key])  {
        console.log(originDataB)
        console.log(action.id)
        console.log(action.key)
        originDataB[action.key] = {};
        originDataB[action.key][action.id] = action.value;
        console.log(originDataB)
        console.log(44444444444444444)
      } else {
        console.log(originDataB)
        console.log(action.key)
        originDataB[action.key]= [action.value];
        console.log(originDataB)
        console.log(5555555555555)
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
