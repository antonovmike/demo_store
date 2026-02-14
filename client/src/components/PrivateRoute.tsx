import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    console.warn("Unauthorized attempt to access /profile");
    return <Navigate to="/" replace />;
  }

  return children;
}
