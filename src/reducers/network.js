import {
  CHANGE_CONNECTION_STATUS,
  REMOVE_FROM_ACTION_QUEUE
} from "../constants.js";
import _ from "lodash";

const initialState = {
  isConnected: false
};

const netReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      return Object.assign({}, state, {
        isConnected: action.isConnected
      });

    case REMOVE_FROM_ACTION_QUEUE:
      return Object.assign({}, state, {
        actionQueue: _.without(state.actionQueue, action.payload)
      });

    default:
      return state;
  }
};

export default netReducer;
