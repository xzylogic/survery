import { all } from 'redux-saga/effects';
import es6promise from 'es6-promise';

import { globalSaga } from './survey.saga';

es6promise.polyfill();

function* rootSaga() {
  yield all([
    ...globalSaga,
  ])
}

export default rootSaga;
