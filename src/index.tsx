import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import GlobalStyle from "./styles/global";
import styled, { ThemeProvider } from "./styles/styled";
import { ThemeMode, darkTheme, lightTheme } from "./styles/theme";
import rootReducer from "./reducers";
import { checkRedirection, initAuthorization } from "./utils/authorization";
import fetchMiddleware from "./middlewares/fetchMiddleware";
import { RoundButton, IconType } from "./components/core";
import App from "./components/layout/App";

checkRedirection();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, fetchMiddleware))
);
initAuthorization(store.dispatch);

interface ThemeButtonProps {
  mode: ThemeMode;
}

const ThemeButton = styled(RoundButton).attrs<
  ThemeButtonProps,
  { iconType: IconType }
>(({ mode }) => ({
  iconType:
    mode === ThemeMode.Dark ? IconType.Brightness4 : IconType.Brightness5
}))<ThemeButtonProps>`
  color: ${props => props.theme.onPrimary.primary};

  &:not(:disabled):hover {
    color: ${props => props.theme.onPrimary.primary};
  }

  &::before {
    background: ${props => props.theme.onPrimary.hover};
  }

  &::after {
    background: ${props => props.theme.onPrimary.active};
  }
`;

function Root() {
  const [themeMode, setThemeMode] = useState(ThemeMode.Dark);

  function handleClick() {
    setThemeMode(
      themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
    );
  }

  const theme = themeMode === ThemeMode.Dark ? darkTheme : lightTheme;
  return (
    <>
      <GlobalStyle theme={theme} />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App>
            <ThemeButton mode={themeMode} onClick={handleClick} />
          </App>
        </Provider>
      </ThemeProvider>
    </>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
