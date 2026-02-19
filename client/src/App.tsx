import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Link } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";
import { AuthProvider } from "./context/AuthContext.jsx";

import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import ForgotPasswordForm from "./components/ForgotPasswordForm.js";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProfilePage from "./components/ProfilePage";
import ProductsPage from "./components/ProductsPage";
import AddProductPage from "./components/AddProductPage";
import PrivateRoute from "./components/PrivateRoute";
import ResetPasswordForm from "./components/ResetPasswordForm.js";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <nav>
              <Link href="#/">Home</Link>
              <Link href="#/register">Register</Link>
              <Link href="#/login">Login</Link>
              <Link href="#/profile">Profile</Link>
              <Link href="#/products">Products</Link>
              <Link href="#/cart">Cart</Link>
              <Link href="#/add">Add Product</Link>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/add" element={<AddProductPage />} />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
