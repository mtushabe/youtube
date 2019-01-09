import { POST_FAVORITES } from "../constants.js";

const favorites = (state = [], action) => {
  switch (action.type) {
    case POST_FAVORITES:
      //if (state == []) {
      if (state.some(el => el === action.payload)) {
        return state; // if element already exists just return state the way it is.
      } else {
        return state.concat(action.payload); // if it does not, then add the element
      }
    default:
      return state;
  }
};

export default favorites;
