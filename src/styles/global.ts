import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export default createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body, h1, h2, button, ul {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${theme.background.default}; 
    color: ${theme.foreground.default};
    font-family: "Roboto", sans-serif;
    font-size: ${theme.font.size.medium};
    font-weight: ${theme.font.weight.normal};
    user-select: none;
  }

  a {
    color: ${theme.foreground.default};
    text-decoration: none;
  }

  button {
    background: transparent;
    border: 0;
    color: ${theme.foreground.default};
    font-family: "Roboto", sans-serif;
    font-size: ${theme.font.size.medium};
    font-weight: ${theme.font.weight.normal};

    &:not(:disabled) {
      cursor: pointer;
    }
  }

  button, input {
    &:focus {
      outline: none;
    }
  }

  ul {
    list-style: none;
  }
`;
