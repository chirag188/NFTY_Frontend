/* eslint-disable import/prefer-default-export */
import { all } from "redux-saga/effects";
import profileSagas from "./profile/profile";
import stakeSagas from "./Stake/Stake";

export default function* rootSaga() {
  yield all([profileSagas(), stakeSagas()]);
}
