import movies from "./movies";
import favorites from "./favorites";
import network from "./network";
import { AsyncStorage } from "react-native";
import { persistCombineReducers } from "redux-persist";
// here you can add more reducers as you scale you app
//this is the state property we access in our component in the mapState function

const config = { key: "root", storage: AsyncStorage, debug: true };
const rootReducer = persistCombineReducers(config, {
  movies,
  favorites,
  network
});
export default rootReducer;
