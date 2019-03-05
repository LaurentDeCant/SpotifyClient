import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider } from "styled-components";
import rootReducer from "./reducers";
import App from "./components/App";
import { checkRedirection, initAuthorization } from "./helpers/authorization";
import GlobalStyle, { theme } from "./styles";
import "./styles/normalize.css";

checkRedirection();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
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
