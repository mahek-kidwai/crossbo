import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { GuestProvider } from "./state/GuestContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GuestProvider>
        <App />
      </GuestProvider>
    </BrowserRouter>
  </React.StrictMode>
);
