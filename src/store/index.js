import { createStore, applyMiddleware } from "redux";
import app from "../reducers";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

//export default function ConfigureStore() {
export const ConfigureStore = () => {
  const store = createStore(app, applyMiddleware(thunk, logger)); // create our app's store

  const persistor = persistStore(store);
  return { persistor, store };
};
