import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextWrapper } from "./context/user.context";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#b40e28",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <UserContextWrapper>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserContextWrapper>
    </Router>
  </React.StrictMode>
);
