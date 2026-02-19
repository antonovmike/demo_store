import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
  components: {
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
