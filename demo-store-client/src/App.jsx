import { Link, Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProfilePage from "./components/ProfilePage";
import ProductsPage from "./components/ProductsPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <nav className="flex gap-4 p-4 bg-gray-200">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/products">Products</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;