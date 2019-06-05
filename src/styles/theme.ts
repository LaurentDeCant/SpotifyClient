export interface Theme {
  background: {
    light: string;
    default: string;
    dark: string;
    hover: string;
    active: string;
  };
  breakpoint: {
    extraSmall: number;
    small: number;
  };
  color: {
    primaryLight: string;
    primary: string;
    errorLight: string;
    error: string;
    errorDark: string;
  };
  fontSize: {
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
    extraExtraLarge: string;
  };
  fontWeight: {
    light: number;
    normal: number;
    bold: number;
  };
  foreground: {
    default: string;
    dark: string;
    darker: string;
  };
  thickness: {
    extraExtraSmall: number;
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    extraExtraLarge: number;
  };
}

export const theme: Theme = {
  background: {
    light: "#303030",
    default: "#202020",
    dark: "#101010",
    hover: "rgba(255, 255, 255, 0.1)",
    active: "rgba(255, 255, 255, 0.1)"
  },
  breakpoint: {
    extraSmall: 480,
    small: 960
  },
  color: {
    primaryLight: "#1ed760",
    primary: "#1db954",
    errorLight: "#e57373",
    error: "#f44336",
    errorDark: "#d32f2f"
  },
  fontSize: {
    small: "12px",
    medium: "16px",
    large: "20px",
    extraLarge: "24px",
    extraExtraLarge: "32px"
  },
  fontWeight: {
    light: 300,
    normal: 400,
    bold: 500
  },
  foreground: {
    default: "#ffffff",
    dark: "rgba(255, 255, 255, 0.6)",
    darker: "rgba(255, 255, 255, 0.3)"
  },
  thickness: {
    extraExtraSmall: 3.125,
    extraSmall: 6.25,
    small: 12.5,
    medium: 25,
    large: 50,
    extraLarge: 100,
    extraExtraLarge: 200
  }
};
