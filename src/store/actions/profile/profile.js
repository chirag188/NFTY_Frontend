import * as actionLabels from "../../actionLabels";

export const createUserProfileStart = () => ({
  type: actionLabels.CREATE_USER_PROFILE_START,
});

export const createUserProfile = (payload) => ({
  type: actionLabels.CREATE_USER_PROFILE_SAGA,
  payload,
});

export const createUserProfileSuccess = (payload) => ({
  type: actionLabels.CREATE_USER_PROFILE_SUCCESS,
  payload,
});

export const createUserProfileFail = (payload) => ({
  type: actionLabels.CREATE_USER_PROFILE_FAIL,
  payload,
});

export const viewProfileStart = () => ({
  type: actionLabels.VIEW_PROFILE_START,
});

export const viewProfile = (payload) => ({
  type: actionLabels.VIEW_PROFILE_SAGA,
  payload,
});

export const viewProfileSuccess = (payload) => ({
  type: actionLabels.VIEW_PROFILE_SUCCESS,
  payload,
});

export const viewProfileFail = (payload) => ({
  type: actionLabels.VIEW_PROFILE_FAIL,
  payload,
});

export const updateProfileStart = () => ({
  type: actionLabels.UPDATE_PROFILE_START,
});

export const updateProfile = (payload) => ({
  type: actionLabels.UPDATE_PROFILE_SAGA,
  payload,
});

export const updateProfileSuccess = (payload) => ({
  type: actionLabels.UPDATE_PROFILE_SUCCESS,
  payload,
});

export const updateProfileFail = (payload) => ({
  type: actionLabels.UPDATE_PROFILE_FAIL,
  payload,
});

export const updateProfilePicStart = () => ({
  type: actionLabels.UPDATE_PROFILE_PIC_START,
});

export const updateProfilePic = (payload) => ({
  type: actionLabels.UPDATE_PROFILE_PIC_SAGA,
  payload,
});

export const updateProfilePicSuccess = (payload) => ({
  type: actionLabels.UPDATE_PROFILE_PIC_SUCCESS,
  payload,
});

export const updateProfilePicFail = (payload) => ({
  type: actionLabels.UPDATE_PROFILE_PIC_FAIL,
  payload,
});
