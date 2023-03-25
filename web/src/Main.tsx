import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
import { Router } from "./router/Router";
import { store } from "./store";

const THEME = createTheme({
  typography: {
    fontFamily: `"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
   "Lucida Sans", Arial, sans-serif !important;`,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <div>
          <Router />
        </div>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
