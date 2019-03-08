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
    size: {
      small: "12px",
      medium: "16px",
      large: "20px",
      extraLarge: "24px",
      extraExtraLarge: "34px"
    },
    weight: {
      light: 300,
      normal: 400,
      bold: 500
    }
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
    font-family: "Roboto", sans-serif;
    font-size: ${theme.font.size.medium};
    font-seight: ${theme.font.weight.normal};
    user-select: none;
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
