export interface Theme {
  background: {
    light: string;
    default: string;
    dark: string;
    hover: string;
    active: string;
  };
  font: {
    size: {
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
      extraExtraLarge: string;
    };
    weight: {
      light: number;
      normal: number;
      bold: number;
    };
  };
  foreground: {
    default: string;
    dark: string;
  };
  primaryLight: string;
  primary: string;
  filter: {
    darken: string;
  };
}

export const theme: Theme = {
  background: {
    light: "#303030",
    default: "#202020",
    dark: "#101010",
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
  primary: "#1db954",
  primaryLight: "#1ed760",
  filter: {
    darken: "brightness(0.5)"
  }
};
