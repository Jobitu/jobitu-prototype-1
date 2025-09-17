import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/globals.css";
import { initTheme } from "./utils/theme";

// Initialize theme before mounting the app so there's no FOUC
initTheme();

createRoot(document.getElementById("root")!).render(<App />);