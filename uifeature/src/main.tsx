import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import "./index.css";
import { Provider } from "react-redux";

import "@fontsource/poppins";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
