import * as actionLabels from "../../actionLabels";

const initialState = {
  StakedNFTYBalance: "0",
  APR: "0",
  StakePeriodInSecs: "0",
  Tier: "0",
  UnclaimedRewards: "0",
  TotalRewards: {},
  balance: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionLabels.STAKER_DATA_SUCCESS: {
      return {
        ...state,
        StakedNFTYBalance:
          action?.payload?.data.StakedNFTYBalance / 1000000000000000000,
        APR: action?.payload?.data.APR,
        StakePeriodInSecs: action?.payload?.data.StakePeriodInSecs,
        Tier: action?.payload?.data.Tier,
        UnclaimedRewards: action?.payload?.data.UnclaimedRewards,
        TotalRewards: action?.payload?.data.TotalRewards,
      };
    }
    case actionLabels.STAKER_DATA_FAIL: {
      return {
        ...state,
        StakedNFTYBalance: "0",
        APR: "0",
        StakePeriodInSecs: "0",
        Tier: "0",
        UnclaimedRewards: "0",
        TotalRewards: {},
      };
    }
    case actionLabels.BALANCE_SUCCESS: {
      return {
        ...state,
        balance: action.payload.data.balance.toFixed(2),
      };
    }
    case actionLabels.BALANCE_FAIL: {
      return {
        ...state,
        balance: 0,
      };
    }
    case actionLabels.RESET_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};
