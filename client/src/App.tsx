import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";
import { AuthProvider } from "./context/AuthContext.jsx";

import Layout from "./components/Layout";
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
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <HomePage />
                  </Layout>
                }
              />
              <Route
                path="/register"
                element={
                  <Layout>
                    <RegisterForm />
                  </Layout>
                }
              />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route
                path="/reset-password"
                element={
                  <Layout>
                    <ResetPasswordForm />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout>
                    <LoginForm />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Layout>
                      <ProfilePage />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <Layout>
                    <ProductsPage />
                  </Layout>
                }
              />
              <Route
                path="/cart"
                element={
                  <Layout>
                    <CartPage />
                  </Layout>
                }
              />
              <Route
                path="/add"
                element={
                  <Layout>
                    <AddProductPage />
                  </Layout>
                }
              />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
