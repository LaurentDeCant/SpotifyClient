import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

export default createGlobalStyle<{ theme: Theme }>`
  html, body, #root {
    height: 100%;
  }

  body, h1, h2, h3, button, ul {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${props => props.theme.background.secondary};
    color: ${props => props.theme.foreground.primary};
    font-family: "Roboto", sans-serif;
    font-size: ${props => props.theme.fontSize.medium}px;
    font-weight: ${props => props.theme.fontWeight.normal};
    user-select: none;
  }

  a {
    color: ${props => props.theme.foreground.primary};
    text-decoration: none;
  }

  button {
    background: transparent;
    border: 0;
    color: ${props => props.theme.foreground.primary};
    font-family: "Roboto", sans-serif;
    font-size: ${props => props.theme.fontSize.medium}px;
    font-weight: ${props => props.theme.fontWeight.normal};

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
