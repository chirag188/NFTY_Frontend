/* eslint-disable import/prefer-default-export */
import { all, takeEvery, put } from "redux-saga/effects";
import * as actionLabels from "../../actionLabels";
import { axios } from "../../../http";
import {
    stakerDataStart,
    stakerDataFail,
    stakerDataSuccess,
    balanceStart,
    balanceFail,
    balanceSuccess
} from "../../actions";

function* stakerDataSaga() {
  try {
    yield stakerDataStart();
    const JwtToken = localStorage.getItem("JwtToken");
    const response = yield axios
      .get("/users/stakerData", {
        headers: {
          token: JwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(stakerDataSuccess({ data: response.data.data }));
    } else if (response !== 200) {
      yield put(stakerDataFail({ error: response.response.data.message }));
    } else {
      yield put(stakerDataFail({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(stakerDataFail({ error }));
  }
}
function* balanceSaga() {
  try {
    yield balanceStart();
    const JwtToken = localStorage.getItem("JwtToken");
    const response = yield axios
      .get("/users/balance", {
        headers: {
          token: JwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(balanceSuccess({ data: response.data.data }));
    } else if (response !== 200) {
      yield put(balanceFail({ error: response.response.data.message }));
    } else {
      yield put(balanceFail({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(balanceFail({ error }));
  }
}
export default function* rootsaga() {
  yield all([
    yield takeEvery(actionLabels.STAKER_DATA_SAGA, stakerDataSaga),
    yield takeEvery(actionLabels.BALANCE_SAGA, balanceSaga),
  ]);
}
