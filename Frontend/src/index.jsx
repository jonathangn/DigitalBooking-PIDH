import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./components/Context/DataContext";
import { Provider } from "./context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <DataProvider>
        <App />
      </DataProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

