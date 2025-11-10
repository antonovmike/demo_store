import { Link, Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import CartPage from "./components/CartPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProfilePage from "./components/ProfilePage";
import ProductsPage from "./components/ProductsPage";
import AddProductPage from "./components/AddProductPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <HashRouter>
            <nav>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link> {/* Cart link can be added here when CartPage is implemented */}
              <Link to="/add">Add Product</Link>
            </nav>
            <Routes>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/add" element={<AddProductPage />} />
            </Routes>
          </HashRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;