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
  viewProfile,
  viewProfileFail,
  viewProfileStart,
  viewProfileSuccess,
} from "../../actions";
import { toast } from "react-toastify";

const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
// eslint-disable-next-line no-unused-vars
function* createUserSaga(action) {
  try {
    yield createUserProfileStart();
    const { walletAddress } = action.payload;

    const response = yield axios
      .post("/users/createUserProfile", {
        walletAddress,
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(createUserProfileSuccess({ data: response.data.data }));
      yield toast.success("User Created Successfully", options);
      yield call(
        [localStorage, "setItem"],
        "JwtToken",
        response.data.data.authToken
      );
      yield viewProfile();
    } else if (response !== 200) {
      yield put(
        createUserProfileFail({ error: response.response.data.message })
      );
      yield toast.error(response.data.err_msg, options);
    } else {
      yield put(
        createUserProfileFail({ error: response.response.data.message })
      );
      yield toast.error(response.data.err_msg, options);
    }
  } catch (error) {
    yield put(createUserProfileFail({ error }));
  }
}

function* viewProfileSaga() {
  try {
    yield viewProfileStart();
    const JwtToken = localStorage.getItem("JwtToken");
    const response = yield axios
      .get("/users/viewProfile", {
        headers: {
          token: JwtToken,
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
    yield updateProfileStart();
    const JwtToken = localStorage.getItem("JwtToken");
    const { name, bio } = action.payload;
    const response = yield axios
      .put(
        "/users/updateProfile",
        { name, bio },
        {
          headers: {
            token: JwtToken,
          },
        }
      )
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(updateProfileSuccess({ data: response.data.data }));
      yield put(viewProfile());
      yield toast.success(response.data.msg, options);
    } else if (response !== 200) {
      yield put(updateProfileFail({ error: response.response.data.message }));
      yield toast.error(response.data.err_msg, options);
    } else {
      yield put(updateProfileFail({ error: response.response.data.message }));
      yield toast.error(response.data.err_msg, options);
    }
  } catch (error) {
    yield put(updateProfileFail({ error }));
  }
}

function* updateProfilePicSaga(action) {
  try {
    yield updateProfilePicStart();
    const JwtToken = localStorage.getItem("JwtToken");
    const { profilePic } = action.payload;
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    const response = yield axios
      .put("/users/update-profile-pic", formData, {
        headers: {
          token: JwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(updateProfilePicSuccess({ data: response.data.data }));
      yield put(viewProfile());
      yield toast.success(response.data.msg, options);
    } else if (response !== 200) {
      yield put(
        updateProfilePicFail({ error: response.response.data.message })
      );
      yield toast.error(response.data.err_msg, options);
    } else {
      yield put(
        updateProfilePicFail({ error: response.response.data.message })
      );
      yield toast.error(response.data.err_msg, options);
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
