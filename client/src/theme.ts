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
          marginRight: "1.25rem", // mr-5
          textDecoration: "none", // No underline
          color: "#0284c7", // text-sky-700
          fontWeight: 500, // font-medium
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
  },
});

export default theme;
