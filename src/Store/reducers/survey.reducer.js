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
      // console.log( originDataA)
      // console.log(typeof originDataA)
      originDataA[action.key] = action.value;
      // console.log( originDataA)
      // console.log(typeof originDataA)
      return {
        ...state,
        ...{inputValue: originDataA}
      };
    case actionTypes.APPEND_INPUT_VALUE:
      let originDataB = state.inputValue;
      // if(originDataB['otherEquipNumber'][action.id]) {
      //   delete originDataB['otherEquipNumber'][action.id]
      // }else {
      //   originDataB[action.key][action.id] = action.value;
      // }
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
