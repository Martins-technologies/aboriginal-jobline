import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const spaRedirect = sessionStorage.getItem("aj-spa-redirect");
if (spaRedirect) {
  sessionStorage.removeItem("aj-spa-redirect");
  window.history.replaceState(null, "", spaRedirect);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
