import {
  FETCHING_MOVIES,
  FETCHING_MOVIES_SUCCESS,
  FETCHING_MOVIES_FAILURE
} from "../constants.js";

const initialState = {
  movies: [],
  isFetching: false,
  refreshing: false,
  error: null
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_MOVIES:
      return {
        ...state,
        isFetching: true,
        error: null,
        movies: []
      };

    case FETCHING_MOVIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movies: action.data
      };

    case FETCHING_MOVIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        movies: []
      };

    default:
      return state;
  }
}
