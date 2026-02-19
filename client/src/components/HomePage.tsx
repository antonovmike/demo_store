import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../theme";
import StyledHeader_1 from "./StyledHeader_1";

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <StyledHeader_1>Welcome</StyledHeader_1>
      </CssBaseline>
    </ThemeProvider>
  );
}
