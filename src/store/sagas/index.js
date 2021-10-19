/* eslint-disable import/prefer-default-export */
import { all } from 'redux-saga/effects';

import dummySagas from './dummy/dummy';
import stakeSagas from './Stake/Stake';

export default function* rootSaga() {
    yield all([dummySagas(),stakeSagas()]);
}
