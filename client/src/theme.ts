import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
      paper: "#242424",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#242424",
          color: "#ffffff",
          fontFamily: "sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": { color: "white" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          "& .MuiInputLabel-root": { color: "white" },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          marginRight: "1.25rem",
          textDecoration: "none",
          color: "#0284c7",
          fontWeight: 500,
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          border: "1px solid transparent",
          padding: "0.6em 1.2em",
          fontSize: "1em",
          fontWeight: 500,
          fontFamily: "inherit",
          backgroundColor: "#1a1a1a",
          cursor: "pointer",
          transition: "border-color 0.25s",
          "&:hover": {
            borderColor: "#646cff",
          },
          "&:focus, &:focus-visible": {
            outline: "4px auto -webkit-focus-ring-color",
          },
        },
      },
    },
  },
});

export default theme;
