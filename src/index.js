import React from "react";
import ReactDOM from "react-dom";
import "./fonts/Mulish-Regular.ttf";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MainProvider } from "./context/MainContext";
import { AuthState } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <MainProvider>
      <AuthState>
        <App />
      </AuthState>
    </MainProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
