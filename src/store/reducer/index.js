import { combineReducers } from 'redux';

import stakerReducer from './Stake/Stake';

const allReducers = combineReducers({
  stakerReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
