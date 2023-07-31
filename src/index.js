import React from "react";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider
    clientId={`329428531488-bhffhintsg028uv35bpnhdrb9s6fol15.apps.googleusercontent.com`}
  >
    <Provider store={store}>
        <App />
    </Provider>
  </GoogleOAuthProvider>
);
