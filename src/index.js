import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextWrapper from "./context/ContextWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "1234567890-placeholder.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
