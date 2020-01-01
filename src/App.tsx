import React from "react";
import { Provider } from "react-redux";
import {store} from './store/configureStore';


import "./scss/App.scss";
import AppRouter from "./router/AppRouter";

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    );
  }
}

export default App;
