/* eslint-disable import/prefer-default-export */
import { all } from "redux-saga/effects";

import dummySagas from "./dummy/dummy";
import profileSagas from "./profile/profile";

export default function* rootSaga() {
  yield all([dummySagas()]);
  yield all([profileSagas()]);
}
