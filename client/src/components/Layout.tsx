import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Demo Store
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/products">
            Products
          </Button>
          <Button color="inherit" component={RouterLink} to="/cart">
            Cart
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile">
            Profile
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/register">
            Register
          </Button>
          <Button color="inherit" component={RouterLink} to="/add">
            Add Product
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>{children}</Container>

      <Box
        component="footer"
        sx={{ py: 2, textAlign: "center", bgcolor: "background.paper" }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2026 Demo Store. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
