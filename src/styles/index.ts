import { createGlobalStyle } from "styled-components";

export const theme = {
  background: {
    light: "#424242",
    default: "#303030",
    dark: "#212121",
    hover: "rgba(255, 255, 255, 0.1)",
    active: "rgba(255, 255, 255, 0.2)"
  },
  font: {
    light: 300,
    medium: 400,
    bold: 500
  },
  foreground: {
    default: "#ffffff",
    dark: "rgba(255, 255, 255, 0.4)"
  },
  primary: "#1db954"
};

export default createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body, button, ul {
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

  button {
    border: 0;

    &:focus {
      outline: none;
    }
  }

  ul {
    list-style: none;
  }
`;
