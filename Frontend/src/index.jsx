import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./components/Context/DataContext";
import { Context, Provider } from "./context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <DataProvider>
      <App />
    </DataProvider>
  </Provider>
);

reportWebVitals();

