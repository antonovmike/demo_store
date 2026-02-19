import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import theme from "../theme";

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box
          sx={{
            minHeight: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Welcome</Typography>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
