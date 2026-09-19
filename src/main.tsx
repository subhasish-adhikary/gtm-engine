import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Hydrate instead of re-rendering: production builds ship fully prerendered
// HTML, so React must attach to the existing DOM rather than wipe it.
ReactDOM.hydrateRoot(document.getElementById("root")!, <App />);
