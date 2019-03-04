import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import rootReducer from "./reducers";
import App from "./containers/App";
import { checkAuthorized } from "./helpers/authorization";

checkAuthorized();

const theme = {
  background: "#424242",
  backgroundLight: "#6d6d6d",
  backgroundDark: "#1b1b1b",
  foreground: "#ffffff",
  primary: "#1db954"
};

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body, ul {
    margin: 0;
    padding: 0;
  }

  body {
    color: ${theme.foreground};
  }

  a {
    color: ${theme.foreground};
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
