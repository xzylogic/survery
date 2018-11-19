import { combineReducers } from 'redux';
import { globalReducer, globalState} from './survey.reducer';


export const rootReducer = combineReducers({
  globalReducer,
});

export const rootInitialState = {
  ...globalState,
};
