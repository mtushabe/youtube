import React, { Component } from "react";
import { Provider } from "react-redux"; //hook the store with the app with the provider
import { ConfigureStore } from "./store";
import Route from "./components/Route";
import { Loading } from "./components/utils/Loading";
import { PersistGate } from "redux-persist/es/integration/react";
import Login from "./components/security/Login";

const { persistor, store } = ConfigureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Route />
        </PersistGate>
      </Provider>
    );
  }
}
