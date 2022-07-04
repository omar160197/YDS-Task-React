import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { StyledEngineProvider } from '@mui/material/styles';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( 
 <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
  );
