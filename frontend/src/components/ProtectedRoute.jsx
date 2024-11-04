// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth(); // Get auth status from context

  return isAuthenticated ? element : <Navigate to="/patient/signin" />;
}

export default ProtectedRoute;
