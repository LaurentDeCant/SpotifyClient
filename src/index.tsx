import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import GlobalStyle from "./styles/global";
import styled, { ThemeProvider } from "./styles/styled";
import { ThemeMode, darkTheme, lightTheme } from "./styles/theme";
import { checkRedirection, initAuthorization } from "./utils/authorization";
import { RoundButton, IconType } from "./components/core";
import App from "./components/layout/App";
import { createStore } from "./store";

checkRedirection();
const store = createStore();
initAuthorization(store.dispatch);

interface ThemeButtonProps {
  mode: ThemeMode;
}

const ThemeButton = styled(RoundButton).attrs<
  ThemeButtonProps,
  { iconType: IconType }
>(({ mode }) => ({
  isOnPrimary: true,
  iconType: mode === ThemeMode.Dark ? IconType.Brightness3 : IconType.WbSunny
}))<ThemeButtonProps>`
  margin-right: ${props => props.theme.thickness.extraSmall}px;
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
