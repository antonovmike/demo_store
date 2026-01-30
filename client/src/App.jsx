import { Routes, Route, HashRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
// import { ProductProvider } from "./context/ProductContext.jsx";

import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProfilePage from "./components/ProfilePage";
import ProductsPage from "./components/ProductsPage";
import AddProductPage from "./components/AddProductPage";
import PrivateRoute from "./components/PrivateRoute";
import StyledPage from "./components/StyledPage";
import StyledLink from "./components/StyledLink";

function App() {
  return (
    <AuthProvider>
      {/* <ProductProvider> */}
      <HashRouter>
        <StyledPage>
          <nav>
            <StyledLink href="#/">Home</StyledLink>
            <StyledLink href="#/register">Register</StyledLink>
            <StyledLink href="#/login">Login</StyledLink>
            <StyledLink href="#/profile">Profile</StyledLink>
            <StyledLink href="#/products">Products</StyledLink>
            <StyledLink href="#/cart">Cart</StyledLink>
            <StyledLink href="#/add">Add Product</StyledLink>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
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
        </StyledPage>
      </HashRouter>
      {/* </ProductProvider> */}
    </AuthProvider>
  );
}

export default App;
