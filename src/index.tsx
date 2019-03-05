import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import rootReducer from "./reducers";
import App from "./containers/App";
import { checkRedirection, initAuthorization } from "./helpers/authorization";
import { receiveAuthorization } from "./actions/authorization";

checkRedirection();

const theme = {
  background: {
    light: "#424242",
    default: "#303030",
    dark: "#212121",
    hover: "rgba(255, 255, 255, 0.1)",
    active: "rgba(255, 255, 255, 0.2)"
  },
  foreground: {
    default: "#ffffff",
    dark: "rgba(255, 255, 255, 0.5)"
  },
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
    background: ${theme.background.default}; 
    color: ${theme.foreground.default};
  }

  a {
    color: ${theme.foreground.default};
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
initAuthorization(store.dispatch);

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
