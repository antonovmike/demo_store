import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Link,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import logo from "/images/logo-full.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Link component={RouterLink} to="/" sx={{ width: "15%" }}>
            <CardMedia component="img" src={logo} />
          </Link>
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

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {children}
      </Container>

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
