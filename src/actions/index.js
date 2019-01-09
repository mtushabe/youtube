import {
  FETCHING_MOVIES,
  FETCHING_MOVIES_SUCCESS,
  FETCHING_MOVIES_FAILURE,
  POST_FAVORITES,
  CHANGE_CONNECTION_STATUS
} from "../constants.js";

export function fetchMoviesFromAPI() {
  //this is the function we access in our component in the mapDispatch function

  return (dispatch, getState) => {
    console.log("STATUS " + getState().network.isConnected);
    //check the status of the internet connection
    dispatch(getMovies());
    if (getState().network.isConnected) {
      fetch(
        "https://www.googleapis.com/youtube/v3/search/?key=AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw&channelId=UCQzdMyuz0Lf4zo4uGcEujFw&part=snippet,id&order=date&maxResults=10"
      )
        .then(res => res.json())
        .then(json => {
          dispatch(getMoviesSuccess(json.items));
        })
        .catch(err => dispatch(getMoviesFailure(err)));
    }
  };
}

export const getMovies = () => ({
  type: FETCHING_MOVIES
});

export const getMoviesSuccess = data => ({
  type: FETCHING_MOVIES_SUCCESS,
  data
});

export const getMoviesFailure = error => ({
  type: FETCHING_MOVIES_FAILURE,
  error
});
//handle posting favorites
export const postFavorites = movieId => dispatch => {
  console.log("ID" + movieId);
  setTimeout(() => {
    dispatch(addFavorites(movieId));
  }, 2000);
};

const addFavorites = movieId => ({
  type: POST_FAVORITES,
  payload: movieId
});

//handle network connectivity
export const getNetworkState = isConnected => dispatch => {
  dispatch(netStatus(isConnected));
};

const netStatus = isConnected => ({
  type: CHANGE_CONNECTION_STATUS,
  isConnected
});
