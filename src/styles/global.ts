import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export default createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body, h1, h2, h3, button, ul {
    margin: 0;
    padding: 0;
  }

  body {
    background: linear-gradient(rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.5)), ${
      theme.background.default
    };
    color: ${theme.foreground.default};
    font-family: "Roboto", sans-serif;
    font-size: ${theme.fontSize.medium}px;
    font-weight: ${theme.fontWeight.normal};
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
    font-size: ${theme.fontSize.medium}px;
    font-weight: ${theme.fontWeight.normal};

    &:not(:disabled) {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed; 
    }
  }

  a, button, input {
    outline: none;

    &:focus {
      border: 0;
    }
  }

  ul {
    list-style: none;
  }
`;
