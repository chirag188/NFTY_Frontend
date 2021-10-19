import { combineReducers } from "redux";
import profile from "./profile/profile";
import stakerReducer from "./Stake/Stake";

const allReducers = combineReducers({
  profile,
  stakerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
