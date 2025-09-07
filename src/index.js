import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";   // ✅ Make sure it points to your custom App.jsx
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
