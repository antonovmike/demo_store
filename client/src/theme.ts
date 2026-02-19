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
  },
});

export default theme;
