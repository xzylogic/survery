import { combineReducers } from 'redux';
import { globalReducer, globalState} from './global.reducer';


export const rootReducer = combineReducers({
  globalReducer,
});

export const rootInitialState = {
  ...globalState,
};
