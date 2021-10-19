import * as actionLabels from "../../actionLabels";

export const stakerDataStart = () => ({
  type: actionLabels.STAKER_DATA_START,
});

export const stakerData = () => ({
  type: actionLabels.STAKER_DATA_SAGA,
});

export const stakerDataSuccess = (payload) => ({
  type: actionLabels.STAKER_DATA_SUCCESS,
  payload,
});

export const stakerDataFail = (payload) => ({
  type: actionLabels.STAKER_DATA_FAIL,
  payload,
});

export const balanceStart = () => ({
  type: actionLabels.BALANCE_START,
});

export const balance = () => ({
  type: actionLabels.BALANCE_SAGA,
});

export const balanceSuccess = (payload) => ({
  type: actionLabels.BALANCE_SUCCESS,
  payload,
});

export const balanceFail = (payload) => ({
  type: actionLabels.BALANCE_FAIL,
  payload,
});
