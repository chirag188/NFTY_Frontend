import { combineReducers } from "redux";

import dummyReducer from "./dummy/dummy";
import profile from "./profile/profile";

const allReducers = combineReducers({
  dummyReducer,
  profile,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
