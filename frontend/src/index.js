import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {router} from "./router";

import { Provider } from "react-redux";
import {RouterProvider} from "react-router";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { ModalProvider, Modal } from "./context/Modal";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <RouterProvider router={router}>
          <Modal />
        </RouterProvider>
      </Provider>
    </ModalProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
