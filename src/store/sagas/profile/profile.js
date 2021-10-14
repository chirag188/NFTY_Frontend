/* eslint-disable import/prefer-default-export */
import { all, takeEvery, put, call } from "redux-saga/effects";
import * as actionLabels from "../../actionLabels";
import { axios } from "../../../http";
import {
  createUserProfileFail,
  createUserProfileStart,
  createUserProfileSuccess,
  updateProfileFail,
  updateProfilePicFail,
  updateProfilePicStart,
  updateProfilePicSuccess,
  updateProfileStart,
  updateProfileSuccess,
  viewProfileFail,
  viewProfileStart,
  viewProfileSuccess,
} from "../../actions";

// eslint-disable-next-line no-unused-vars
function* createUserSaga(action) {
  try {
    yield call(createUserProfileStart());
    const { walletAddress } = action.payload;

    const response = yield axios
      .post("/users/createUserProfile", {
        walletAddress,
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(createUserProfileSuccess({ data: response.data.data }));
    } else if (response !== 200) {
      yield put(
        createUserProfileFail({ error: response.response.data.message })
      );
    } else {
      yield put(
        createUserProfileFail({ error: response.response.data.message })
      );
    }
  } catch (error) {
    yield put(createUserProfileFail({ error }));
  }
}

function* viewProfileSaga(action) {
  try {
    yield call(viewProfileStart());
    const JwtToken = JSON.parse(sessionStorage.getItem("jwtToken"));
    const response = yield axios
      .get("/users/viewProfile", {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(viewProfileSuccess({ data: response.data.data }));
    } else if (response !== 200) {
      yield put(viewProfileFail({ error: response.response.data.message }));
    } else {
      yield put(viewProfileFail({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(viewProfileFail({ error }));
  }
}

function* updateProfileSaga(action) {
  try {
    yield call(updateProfileStart());
    const JwtToken = JSON.parse(sessionStorage.getItem("jwtToken"));
    const { name, bio } = action.payload;
    const response = yield axios
      .post(
        "/users/updateProfile",
        { name, bio },
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken,
          },
        }
      )
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(updateProfileSuccess({ data: response.data.data }));
    } else if (response !== 200) {
      yield put(updateProfileFail({ error: response.response.data.message }));
    } else {
      yield put(updateProfileFail({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(updateProfileFail({ error }));
  }
}

function* updateProfilePicSaga(action) {
  try {
    yield call(updateProfilePicStart());
    const JwtToken = JSON.parse(sessionStorage.getItem("jwtToken"));
    const { profilePic } = action.payload;
    const response = yield axios
      .post(
        "/users/update-profile-pic",
        { profilePic },
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken,
          },
        }
      )
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(updateProfilePicSuccess({ data: response.data.data }));
    } else if (response !== 200) {
      yield put(
        updateProfilePicFail({ error: response.response.data.message })
      );
    } else {
      yield put(
        updateProfilePicFail({ error: response.response.data.message })
      );
    }
  } catch (error) {
    yield put(updateProfilePicFail({ error }));
  }
}

export default function* rootsaga() {
  yield all([
    yield takeEvery(actionLabels.CREATE_USER_PROFILE_SAGA, createUserSaga),
    yield takeEvery(actionLabels.VIEW_PROFILE_SAGA, viewProfileSaga),
    yield takeEvery(actionLabels.UPDATE_PROFILE_SAGA, updateProfileSaga),
    yield takeEvery(actionLabels.UPDATE_PROFILE_PIC_SAGA, updateProfilePicSaga),
  ]);
}
