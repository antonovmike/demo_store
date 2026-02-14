import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";
import type { RootState } from "../store/store";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    console.warn("Unauthorized attempt to access /profile");
    return <Navigate to="/" replace />;
  }

  return children;
}
