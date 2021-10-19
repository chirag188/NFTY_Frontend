import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer, Slide } from "react-toastify";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import getLibrary from "./utils/getLibrary";
import rootReducer from "./store/reducer";
import rootSaga from "./store/sagas";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/index.css";
import "./index.css";
import "./assets/styles/responsive.css";
import "react-toastify/dist/ReactToastify.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers =
// process.env.NODE_ENV === "development"
//   ? // eslint-disable-next-line no-underscore-dangle
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   : null || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ToastContainer
          position="top-center"
          transition={Slide}
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="custom-toast"
        />
        <App />
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
