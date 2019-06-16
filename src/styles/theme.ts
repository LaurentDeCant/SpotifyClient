export enum ThemeMode {
  Dark = "DARK",
  Light = "LIGHT"
}

export interface Theme {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  breakpoint: {
    extraSmall: number;
    small: number;
  };
  color: {
    primary: string;
    error: string;
  };
  fontSize: {
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    extraExtraLarge: number;
  };
  fontWeight: {
    light: number;
    normal: number;
    bold: number;
  };
  onBackground: {
    primary: string;
    secondary: string;
    tertiary: string;
    hover: string;
    active: string;
  };
  onPrimary: {
    primary: string;
    secondary: string;
    tertiary: string;
    hover: string;
    active: string;
  };
  shadow: {
    low: string;
    middle: string;
    high: string;
  };
  thickness: {
    extraExtraSmall: number;
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    extraExtraLarge: number;
    extraExtraExtraLarge: number;
  };
}

const theme = {
  breakpoint: {
    extraSmall: 480,
    small: 960
  },
  color: {
    primary: "#1db954"
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    extraLarge: 24,
    extraExtraLarge: 32
  },
  fontWeight: {
    light: 300,
    normal: 400,
    bold: 500
  },
  onPrimary: {
    primary: "rgba(255, 255, 255, 1)",
    secondary: "rgba(255, 255, 255, 0.70)",
    tertiary: "rgba(255, 255, 255, 0.50)",
    hover: "rgba(255, 255, 255, 0.08)",
    active: "rgba(255, 255, 255, 0.16)"
  },
  shadow: {
    low: "0 1px 2px rgba(0, 0, 0, .5)",
    middle: "0 2px 4px rgba(0, 0, 0, .5)",
    high: "0 4px 8px rgba(0, 0, 0, .5)"
  },
  thickness: {
    extraExtraSmall: 3.125,
    extraSmall: 6.25,
    small: 12.5,
    medium: 25,
    large: 50,
    extraLarge: 100,
    extraExtraLarge: 200,
    extraExtraExtraLarge: 400
  }
};

export const darkTheme: Theme = {
  ...theme,
  background: {
    primary: "#000000",
    secondary: "#212121",
    tertiary: "#303030"
  },
  color: {
    ...theme.color,
    error: "#e57373"
  },
  onBackground: {
    primary: "rgba(255, 255, 255, 1)",
    secondary: "rgba(255, 255, 255, 0.70)",
    tertiary: "rgba(255, 255, 255, 0.50)",
    hover: "rgba(255, 255, 255, 0.08)",
    active: "rgba(255, 255, 255, 0.16)"
  }
};

export const lightTheme: Theme = {
  ...theme,
  background: {
    primary: "#fafafa",
    secondary: "#f5f5f5",
    tertiary: "#e0e0e0"
  },
  color: {
    ...theme.color,
    error: "#d32f2f"
  },
  onBackground: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.54)",
    tertiary: "rgba(0, 0, 0, 0.38)",
    hover: "rgba(0, 0, 0, 0.04)",
    active: "rgba(0, 0, 0, 0.08)"
  }
};
