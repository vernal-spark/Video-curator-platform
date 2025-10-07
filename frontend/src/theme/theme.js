import { createTheme } from "@mui/material/styles";

// Color palette
const colors = {
  primary: {
    main: "#E50914", // Netflix red
    light: "#FF1A25",
    dark: "#B20710",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#FFFFFF",
    light: "#F5F5F5",
    dark: "#CCCCCC",
    contrastText: "#000000",
  },
  background: {
    default: "#141414",
    paper: "#181818",
    elevated: "#202020",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B3B3B3",
    disabled: "#808080",
  },
  grey: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  success: {
    main: "#46D369",
    light: "#6FE08A",
    dark: "#2FA04C",
  },
  error: {
    main: "#F44336",
    light: "#E57373",
    dark: "#D32F2F",
  },
  warning: {
    main: "#FFA726",
    light: "#FFB74D",
    dark: "#F57C00",
  },
  info: {
    main: "#29B6F6",
    light: "#4FC3F7",
    dark: "#0288D1",
  },
};

// Create theme
const theme = createTheme({
  palette: {
    mode: "dark",
    ...colors,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.2)",
    "0px 4px 8px rgba(0, 0, 0, 0.3)",
    "0px 6px 12px rgba(0, 0, 0, 0.4)",
    "0px 8px 16px rgba(0, 0, 0, 0.5)",
    "0px 10px 20px rgba(0, 0, 0, 0.6)",
    ...Array(19).fill("none"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "8px 16px",
          fontWeight: 500,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          },
        },
        contained: {
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
          "&:hover": {
            backgroundColor: colors.primary.dark,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          borderRadius: 8,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: colors.background.elevated,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: colors.background.paper,
            },
            "&.Mui-focused": {
              backgroundColor: colors.background.paper,
            },
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.elevated,
        },
      },
    },
  },
});

export default theme;
